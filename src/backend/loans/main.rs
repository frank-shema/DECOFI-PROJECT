use ic_cdk::export::candid::{CandidType, Principal};
use ic_cdk_macros::*;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum LoanStatus {
    Pending,
    Approved,
    Rejected,
    Active,
    PaidOff,
    Defaulted,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum LoanType {
    Personal,
    Business,
    Education,
    Housing,
    Agriculture,
    Medical,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
struct LoanApplication {
    id: String,
    principal: Principal,
    amount: f64,
    term_months: u8,
    interest_rate: f64,
    purpose: LoanType,
    application_date: u64,
    status: LoanStatus,
    approval_date: Option<u64>,
    collateral_amount: Option<f64>,
    credit_score: Option<u16>,
    monthly_payment: f64,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
struct LoanPayment {
    id: String,
    loan_id: String,
    principal: Principal,
    amount: f64,
    timestamp: u64,
    status: LoanPaymentStatus,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
enum LoanPaymentStatus {
    Pending,
    Completed,
    Failed,
}

thread_local! {
    static LOANS: RefCell<HashMap<String, LoanApplication>> = RefCell::new(HashMap::new());
    static PAYMENTS: RefCell<Vec<LoanPayment>> = RefCell::new(Vec::new());
    static LOAN_COUNTER: RefCell<u64> = RefCell::new(0);
}

#[update]
fn apply_for_loan(amount: f64, term_months: u8, purpose: LoanType) -> LoanApplication {
    let caller = ic_cdk::caller();
    let id = LOAN_COUNTER.with(|counter| {
        let id = *counter.borrow();
        *counter.borrow_mut() += 1;
        id.to_string()
    });

    let interest_rate = 0.05; // 5% annual interest (example)
    let monthly_payment = (amount * (1.0 + interest_rate)) / (term_months as f64);

    let loan = LoanApplication {
        id: id.clone(),
        principal: caller,
        amount,
        term_months,
        interest_rate,
        purpose,
        application_date: ic_cdk::api::time(),
        status: LoanStatus::Pending,
        approval_date: None,
        collateral_amount: None, // Add logic for collateral if needed
        credit_score: None,      // Add logic for credit score if needed
        monthly_payment,
    };

    LOANS.with(|loans| {
        loans.borrow_mut().insert(id, loan.clone());
    });
    loan
}

#[query]
fn get_loans() -> Vec<LoanApplication> {
    let caller = ic_cdk::caller();
    LOANS.with(|loans| {
        loans
            .borrow()
            .values()
            .filter(|loan| loan.principal == caller)
            .cloned()
            .collect()
    })
}

#[query]
fn get_loan_details(id: String) -> Option<LoanApplication> {
    LOANS.with(|loans| loans.borrow().get(&id).cloned())
}

#[update]
fn approve_loan(id: String) -> LoanApplication {
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        let loan = loans.get_mut(&id).expect("Loan not found");

        if loan.status != LoanStatus::Pending {
            panic!("Loan is not in Pending status");
        }

        loan.status = LoanStatus::Approved;
        loan.approval_date = Some(ic_cdk::api::time());
        loan.status = LoanStatus::Active;
        loan.clone()
    })
}

#[update]
fn reject_loan(id: String) -> LoanApplication {
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        let loan = loans.get_mut(&id).expect("Loan not found");

        if loan.status != LoanStatus::Pending {
            panic!("Loan is not in Pending status");
        }

        loan.status = LoanStatus::Rejected;
        loan.clone()
    })
}

#[update]
fn make_payment(loan_id: String, amount: f64) -> LoanPayment {
    let caller = ic_cdk::caller();
    let payment_id = format!("payment-{}", ic_cdk::api::time());

    let payment = LoanPayment {
        id: payment_id.clone(),
        loan_id: loan_id.clone(),
        principal: caller,
        amount,
        timestamp: ic_cdk::api::time(),
        status: LoanPaymentStatus::Completed, // Simplified for now
    };

    PAYMENTS.with(|payments| {
        payments.borrow_mut().push(payment.clone());
    });

    // Update loan status if fully paid
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        let loan = loans.get_mut(&loan_id).expect("Loan not found");
        if loan.monthly_payment * (loan.term_months as f64) <= amount {
            loan.status = LoanStatus::PaidOff;
        }
    });

    payment
}

#[query]
fn get_payments(loan_id: String) -> Vec<LoanPayment> {
    PAYMENTS.with(|payments| {
        payments
            .borrow()
            .iter()
            .filter(|payment| payment.loan_id == loan_id)
            .cloned()
            .collect()
    })
}

#[query]
fn calculate_eligibility() -> f64 {
    // Simplified eligibility calculation (e.g., based on token balance or credit score)
    let caller = ic_cdk::caller();
    let token_balance = ic_cdk::api::call::call(
        Principal::from_text("governance-canister-id").unwrap(),
        "get_token_balance",
        ()
    ).await.unwrap_or(0);
    (token_balance as f64) * 2.0 // Example: Can borrow 2x their token balance
}