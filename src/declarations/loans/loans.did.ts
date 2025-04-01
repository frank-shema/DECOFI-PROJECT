
export const idlFactory = ({ IDL }) => {
  const LoanStatus = IDL.Variant({
    'Pending': IDL.Null,
    'Approved': IDL.Null,
    'Rejected': IDL.Null,
    'Active': IDL.Null,
    'PaidOff': IDL.Null,
    'Defaulted': IDL.Null,
  });
  
  const LoanType = IDL.Variant({
    'Personal': IDL.Null,
    'Business': IDL.Null,
    'Education': IDL.Null,
    'Housing': IDL.Null,
    'Agriculture': IDL.Null,
    'Medical': IDL.Null,
  });
  
  const LoanApplication = IDL.Record({
    'id': IDL.Text,
    'principal': IDL.Principal,
    'amount': IDL.Float64,
    'term_months': IDL.Nat8,
    'interest_rate': IDL.Float64,
    'purpose': LoanType,
    'application_date': IDL.Nat64,
    'status': LoanStatus,
    'approval_date': IDL.Opt(IDL.Nat64),
    'collateral_amount': IDL.Opt(IDL.Float64),
    'credit_score': IDL.Opt(IDL.Nat16),
    'monthly_payment': IDL.Float64,
  });
  
  const PaymentStatus = IDL.Variant({
    'Pending': IDL.Null,
    'Completed': IDL.Null,
    'Failed': IDL.Null,
  });
  
  const LoanPayment = IDL.Record({
    'id': IDL.Text,
    'loan_id': IDL.Text,
    'principal': IDL.Principal,
    'amount': IDL.Float64,
    'timestamp': IDL.Nat64,
    'status': PaymentStatus,
  });
  
  return IDL.Service({
    'apply_for_loan': IDL.Func([IDL.Float64, IDL.Nat8, LoanType], [LoanApplication], []),
    'get_loans': IDL.Func([], [IDL.Vec(LoanApplication)], ['query']),
    'get_loan_details': IDL.Func([IDL.Text], [IDL.Opt(LoanApplication)], ['query']),
    'approve_loan': IDL.Func([IDL.Text], [LoanApplication], []),
    'reject_loan': IDL.Func([IDL.Text], [LoanApplication], []),
    'make_payment': IDL.Func([IDL.Text, IDL.Float64], [LoanPayment], []),
    'get_payments': IDL.Func([IDL.Text], [IDL.Vec(LoanPayment)], ['query']),
    'calculate_eligibility': IDL.Func([], [IDL.Float64], ['query']),
  });
};

export const init = ({ IDL }) => { return []; };
