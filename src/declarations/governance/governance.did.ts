
export const idlFactory = ({ IDL }) => {
  const ProposalStatus = IDL.Variant({
    active: IDL.Null,
    accepted: IDL.Null,
    rejected: IDL.Null,
    implemented: IDL.Null,
  });

  const VoteType = IDL.Variant({
    for: IDL.Null,
    against: IDL.Null,
  });

  const Proposal = IDL.Record({
    id: IDL.Text,
    title: IDL.Text,
    description: IDL.Text,
    proposerPrincipal: IDL.Principal,
    category: IDL.Text,
    status: ProposalStatus,
    votesFor: IDL.Nat,
    votesAgainst: IDL.Nat,
    createdAt: IDL.Nat64,
    deadline: IDL.Nat64,
  });

  const Vote = IDL.Record({
    proposalId: IDL.Text,
    voterPrincipal: IDL.Principal,
    voteType: VoteType,
    votingPower: IDL.Nat,
    timestamp: IDL.Nat64,
  });

  return IDL.Service({
    createProposal: IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Nat64], [Proposal], []),
    getProposal: IDL.Func([IDL.Text], [IDL.Opt(Proposal)], ['query']),
    getActiveProposals: IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    getPastProposals: IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    vote: IDL.Func([IDL.Text, VoteType], [Vote], []),
    getUserVotingPower: IDL.Func([], [IDL.Nat], ['query']),
    getUserVote: IDL.Func([IDL.Text], [IDL.Opt(Vote)], ['query']),
    getProposalVotes: IDL.Func([IDL.Text], [IDL.Vec(Vote)], ['query']),
  });
};

export const init = ({ IDL }) => { return []; };
