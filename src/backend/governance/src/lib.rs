
use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk::export::{
    candid,
    serde::Serialize,
};
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum ProposalStatus {
    Active,
    Passed,
    Rejected,
    Executed,
    Canceled,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum VoteType {
    Yes,
    No,
    Abstain,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum ProposalType {
    FeatureRequest,
    BudgetAllocation,
    PolicyChange,
    MembershipRule,
    TokenIssuance,
    Other,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub struct Proposal {
    id: String,
    creator: Principal,
    title: String,
    description: String,
    proposal_type: ProposalType,
    voting_start: u64,
    voting_end: u64,
    status: ProposalStatus,
    yes_votes: u64,
    no_votes: u64,
    abstain_votes: u64,
    min_votes_required: u64,
    execution_timestamp: Option<u64>,
    created_at: u64,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub struct UserVote {
    proposal_id: String,
    user: Principal,
    vote_type: VoteType,
    voting_power: u64,
    timestamp: u64,
}

#[derive(Default)]
struct GovernanceStorage {
    proposals: HashMap<String, Proposal>,
    votes: HashMap<String, Vec<UserVote>>, // proposal_id -> votes
    user_votes: HashMap<Principal, HashMap<String, UserVote>>, // user -> proposal_id -> vote
    token_balances: HashMap<Principal, u64>, // Simple voting token balance
    next_proposal_id: u64,
}

thread_local! {
    static STATE: RefCell<GovernanceStorage> = RefCell::new(GovernanceStorage::default());
}

#[update]
fn create_proposal(title: String, description: String, proposal_type: ProposalType, voting_period_days: u64) -> Proposal {
    let caller = ic_cdk::caller();
    
    // Check if caller has sufficient tokens to create a proposal (e.g., 100 tokens)
    STATE.with(|state| {
        let state = state.borrow();
        let balance = state.token_balances.get(&caller).cloned().unwrap_or(0);
        
        if balance < 100 {
            ic_cdk::trap("Insufficient tokens to create proposal. Need at least 100 tokens.");
        }
    });
    
    // Calculate voting period in nanoseconds
    let now = time();
    let voting_end = now + (voting_period_days * 24 * 60 * 60 * 1_000_000_000);
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        let proposal_id = format!("PROP-{}", state.next_proposal_id);
        state.next_proposal_id += 1;
        
        let proposal = Proposal {
            id: proposal_id.clone(),
            creator: caller,
            title,
            description,
            proposal_type,
            voting_start: now,
            voting_end,
            status: ProposalStatus::Active,
            yes_votes: 0,
            no_votes: 0,
            abstain_votes: 0,
            min_votes_required: 1000, // Example: require 1000 total votes for a valid proposal
            execution_timestamp: None,
            created_at: now,
        };
        
        state.proposals.insert(proposal_id, proposal.clone());
        proposal
    })
}

#[query]
fn get_proposals() -> Vec<Proposal> {
    STATE.with(|state| {
        let state = state.borrow();
        state.proposals.values().cloned().collect()
    })
}

#[query]
fn get_proposal(proposal_id: String) -> Option<Proposal> {
    STATE.with(|state| {
        let state = state.borrow();
        state.proposals.get(&proposal_id).cloned()
    })
}

#[update]
fn vote(proposal_id: String, vote_type: VoteType) -> UserVote {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Check if proposal exists and is active
        let proposal = match state.proposals.get_mut(&proposal_id) {
            Some(p) => p,
            None => ic_cdk::trap("Proposal not found"),
        };
        
        if matches!(proposal.status, ProposalStatus::Active) == false {
            ic_cdk::trap("Proposal is not active");
        }
        
        let now = time();
        if now > proposal.voting_end {
            ic_cdk::trap("Voting period has ended");
        }
        
        // Get user's voting power (token balance)
        let voting_power = state.token_balances.get(&caller).cloned().unwrap_or(0);
        if voting_power == 0 {
            ic_cdk::trap("No voting power (zero tokens)");
        }
        
        // Check if user has already voted
        if let Some(user_proposals) = state.user_votes.get(&caller) {
            if user_proposals.contains_key(&proposal_id) {
                ic_cdk::trap("Already voted on this proposal");
            }
        }
        
        // Record the vote
        let user_vote = UserVote {
            proposal_id: proposal_id.clone(),
            user: caller,
            vote_type: vote_type.clone(),
            voting_power,
            timestamp: now,
        };
        
        // Update proposal vote counts
        match vote_type {
            VoteType::Yes => {
                proposal.yes_votes += voting_power;
            },
            VoteType::No => {
                proposal.no_votes += voting_power;
            },
            VoteType::Abstain => {
                proposal.abstain_votes += voting_power;
            },
        };
        
        // Record vote in proposal's vote history
        state.votes.entry(proposal_id.clone()).or_insert_with(Vec::new).push(user_vote.clone());
        
        // Record vote in user's vote history
        state.user_votes.entry(caller).or_insert_with(HashMap::new).insert(proposal_id, user_vote.clone());
        
        // Check if voting has reached conclusion conditions
        let total_votes = proposal.yes_votes + proposal.no_votes + proposal.abstain_votes;
        if total_votes >= proposal.min_votes_required {
            if proposal.yes_votes > proposal.no_votes {
                proposal.status = ProposalStatus::Passed;
            } else {
                proposal.status = ProposalStatus::Rejected;
            }
        }
        
        user_vote
    })
}

