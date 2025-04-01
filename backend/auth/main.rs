use ic_cdk::export::candid::{CandidType, Principal};
use ic_cdk_macros::*;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;

#[derive(CandidType, Serialize, Deserialize, Clone)]
struct User {
    principal: Principal,
    username: String,
    email: String,
    created_at: u64,
    roles: Vec<String>,
}

thread_local! {
    static USER: RefCell<Option<User>> = RefCell::new(None);
}

#[update]
fn login(username: String) -> bool {
    let caller = ic_cdk::caller();
    if caller == Principal::anonymous() {
        return false;
    }

    USER.with(|user| {
        let mut user = user.borrow_mut();
        if user.is_none() {
            *user = Some(User {
                principal: caller,
                username,
                email: format!("{}@decofi.com", caller.to_text()), // Placeholder email
                created_at: ic_cdk::api::time(),
                roles: vec!["user".to_string()], // Default role
            });
            true
        } else {
            false // User already logged in
        }
    })
}

#[update]
fn logout() -> bool {
    USER.with(|user| {
        let mut user = user.borrow_mut();
        if user.is_some() {
            *user = None;
            true
        } else {
            false
        }
    })
}

#[query]
fn is_authenticated() -> bool {
    let caller = ic_cdk::caller();
    USER.with(|user| {
        let user = user.borrow();
        user.as_ref().map_or(false, |u| u.principal == caller)
    })
}

#[query]
fn get_user_info() -> User {
    let caller = ic_cdk::caller();
    USER.with(|user| {
        let user = user.borrow();
        user.clone().unwrap_or_else(|| panic!("User not found or not authenticated"))
    })
}