
import { HttpAgent, Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

// Import the canister interface factories
import { idlFactory as authIdlFactory } from "../declarations/auth/auth.did";
import { idlFactory as walletIdlFactory } from "../declarations/wallet/wallet.did";
import { idlFactory as loansIdlFactory } from "../declarations/loans/loans.did";
import { idlFactory as governanceIdlFactory } from "../declarations/governance/governance.did";

// The canister IDs will be replaced with actual values when deploying to IC
const canisterIds = {
  auth: process.env.AUTH_CANISTER_ID || "rrkah-fqaaa-aaaaa-aaaaq-cai",
  wallet: process.env.WALLET_CANISTER_ID || "ryjl3-tyaaa-aaaaa-aaaba-cai",
  loans: process.env.LOANS_CANISTER_ID || "r7inp-6aaaa-aaaaa-aaabq-cai",
  governance: process.env.GOVERNANCE_CANISTER_ID || "rno2w-sqaaa-aaaaa-aaacq-cai",
};

// Local development host or mainnet host
const host = process.env.NODE_ENV === 'production' 
  ? 'https://ic0.app' 
  : 'http://localhost:8000';

interface ApiOptions {
  agent?: HttpAgent;
}

/**
 * Create a new API instance
 */
export class Api {
  private agent: HttpAgent;
  private authActor: any;
  private walletActor: any;
  private loansActor: any;
  private governanceActor: any;

  constructor(options: ApiOptions = {}) {
    this.agent = options.agent || new HttpAgent({ host });
    
    // In local development, we need to fetch the root key
    if (process.env.NODE_ENV !== 'production') {
      this.agent.fetchRootKey().catch(err => {
        console.warn("Unable to fetch root key. Check if your local replica is running");
        console.error(err);
      });
    }
    
    // Create actors for each canister
    this.authActor = Actor.createActor(authIdlFactory, {
      agent: this.agent,
      canisterId: canisterIds.auth,
    });
    
    this.walletActor = Actor.createActor(walletIdlFactory, {
      agent: this.agent,
      canisterId: canisterIds.wallet,
    });
    
    this.loansActor = Actor.createActor(loansIdlFactory, {
      agent: this.agent,
      canisterId: canisterIds.loans,
    });
    
    this.governanceActor = Actor.createActor(governanceIdlFactory, {
      agent: this.agent,
      canisterId: canisterIds.governance,
    });
  }
  
  // Auth canister methods
  async getUserInfo() {
    return this.authActor.getUserInfo();
  }
  
  // Wallet canister methods
  async getBalance() {
    return this.walletActor.getBalance();
  }
  
  async deposit(amount: number) {
    return this.walletActor.deposit(amount);
  }
  
  async withdraw(amount: number) {
    return this.walletActor.withdraw(amount);
  }
  
  async getTransactions() {
    return this.walletActor.getTransactions();
  }
  
  // Loans canister methods
  async applyForLoan(amount: number, purpose: string, term: number) {
    return this.loansActor.applyForLoan(amount, purpose, term);
  }
  
  async getActiveLoans() {
    return this.loansActor.getActiveLoans();
  }
  
  async getLoanApplications() {
    return this.loansActor.getLoanApplications();
  }
  
  // Governance canister methods
  async getActiveProposals() {
    return this.governanceActor.getActiveProposals();
  }
  
  async getPastProposals() {
    return this.governanceActor.getPastProposals();
  }
  
  async vote(proposalId: string, voteType: 'for' | 'against') {
    const voteVariant = voteType === 'for' ? { for: null } : { against: null };
    return this.governanceActor.vote(proposalId, voteVariant);
  }
  
  async getUserVotingPower() {
    return this.governanceActor.getUserVotingPower();
  }
}

/**
 * Creates an API instance with authentication
 */
export const createAuthenticatedApi = async (): Promise<Api> => {
  const authClient = await AuthClient.create();
  const isAuthenticated = await authClient.isAuthenticated();
  
  if (!isAuthenticated) {
    throw new Error("User is not authenticated");
  }
  
  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity, host });
  
  if (process.env.NODE_ENV !== 'production') {
    await agent.fetchRootKey();
  }
  
  return new Api({ agent });
};

/**
 * Create a singleton authenticated API instance
 */
let authenticatedApi: Api | null = null;

export const getAuthenticatedApi = async (): Promise<Api> => {
  if (!authenticatedApi) {
    authenticatedApi = await createAuthenticatedApi();
  }
  return authenticatedApi;
};

export const resetAuthenticatedApi = () => {
  authenticatedApi = null;
};
