import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface User {
  principal: Principal;
  username: string;
  email: string;
  createdAt: bigint;
  roles: string[];
}

export interface AuthService {
  login: ActorMethod<[string], boolean>;
  logout: ActorMethod<[], boolean>;
  isAuthenticated: ActorMethod<[], boolean>;
  getUserInfo: ActorMethod<[], User>;
}
