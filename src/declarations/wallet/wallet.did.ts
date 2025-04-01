
export const idlFactory = ({ IDL }) => {
  const TxRecord = IDL.Record({
    id: IDL.Text,
    amount: IDL.Float64,
    fromPrincipal: IDL.Principal,
    toPrincipal: IDL.Opt(IDL.Principal),
    timestamp: IDL.Nat64,
    txType: IDL.Variant({
      deposit: IDL.Null,
      withdrawal: IDL.Null,
      transfer: IDL.Null,
      interest: IDL.Null,
      reward: IDL.Null,
      loanPayment: IDL.Null,
    }),
    status: IDL.Variant({
      pending: IDL.Null,
      completed: IDL.Null,
      failed: IDL.Null,
    }),
    description: IDL.Opt(IDL.Text),
  });

  return IDL.Service({
    getBalance: IDL.Func([], [IDL.Float64], ['query']),
    deposit: IDL.Func([IDL.Float64], [TxRecord], []),
    withdraw: IDL.Func([IDL.Float64], [TxRecord], []),
    transfer: IDL.Func([IDL.Principal, IDL.Float64], [TxRecord], []),
    getTransactions: IDL.Func([], [IDL.Vec(TxRecord)], ['query']),
    calculateInterest: IDL.Func([], [], []),
  });
};

export const init = ({ IDL }) => { return []; };
