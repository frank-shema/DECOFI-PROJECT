
// This is a sample Rust code for the Wallet canister
// In a real project, this would be in a separate repository

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk::export::{
    candid,
    serde::Serialize,
};
use ic_cdk_macros::*;
use std::collections::HashMap;

#[derive(CandidType, Clone, Deserialize, Serialize)]
enum TxType {
    Deposit,
    Withdrawal,
    Transfer,
    Interest,
    Reward,
    LoanPayment,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
enum TxStatus {
    Pending,
    Completed,
    Failed,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
struct TxRecord {
    id: String,
    amount: f64,
    from_principal: Principal,
    to_principal: Option<Principal>,
    timestamp: u64,
    tx_type: TxType,
    status: TxStatus,
    description: Option<String>,
}

#[derive(Default)]
struct WalletStorage {
    balances: HashMap<Principal, f64>,
    transactions: Vec<TxRecord>,
    next_tx_id: u64,
}

thread_local! {
    static STATE: std::cell::RefCell<WalletStorage> = std::cell::RefCell::new(WalletStorage::default());
}

#[query]
fn get_balance() -> f64 {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        *state.borrow().balances.get(&caller).unwrap_or(&0.0)
    })
}

#[update]
fn deposit(amount: f64) -> TxRecord {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Update balance
        let balance = state.balances.entry(caller).or_insert(0.0);
        *balance += amount;
        
        // Create transaction record
        let tx_id = state.next_tx_id;
        state.next_tx_id += 1;
        
        let tx = TxRecord {
            id: format!("TX{}", tx_id),
            amount,
            from_principal: caller,
            to_principal: None,
            timestamp: time(),
            tx_type: TxType::Deposit,
            status: TxStatus::Completed,
            description: Some("Deposit".to_string()),
        };
        
        state.transactions.push(tx.clone());
        tx
    })
}

#[update]
fn withdraw(amount: f64) -> TxRecord {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Check balance
        let balance = state.balances.entry(caller).or_insert(0.0);
        
        let status = if *balance >= amount {
            // Update balance
            *balance -= amount;
            TxStatus::Completed
        } else {
            TxStatus::Failed
        };
        
        // Create transaction record
        let tx_id = state.next_tx_id;
        state.next_tx_id += 1;
        
        let tx = TxRecord {
            id: format!("TX{}", tx_id),
            amount,
            from_principal: caller,
            to_principal: None,
            timestamp: time(),
            tx_type: TxType::Withdrawal,
            status,
            description: Some("Withdrawal".to_string()),
        };
        
        state.transactions.push(tx.clone());
        tx
    })
}

#[update]
fn transfer(to: Principal, amount: f64) -> TxRecord {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Check balance
        let from_balance = state.balances.entry(caller).or_insert(0.0);
        
        let status = if *from_balance >= amount {
            // Update balances
            *from_balance -= amount;
            
            let to_balance = state.balances.entry(to).or_insert(0.0);
            *to_balance += amount;
            
            TxStatus::Completed
        } else {
            TxStatus::Failed
        };
        
        // Create transaction record
        let tx_id = state.next_tx_id;
        state.next_tx_id += 1;
        
        let tx = TxRecord {
            id: format!("TX{}", tx_id),
            amount,
            from_principal: caller,
            to_principal: Some(to),
            timestamp: time(),
            tx_type: TxType::Transfer,
            status,
            description: Some(format!("Transfer to {}", to)),
        };
        
        state.transactions.push(tx.clone());
        tx
    })
}

#[query]
fn get_transactions() -> Vec<TxRecord> {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let state = state.borrow();
        state
            .transactions
            .iter()
            .filter(|tx| tx.from_principal == caller || tx.to_principal == Some(caller))
            .cloned()
            .collect()
    })
}

#[update]
fn calculate_interest() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Apply 0.5% monthly interest to all balances
        for (principal, balance) in state.balances.iter_mut() {
            let interest = *balance * 0.005;
            *balance += interest;
            
            // Create interest transaction
            let tx_id = state.next_tx_id;
            state.next_tx_id += 1;
            
            let tx = TxRecord {
                id: format!("TX{}", tx_id),
                amount: interest,
                from_principal: Principal::anonymous(),
                to_principal: Some(*principal),
                timestamp: time(),
                tx_type: TxType::Interest,
                status: TxStatus::Completed,
                description: Some("Monthly interest".to_string()),
            };
            
            state.transactions.push(tx);
        }
    });
}

// Required for candid interface generation
candid::export_service!();
#[query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
