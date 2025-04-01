use ic_cdk::export::candid::{CandidType, Principal};
use ic_cdk_macros::*;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum ProposalStatus {
    Active,
    Passed,
    Rejected,
    Executed,
    Canceled,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum VoteType {
    Yes,
    No,
    Abstain,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum ProposalType {
    FeatureRequest,
    BudgetAllocation,
    PolicyChange,
    MembershipRule,
    TokenIssuance,
    Other,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
struct Proposal {
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

#[derive(CandidType, Serialize, Deserialize, Clone)]
struct UserVote {
    proposal_id: String,
    user: Principal,
    vote_type: VoteType,
    voting_power: u64,
    timestamp: u64,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
struct TokenBalance {
    principal: Principal,
    amount: u64,
}

thread_local! {
    static PROPOSALS: RefCell<HashMap<String, Proposal>> = RefCell::new(HashMap::new());
    static USER_VOTES: RefCell<Vec<UserVote>> = RefCell::new(Vec::new());
    static TOKEN_BALANCES: RefCell<HashMap<Principal, TokenBalance>> = RefCell::new(HashMap::new());
    static PROPOSAL_COUNTER: RefCell<u64> = RefCell::new(0);
}

#[update]
fn create_proposal(title: String, description: String, proposal_type: ProposalType, duration: u64) -> Proposal {
    let caller = ic_cdk::caller();
    let id = PROPOSAL_COUNTER.with(|counter| {
        let id = *counter.borrow();
        *counter.borrow_mut() += 1;
        id.to_string()
    });

    let now = ic_cdk::api::time();
    let proposal = Proposal {
        id: id.clone(),
        creator: caller,
        title,
        description,
        proposal_type,
        voting_start: now,
        voting_end: now + duration * 1_000_000_000, // Duration in seconds
        status: ProposalStatus::Active,
        yes_votes: 0,
        no_votes: 0,
        abstain_votes: 0,
        min_votes_required: 100, // Example threshold
        execution_timestamp: None,
        created_at: now,
    };

    PROPOSALS.with(|proposals| {
        proposals.borrow_mut().insert(id, proposal.clone());
    });
    proposal
}

#[query]
fn get_proposals() -> Vec<Proposal> {
    PROPOSALS.with(|proposals| proposals.borrow().values().cloned().collect())
}

#[query]
fn get_proposal(id: String) -> Option<Proposal> {
    PROPOSALS.with(|proposals| proposals.borrow().get(&id).cloned())
}

#[update]
fn vote(proposal_id: String, vote_type: VoteType) -> UserVote {
    let caller = ic_cdk::caller();
    let voting_power = get_voting_power_internal(caller);

    let user_vote = UserVote {
        proposal_id: proposal_id.clone(),
        user: caller,
        vote_type: vote_type.clone(),
        voting_power,
        timestamp: ic_cdk::api::time(),
    };

    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        let proposal = proposals.get_mut(&proposal_id).expect("Proposal not found");

        if ic_cdk::api::time() > proposal.voting_end {
            panic!("Voting period has ended");
        }

        match vote_type {
            VoteType::Yes => proposal.yes_votes += voting_power,
            VoteType::No => proposal.no_votes += voting_power,
            VoteType::Abstain => proposal.abstain_votes += voting_power,
        }
    });

    USER_VOTES.with(|votes| {
        votes.borrow_mut().push(user_vote.clone());
    });

    user_vote
}

#[query]
fn get_user_votes() -> Vec<UserVote> {
    let caller = ic_cdk::caller();
    USER_VOTES.with(|votes| {
        votes
            .borrow()
            .iter()
            .filter(|vote| vote.user == caller)
            .cloned()
            .collect()
    })
}

#[query]
fn get_proposal_votes(proposal_id: String) -> Vec<UserVote> {
    USER_VOTES.with(|votes| {
        votes
            .borrow()
            .iter()
            .filter(|vote| vote.proposal_id == proposal_id)
            .cloned()
            .collect()
    })
}

#[query]
fn get_token_balance() -> u64 {
    let caller = ic_cdk::caller();
    TOKEN_BALANCES.with(|balances| {
        balances
            .borrow()
            .get(&caller)
            .map_or(0, |balance| balance.amount)
    })
}

#[query]
fn get_voting_power() -> u64 {
    get_voting_power_internal(ic_cdk::caller())
}

fn get_voting_power_internal(principal: Principal) -> u64 {
    TOKEN_BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let balance = balances
            .entry(principal)
            .or_insert(TokenBalance {
                principal,
                amount: 100, // Default tokens for new users
            });
        balance.amount
    })
}

#[update]
fn execute_proposal(proposal_id: String) -> Proposal {
    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        let proposal = proposals.get_mut(&proposal_id).expect("Proposal not found");

        if proposal.status != ProposalStatus::Active {
            panic!("Proposal is not active");
        }

        let total_votes = proposal.yes_votes + proposal.no_votes + proposal.abstain_votes;
        if total_votes < proposal.min_votes_required {
            panic!("Not enough votes to execute");
        }

        if proposal.yes_votes > proposal.no_votes {
            proposal.status = ProposalStatus::Passed;
            proposal.execution_timestamp = Some(ic_cdk::api::time());
            proposal.status = ProposalStatus::Executed;
        } else {
            proposal.status = ProposalStatus::Rejected;
        }

        proposal.clone()
    })
}

#[update]
fn cancel_proposal(proposal_id: String) -> Proposal {
    let caller = ic_cdk::caller();
    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        let proposal = proposals.get_mut(&proposal_id).expect("Proposal not found");

        if proposal.creator != caller {
            panic!("Only the creator can cancel the proposal");
        }

        if proposal.status != ProposalStatus::Active {
            panic!("Proposal is not active");
        }

        proposal.status = ProposalStatus::Canceled;
        proposal.clone()
    })
}