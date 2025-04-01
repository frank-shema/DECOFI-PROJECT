import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type TxType =
  | { deposit: null }
  | { withdrawal: null }
  | { transfer: null }
  | { interest: null }
  | { reward: null }
  | { loanPayment: null };
export type TxStatus =
  | { pending: null }
  | { completed: null }
  | { failed: null };

export interface TxRecord {
  id: string;
  amount: number;
  fromPrincipal: Principal;
  toPrincipal: [] | [Principal];
  timestamp: bigint;
  txType: TxType;
  status: TxStatus;
  description: [] | [string];
}

export interface WalletService {
  getBalance: ActorMethod<[], number>;
  deposit: ActorMethod<[number], TxRecord>;
  withdraw: ActorMethod<[number], TxRecord>;
  transfer: ActorMethod<[Principal, number], TxRecord>;
  getTransactions: ActorMethod<[], TxRecord[]>;
  calculateInterest: ActorMethod<[], void>;
}
