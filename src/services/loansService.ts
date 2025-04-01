
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/loans/loans.did';
import { useAuth } from '../context/AuthContext';

// Define the LoanType type
export enum LoanType {
  Personal = 'Personal',
  Business = 'Business',
  Education = 'Education',
  Housing = 'Housing',
  Agriculture = 'Agriculture',
  Medical = 'Medical'
}

// Define the LoanStatus type
export enum LoanStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Active = 'Active',
  PaidOff = 'PaidOff',
  Defaulted = 'Defaulted'
}

// Define the LoanApplication type
export interface LoanApplication {
  id: string;
  principal: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  purpose: LoanType;
  applicationDate: bigint;
  status: LoanStatus;
  approvalDate?: bigint;
  collateralAmount?: number;
  creditScore?: number;
  monthlyPayment: number;
}

// Define the LoanPayment type
export interface LoanPayment {
  id: string;
  loanId: string;
  principal: string;
  amount: number;
  timestamp: bigint;
  status: 'Pending' | 'Completed' | 'Failed';
}

export const useLoansService = () => {
  const { agent } = useAuth();
  
  // Create a loans actor using the agent from auth context
  const getLoansActor = () => {
    if (!agent) {
      throw new Error('Authentication required');
    }
    
    return Actor.createActor(idlFactory, {
      agent,
      canisterId: process.env.LOANS_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai', // Replace with actual canister ID
    });
  };
  
  // Function to apply for a loan
  const applyForLoan = async (amount: number, termMonths: number, purpose: LoanType): Promise<LoanApplication> => {
    const actor = getLoansActor();
    const result = await actor.apply_for_loan(amount, termMonths, { [purpose]: null });
    
    return transformLoanResponse(result);
  };
  
  // Function to get user's loans
  const getLoans = async (): Promise<LoanApplication[]> => {
    const actor = getLoansActor();
    const loans = await actor.get_loans();
    
    return loans.map(transformLoanResponse);
  };
  
  // Function to get loan details
  const getLoanDetails = async (loanId: string): Promise<LoanApplication | null> => {
    const actor = getLoansActor();
    const loan = await actor.get_loan_details(loanId);
    
    if (!loan.length) return null;
    return transformLoanResponse(loan[0]);
  };
  
  // Function to make a loan payment
  const makePayment = async (loanId: string, amount: number): Promise<LoanPayment> => {
    const actor = getLoansActor();
    const payment = await actor.make_payment(loanId, amount);
    
    return {
      id: payment.id,
      loanId: payment.loan_id,
      principal: payment.principal.toString(),
      amount: payment.amount,
      timestamp: payment.timestamp,
      status: Object.keys(payment.status)[0] as 'Pending' | 'Completed' | 'Failed',
    };
  };
  
  // Function to get loan payments
  const getPayments = async (loanId: string): Promise<LoanPayment[]> => {
    const actor = getLoansActor();
    const payments = await actor.get_payments(loanId);
    
    return payments.map(payment => ({
      id: payment.id,
      loanId: payment.loan_id,
      principal: payment.principal.toString(),
      amount: payment.amount,
      timestamp: payment.timestamp,
      status: Object.keys(payment.status)[0] as 'Pending' | 'Completed' | 'Failed',
    }));
  };
  
  // Function to calculate loan eligibility
  const calculateEligibility = async (): Promise<number> => {
    const actor = getLoansActor();
    return actor.calculate_eligibility();
  };
  
  // Helper function to transform the loan response
  const transformLoanResponse = (loan: any): LoanApplication => {
    return {
      id: loan.id,
      principal: loan.principal.toString(),
      amount: loan.amount,
      termMonths: loan.term_months,
      interestRate: loan.interest_rate,
      purpose: Object.keys(loan.purpose)[0] as LoanType,
      applicationDate: loan.application_date,
      status: Object.keys(loan.status)[0] as LoanStatus,
      approvalDate: loan.approval_date.length ? loan.approval_date[0] : undefined,
      collateralAmount: loan.collateral_amount.length ? loan.collateral_amount[0] : undefined,
      creditScore: loan.credit_score.length ? loan.credit_score[0] : undefined,
      monthlyPayment: loan.monthly_payment,
    };
  };
  
  return {
    applyForLoan,
    getLoans,
    getLoanDetails,
    makePayment,
    getPayments,
    calculateEligibility,
  };
};
