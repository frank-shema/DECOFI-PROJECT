import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type ProposalStatus =
  | { active: null }
  | { accepted: null }
  | { rejected: null }
  | { implemented: null };
export type VoteType = { for: null } | { against: null };

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposerPrincipal: Principal;
  category: string;
  status: ProposalStatus;
  votesFor: bigint;
  votesAgainst: bigint;
  createdAt: bigint;
  deadline: bigint;
}

export interface Vote {
  proposalId: string;
  voterPrincipal: Principal;
  voteType: VoteType;
  votingPower: bigint;
  timestamp: bigint;
}

export interface GovernanceService {
  createProposal: ActorMethod<[string, string, string, bigint], Proposal>;
  getProposal: ActorMethod<[string], [] | [Proposal]>;
  getActiveProposals: ActorMethod<[], Proposal[]>;
  getPastProposals: ActorMethod<[], Proposal[]>;
  vote: ActorMethod<[string, VoteType], Vote>;
  getUserVotingPower: ActorMethod<[], bigint>;
  getUserVote: ActorMethod<[string], [] | [Vote]>;
  getProposalVotes: ActorMethod<[string], Vote[]>;
}
