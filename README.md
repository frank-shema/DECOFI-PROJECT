
# DeCoFi - Decentralized Cooperative Finance Platform

DeCoFi is a decentralized financial system built on the Internet Computer Protocol (ICP), providing secure financial services including savings, loans, transactions, governance, and rewards.

## Project Structure

### Frontend (React)

The frontend is built with React and includes:

- Protected routes for authenticated users
- Integration with Internet Identity (II) for authentication
- Connection to ICP canisters using @dfinity/agent
- User dashboard, deposit/withdraw, loans, governance, and other financial features

### Backend (Rust on ICP)

The backend consists of multiple Rust canisters deployed on the Internet Computer:

1. **Authentication Canister**: Handles user authentication via Internet Identity
2. **Savings & Wallet Canister**: Manages user balances, deposits, and withdrawals
3. **Loans Canister**: Processes loan applications, approvals, and repayments
4. **Transactions Canister**: Records all financial transactions
5. **Governance Canister**: Enables DAO-style governance with proposals and voting

## Getting Started

### Prerequisites

- Node.js and npm
- Internet Computer SDK (DFX)
- Rust and cargo
- Internet Computer Canister Development Kit (CDK)

### Running Locally

1. Start the local replica:
   ```
   dfx start --background
   ```

2. Deploy the canisters:
   ```
   dfx deploy
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

### Deployment to ICP Mainnet

1. Build the canisters:
   ```
   dfx build --network ic
   ```

2. Deploy to mainnet:
   ```
   dfx deploy --network ic
   ```

## Security Features

- Internet Identity (II) integration for secure authentication
- Protected routes for authenticated users only
- Role-based access control for admin features
- Secure on-chain transaction processing
- Encryption for sensitive financial data

## Features

- **User Authentication**: Secure login using Internet Identity
- **Savings & Wallet**: Deposit, withdraw, and track balances with interest
- **Loans**: Apply for loans, track status, and manage repayments
- **Transactions**: View transaction history with on-chain verification
- **Governance**: Participate in voting on cooperative policies
- **Rewards**: Earn rewards for savings and platform participation

## Development Roadmap

1. **Phase 1**: Authentication and basic wallet functionality
2. **Phase 2**: Loan applications and processing
3. **Phase 3**: Governance and voting mechanisms
4. **Phase 4**: Rewards and incentive structures
5. **Phase 5**: Advanced features and optimizations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
