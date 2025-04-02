
// This is a sample Rust code for the Loans canister
// In a real project, this would be in a separate repository

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk::export::{
    candid,
    serde::Serialize,
};
use ic_cdk_macros::*;
use std::collections::HashMap;
use std::cell::RefCell;

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum LoanStatus {
    Pending,
    Approved,
    Rejected,
    Active,
    PaidOff,
    Defaulted,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum LoanType {
    Personal,
    Business,
    Education,
    Housing,
    Agriculture,
    Medical,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub struct LoanApplication {
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

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum PaymentStatus {
    Pending,
    Completed,
    Failed,
}

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub struct LoanPayment {
    id: String,
    loan_id: String,
    principal: Principal,
    amount: f64,
    timestamp: u64,
    status: PaymentStatus,
}

#[derive(Default)]
struct LoansStorage {
    loans: HashMap<String, LoanApplication>,
    payments: HashMap<String, Vec<LoanPayment>>,
    next_loan_id: u64,
    next_payment_id: u64,
}

thread_local! {
    static STATE: RefCell<LoansStorage> = RefCell::new(LoansStorage::default());
}

#[update]
fn apply_for_loan(amount: f64, term_months: u8, purpose: LoanType) -> LoanApplication {
    let caller = ic_cdk::caller();
    
    // Calculate interest rate based on loan type
    let interest_rate = match purpose {
        LoanType::Personal => 10.0,    // 10% interest
        LoanType::Business => 8.5,     // 8.5% interest
        LoanType::Education => 5.0,    // 5% interest
        LoanType::Housing => 7.0,      // 7% interest
        LoanType::Agriculture => 6.0,  // 6% interest
        LoanType::Medical => 4.5,      // 4.5% interest
    };
    
    // Simple monthly payment calculation (principal + interest / months)
    let total_interest = amount * interest_rate * (term_months as f64 / 12.0) / 100.0;
    let monthly_payment = (amount + total_interest) / (term_months as f64);
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        let loan_id = state.next_loan_id;
        state.next_loan_id += 1;
        
        let loan = LoanApplication {
            id: format!("LOAN-{}", loan_id),
            principal: caller,
            amount,
            term_months,
            interest_rate,
            purpose,
            application_date: time(),
            status: LoanStatus::Pending,
            approval_date: None,
            collateral_amount: None,
            credit_score: None,
            monthly_payment,
        };
        
        state.loans.insert(loan.id.clone(), loan.clone());
        loan
    })
}

#[query]
fn get_loans() -> Vec<LoanApplication> {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let state = state.borrow();
        state
            .loans
            .values()
            .filter(|loan| loan.principal == caller)
            .cloned()
            .collect()
    })
}

#[query]
fn get_loan_details(loan_id: String) -> Option<LoanApplication> {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let state = state.borrow();
        state
            .loans
            .get(&loan_id)
            .filter(|loan| loan.principal == caller)
            .cloned()
    })
}

#[update]
fn approve_loan(loan_id: String) -> LoanApplication {
    // In a real application, we would check if the caller is an admin
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        if let Some(loan) = state.loans.get_mut(&loan_id) {
            loan.status = LoanStatus::Approved;
            loan.approval_date = Some(time());
            loan.clone()
        } else {
            ic_cdk::trap("Loan not found");
        }
    })
}

#[update]
fn reject_loan(loan_id: String) -> LoanApplication {
    // In a real application, we would check if the caller is an admin
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        if let Some(loan) = state.loans.get_mut(&loan_id) {
            loan.status = LoanStatus::Rejected;
            loan.clone()
        } else {
            ic_cdk::trap("Loan not found");
        }
    })
}

#[update]
fn make_payment(loan_id: String, amount: f64) -> LoanPayment {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Check if loan exists and belongs to caller
        if let Some(_) = state.loans.get(&loan_id).filter(|loan| loan.principal == caller) {
            let payment_id = state.next_payment_id;
            state.next_payment_id += 1;
            
            let payment = LoanPayment {
                id: format!("PMT-{}", payment_id),
                loan_id: loan_id.clone(),
                principal: caller,
                amount,
                timestamp: time(),
                status: PaymentStatus::Completed, // In a real app, this would be pending until confirmed
            };
            
            // Add payment to the loan's payment history
            state.payments.entry(loan_id).or_insert_with(Vec::new).push(payment.clone());
            
            // TODO: Update loan status based on payments (e.g., if fully paid off)
            
            payment
        } else {
            ic_cdk::trap("Loan not found or does not belong to caller");
        }
    })
}

#[query]
fn get_payments(loan_id: String) -> Vec<LoanPayment> {
    let caller = ic_cdk::caller();
    
    STATE.with(|state| {
        let state = state.borrow();
        
        // First, check if the loan belongs to the caller
        if let Some(loan) = state.loans.get(&loan_id) {
            if loan.principal != caller {
                return Vec::new(); // Return empty vector if loan doesn't belong to caller
            }
        } else {
            return Vec::new(); // Loan not found
        }
        
        // Return payments for the loan
        state
            .payments
            .get(&loan_id)
            .cloned()
            .unwrap_or_default()
    })
}

#[query]
fn calculate_eligibility() -> f64 {
    let caller = ic_cdk::caller();
    
    // In a real application, we would:
    // 1. Check the caller's savings balance
    // 2. Check their transaction history
    // 3. Calculate a credit score based on history
    // 4. Return the maximum loan amount they qualify for
    
    // For this demo, we'll just return a fixed amount
    3000.0
}

// Required for candid interface generation
candid::export_service!();
#[query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
