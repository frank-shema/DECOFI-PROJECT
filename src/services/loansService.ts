import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/loans/loans.did";
import { getAuthenticatedApi } from "../services/api";
import { useState, useEffect } from 'react';

// Define enum types to match the Candid interface
export enum LoanStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Active = 'Active',
  PaidOff = 'PaidOff',
  Defaulted = 'Defaulted'
}

export enum LoanType {
  Personal = 'Personal',
  Business = 'Business',
  Education = 'Education',
  Housing = 'Housing',
  Agriculture = 'Agriculture',
  Medical = 'Medical'
}

// Define proper types for the loan data
export interface LoanApplication {
  id: string;
  principal: string;
  amount: number;
  term_months: number;
  interest_rate: number;
  purpose: LoanType;
  application_date: bigint;
  status: LoanStatus;
  approval_date?: bigint;
  collateral_amount?: number;
  credit_score?: number;
  monthly_payment: number;
  
  // Add camelCase aliases for use in UI components
  termMonths: number;
  interestRate: number;
  applicationDate: bigint;
  monthlyPayment: number;
}

export interface Loan {
  id: string;
  loan_id: string;
  principal: string;
  amount: number;
  timestamp: bigint;
  status: 'active' | 'paid' | 'defaulted';
  interest_rate: number;
  term_months: number;
  monthly_payment: number;
  remaining_payments: number;
  next_payment_due: bigint;
}

export interface LoanPayment {
  id: string;
  loan_id: string;
  principal: string;
  amount: number;
  timestamp: bigint;
  status: 'pending' | 'completed' | 'failed';
}

// Constants
const loansCanisterId = import.meta.env.VITE_LOANS_CANISTER_ID || "r7inp-6aaaa-aaaaa-aaabq-cai";

// Create a loans actor with the provided agent
const createLoansActor = (agent: HttpAgent) => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: loansCanisterId,
  });
};

