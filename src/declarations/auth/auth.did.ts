
export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    login: IDL.Func([IDL.Text], [IDL.Bool], []),
    logout: IDL.Func([], [IDL.Bool], []),
    isAuthenticated: IDL.Func([], [IDL.Bool], ['query']),
    getUserInfo: IDL.Func([], [IDL.Record({
      principal: IDL.Principal,
      username: IDL.Text,
      email: IDL.Text,
      createdAt: IDL.Nat64,
      roles: IDL.Vec(IDL.Text),
    })], ['query']),
  });
};

export const init = ({ IDL }) => { return []; };