#[query]
fn get_user_votes() -> Vec<UserVote> {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let state = state.borrow();
        match state.user_votes.get(&caller) {
            Some(votes) => votes.values().cloned().collect(),
            None => Vec::new(),
        }
    })
}

#[query]
fn get_proposal_votes(proposal_id: String) -> Vec<UserVote> {
    STATE.with(|state| {
        let state = state.borrow();
        match state.votes.get(&proposal_id) {
            Some(votes) => votes.clone(),
            None => Vec::new(),
        }
    })
}

#[query]
fn get_token_balance() -> u64 {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let state = state.borrow();
        state.token_balances.get(&caller).cloned().unwrap_or(0)
    })
}

#[query]
fn get_voting_power() -> u64 {
    get_token_balance() // In this simple implementation, voting power equals token balance
}

#[update]
fn execute_proposal(proposal_id: String) -> Proposal {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        let proposal = match state.proposals.get_mut(&proposal_id) {
            Some(p) => p,
            None => ic_cdk::trap("Proposal not found"),
        };
        
        // Only the creator can execute a passed proposal
        if proposal.creator != caller {
            ic_cdk::trap("Only the proposal creator can execute it");
        }
        
        if !matches!(proposal.status, ProposalStatus::Passed) {
            ic_cdk::trap("Only passed proposals can be executed");
        }
        
        // Execute the proposal (in a real implementation, this would call into other canisters)
        proposal.status = ProposalStatus::Executed;
        proposal.execution_timestamp = Some(time());
        
        proposal.clone()
    })
}

#[update]
fn cancel_proposal(proposal_id: String) -> Proposal {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        let proposal = match state.proposals.get_mut(&proposal_id) {
            Some(p) => p,
            None => ic_cdk::trap("Proposal not found"),
        };
        
        // Only the creator can cancel a proposal
        if proposal.creator != caller {
            ic_cdk::trap("Only the proposal creator can cancel it");
        }
        
        if !matches!(proposal.status, ProposalStatus::Active) {
            ic_cdk::trap("Only active proposals can be canceled");
        }
        
        proposal.status = ProposalStatus::Canceled;
        
        proposal.clone()
    })
}

// For testing: mint some tokens to the caller
#[update]
fn mint_test_tokens(amount: u64) {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let balance = state.token_balances.entry(caller).or_insert(0);
        *balance += amount;
    });
}

// Required for candid interface generation
candid::export_service!();
#[query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