// Hook for using loans service
export const useLoansService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get all loans for the current user
  const getLoans = async (): Promise<LoanApplication[]> => {
    try {
      setIsLoading(true);
      const api = await getAuthenticatedApi();
      const loans = await api.loansActor.get_loans();
      
      if (!Array.isArray(loans)) {
        console.error("Loans is not an array:", loans);
        return [];
      }
      
      return loans.map((loan: any) => {
        const transformedLoan = {
          id: loan.id,
          principal: loan.principal.toString(),
          amount: Number(loan.amount),
          term_months: Number(loan.term_months),
          interest_rate: Number(loan.interest_rate),
          purpose: loan.purpose,
          application_date: loan.application_date,
          status: loan.status,
          approval_date: loan.approval_date?.[0],
          collateral_amount: loan.collateral_amount?.[0] ? Number(loan.collateral_amount[0]) : undefined,
          credit_score: loan.credit_score?.[0] ? Number(loan.credit_score[0]) : undefined,
          monthly_payment: Number(loan.monthly_payment),
          
          // Add camelCase aliases
          termMonths: Number(loan.term_months),
          interestRate: Number(loan.interest_rate),
          applicationDate: loan.application_date,
          monthlyPayment: Number(loan.monthly_payment)
        };
        return transformedLoan;
      });
    } catch (err) {
      console.error("Error fetching loans:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Apply for a new loan
  const applyForLoan = async (
    amount: number,
    term_months: number,
    purpose: LoanType
  ): Promise<LoanApplication | null> => {
    try {
      setIsLoading(true);
      const api = await getAuthenticatedApi();
      const result = await api.loansActor.apply_for_loan(amount, term_months, purpose);
      
      if (!result) return null;
      
      return {
        id: result.id,
        principal: result.principal.toString(),
        amount: Number(result.amount),
        term_months: Number(result.term_months),
        interest_rate: Number(result.interest_rate),
        purpose: result.purpose,
        application_date: result.application_date,
        status: result.status,
        approval_date: result.approval_date?.[0],
        collateral_amount: result.collateral_amount?.[0] ? Number(result.collateral_amount[0]) : undefined,
        credit_score: result.credit_score?.[0] ? Number(result.credit_score[0]) : undefined,
        monthly_payment: Number(result.monthly_payment),
        
        // Add camelCase aliases
        termMonths: Number(result.term_months),
        interestRate: Number(result.interest_rate),
        applicationDate: result.application_date,
        monthlyPayment: Number(result.monthly_payment)
      };
    } catch (err) {
      console.error("Error applying for loan:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get loan details
  const getLoanDetails = async (loanId: string): Promise<LoanApplication | null> => {
    try {
      setIsLoading(true);
      const api = await getAuthenticatedApi();
      const result = await api.loansActor.get_loan_details(loanId);
      if (!result || result.length === 0) return null;
      
      const loan = result[0];
      return {
        id: loan.id,
        principal: loan.principal.toString(),
        amount: Number(loan.amount),
        term_months: Number(loan.term_months),
        interest_rate: Number(loan.interest_rate),
        purpose: loan.purpose,
        application_date: loan.application_date,
        status: loan.status,
        approval_date: loan.approval_date?.[0],
        collateral_amount: loan.collateral_amount?.[0] ? Number(loan.collateral_amount[0]) : undefined,
        credit_score: loan.credit_score?.[0] ? Number(loan.credit_score[0]) : undefined,
        monthly_payment: Number(loan.monthly_payment),
        
        // Add camelCase aliases
        termMonths: Number(loan.term_months),
        interestRate: Number(loan.interest_rate),
        applicationDate: loan.application_date,
        monthlyPayment: Number(loan.monthly_payment)
      };
    } catch (err) {
      console.error("Error fetching loan details:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Make a payment on a loan
  const makePayment = async (
    loanId: string,
    amount: number
  ): Promise<LoanPayment | null> => {
    try {
      setIsLoading(true);
      const api = await getAuthenticatedApi();
      const result = await api.loansActor.make_payment(loanId, amount);
      return result ? {
        id: result.id,
        loan_id: result.loan_id,
        principal: result.principal.toString(),
        amount: Number(result.amount),
        timestamp: result.timestamp,
        status: result.status.completed ? 'completed' : 
                result.status.pending ? 'pending' : 'failed'
      } : null;
    } catch (err) {
      console.error("Error making loan payment:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get loan payments
  const getPayments = async (loanId: string): Promise<LoanPayment[]> => {
    try {
      setIsLoading(true);
      const api = await getAuthenticatedApi();
      const payments = await api.loansActor.get_payments(loanId);
      
      if (!Array.isArray(payments)) {
        console.error("Payments is not an array:", payments);
        return [];
      }
      
      return payments.map((payment: any) => ({
        id: payment.id,
        loan_id: payment.loan_id,
        principal: payment.principal.toString(),
        amount: Number(payment.amount),
        timestamp: payment.timestamp,
        status: payment.status.completed ? 'completed' : 
                payment.status.pending ? 'pending' : 'failed'
      }));
    } catch (err) {
      console.error("Error fetching loan payments:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate eligibility
  const calculateEligibility = async (): Promise<number> => {
    try {
      setIsLoading(true);
      const api = await getAuthenticatedApi();
      const result = await api.loansActor.calculate_eligibility();
      return Number(result);
    } catch (err) {
      console.error("Error calculating eligibility:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate loan repayment schedule
  const calculateLoanRepayment = (
    principal: number,
    interestRate: number,
    termMonths: number
  ): number => {
    const monthlyRate = interestRate / 12 / 100;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    return parseFloat(monthlyPayment.toFixed(2));
  };

  return {
    isLoading,
    error,
    getLoans,
    applyForLoan,
    getLoanDetails,
    makePayment,
    getPayments,
    calculateEligibility,
    calculateLoanRepayment
  };
};
