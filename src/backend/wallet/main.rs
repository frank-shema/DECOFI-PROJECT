use ic_cdk::export::candid::{CandidType, Principal};
use ic_cdk_macros::*;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum TxType {
    Deposit,
    Withdrawal,
    Transfer,
    Interest,
    Reward,
    LoanPayment,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum TxStatus {
    Pending,
    Completed,
    Failed,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
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

thread_local! {
    static BALANCES: RefCell<HashMap<Principal, f64>> = RefCell::new(HashMap::new());
    static TRANSACTIONS: RefCell<Vec<TxRecord>> = RefCell::new(Vec::new());
}

#[query]
fn get_balance() -> f64 {
    let caller = ic_cdk::caller();
    BALANCES.with(|balances| *balances.borrow().get(&caller).unwrap_or(&0.0))
}

#[update]
fn deposit(amount: f64) -> TxRecord {
    let caller = ic_cdk::caller();
    if amount <= 0.0 {
        panic!("Amount must be positive");
    }

    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let balance = balances.entry(caller).or_insert(0.0);
        *balance += amount;
    });

    let tx = TxRecord {
        id: format!("tx-{}", ic_cdk::api::time()),
        amount,
        from_principal: caller,
        to_principal: None,
        timestamp: ic_cdk::api::time(),
        tx_type: TxType::Deposit,
        status: TxStatus::Completed,
        description: Some("Deposit".to_string()),
    };

    TRANSACTIONS.with(|txs| {
        txs.borrow_mut().push(tx.clone());
    });
    tx
}

#[update]
fn withdraw(amount: f64) -> TxRecord {
    let caller = ic_cdk::caller();
    if amount <= 0.0 {
        panic!("Amount must be positive");
    }

    let balance = BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let balance = balances.entry(caller).or_insert(0.0);
        if *balance < amount {
            panic!("Insufficient balance");
        }
        *balance -= amount;
        *balance
    });

    let tx = TxRecord {
        id: format!("tx-{}", ic_cdk::api::time()),
        amount,
        from_principal: caller,
        to_principal: None,
        timestamp: ic_cdk::api::time(),
        tx_type: TxType::Withdrawal,
        status: TxStatus::Completed,
        description: Some("Withdrawal".to_string()),
    };

    TRANSACTIONS.with(|txs| {
        txs.borrow_mut().push(tx.clone());
    });
    tx
}

#[update]
fn transfer(to_principal: Principal, amount: f64) -> TxRecord {
    let caller = ic_cdk::caller();
    if amount <= 0.0 {
        panic!("Amount must be positive");
    }

    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let from_balance = balances.entry(caller).or_insert(0.0);
        if *from_balance < amount {
            panic!("Insufficient balance");
        }
        *from_balance -= amount;

        let to_balance = balances.entry(to_principal).or_insert(0.0);
        *to_balance += amount;
    });

    let tx = TxRecord {
        id: format!("tx-{}", ic_cdk::api::time()),
        amount,
        from_principal: caller,
        to_principal: Some(to_principal),
        timestamp: ic_cdk::api::time(),
        tx_type: TxType::Transfer,
        status: TxStatus::Completed,
        description: Some("Transfer".to_string()),
    };

    TRANSACTIONS.with(|txs| {
        txs.borrow_mut().push(tx.clone());
    });
    tx
}

#[query]
fn get_transactions() -> Vec<TxRecord> {
    let caller = ic_cdk::caller();
    TRANSACTIONS.with(|txs| {
        txs.borrow()
            .iter()
            .filter(|tx| tx.from_principal == caller || tx.to_principal == Some(caller))
            .cloned()
            .collect()
    })
}

#[update]
fn calculate_interest() {
    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        for balance in balances.values_mut() {
            let interest = *balance * 0.05 / 12.0; // 5% annual interest, monthly
            *balance += interest;

            let tx = TxRecord {
                id: format!("tx-{}", ic_cdk::api::time()),
                amount: interest,
                from_principal: Principal::anonymous(),
                to_principal: None,
                timestamp: ic_cdk::api::time(),
                tx_type: TxType::Interest,
                status: TxStatus::Completed,
                description: Some("Interest accrual".to_string()),
            };

            TRANSACTIONS.with(|txs| {
                txs.borrow_mut().push(tx);
            });
        }
    });
}