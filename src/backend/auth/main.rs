
// This is a sample Rust code for the Authentication canister
// In a real project, this would be in a separate repository

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk::export::{
    candid,
    serde::Serialize,
};
use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::HashMap;

#[derive(CandidType, Clone, Deserialize, Serialize)]
struct User {
    principal: Principal,
    username: String,
    email: String,
    created_at: u64,
    roles: Vec<String>,
}

#[derive(Default)]
struct AuthStorage {
    users: HashMap<Principal, User>,
    sessions: HashMap<Principal, u64>, // Principal -> Expiry timestamp
}

thread_local! {
    static STATE: std::cell::RefCell<AuthStorage> = std::cell::RefCell::new(AuthStorage::default());
}

#[query]
fn is_authenticated() -> bool {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let sessions = &state.borrow().sessions;
        match sessions.get(&caller) {
            Some(expiry) => *expiry > time(),
            None => false,
        }
    })
}

#[update]
fn login(username: String) -> bool {
    let caller = ic_cdk::caller();
    
    // Simple login logic - in a real app, this would verify credentials
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        
        // Create user if not exists
        if !state.users.contains_key(&caller) {
            let user = User {
                principal: caller,
                username: username.clone(),
                email: format!("{}@example.com", username),
                created_at: time(),
                roles: vec!["user".to_string()],
            };
            state.users.insert(caller, user);
        }
        
        // Set session expiry (30 days from now)
        let expiry = time() + 30 * 24 * 60 * 60 * 1_000_000_000;
        state.sessions.insert(caller, expiry);
        
        true
    })
}

#[update]
fn logout() -> bool {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.sessions.remove(&caller);
        true
    })
}

#[query]
fn get_user_info() -> User {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let state = state.borrow();
        match state.users.get(&caller) {
            Some(user) => user.clone(),
            None => {
                // Return default user if not found
                User {
                    principal: caller,
                    username: "anonymous".to_string(),
                    email: "anonymous@example.com".to_string(),
                    created_at: 0,
                    roles: vec![],
                }
            }
        }
    })
}

// Required for candid interface generation
candid::export_service!();
#[query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
