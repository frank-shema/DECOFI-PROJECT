
export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    'principal': IDL.Principal,
    'username': IDL.Text,
    'email': IDL.Text,
    'created_at': IDL.Nat64,
    'roles': IDL.Vec(IDL.Text),
  });
  
  return IDL.Service({
    'login': IDL.Func([IDL.Text], [IDL.Bool], []),
    'logout': IDL.Func([], [IDL.Bool], []),
    'is_authenticated': IDL.Func([], [IDL.Bool], ['query']),
    'get_user_info': IDL.Func([], [User], ['query']),
  });
};

export const init = () => { return []; };
