import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type LoanStatus =
  | { PaidOff: null }
  | { Active: null }
  | { Rejected: null }
  | { Defaulted: null }
  | { Approved: null }
  | { Pending: null };
export type LoanType =
  | { Medical: null }
  | { Personal: null }
  | { Housing: null }
  | { Business: null }
  | { Agriculture: null }
  | { Education: null };
export type PaymentStatus =
  | { Completed: null }
  | { Failed: null }
  | { Pending: null };

export interface LoanApplication {
  id: string;
  amount: number;
  status: LoanStatus;
  credit_score: [] | [number];
  term_months: number;
  interest_rate: number;
  approval_date: [] | [bigint];
  application_date: bigint;
  principal: Principal;
  purpose: LoanType;
  monthly_payment: number;
  collateral_amount: [] | [number];
}

export interface LoanPayment {
  id: string;
  loan_id: string;
  amount: number;
  status: PaymentStatus;
  timestamp: bigint;
  principal: Principal;
}

export interface LoansService {
  apply_for_loan: ActorMethod<[number, number, LoanType], LoanApplication>;
  approve_loan: ActorMethod<[string], LoanApplication>;
  calculate_eligibility: ActorMethod<[], number>;
  get_loan_details: ActorMethod<[string], [] | [LoanApplication]>;
  get_loans: ActorMethod<[], LoanApplication[]>;
  get_payments: ActorMethod<[string], LoanPayment[]>;
  make_payment: ActorMethod<[string, number], LoanPayment>;
  reject_loan: ActorMethod<[string], LoanApplication>;
}
