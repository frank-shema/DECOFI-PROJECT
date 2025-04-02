
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./auth.did";
import type { ActorSubclass } from "@dfinity/agent";

// Type for our auth actor
export interface AuthActor {
  login: (username: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  is_authenticated: () => Promise<boolean>;
  get_user_info: () => Promise<{
    principal: string;
    username: string;
    email: string;
    created_at: bigint;
    roles: string[];
  }>;
}

// Auth canister ID - use import.meta.env instead of process.env for Vite
export const canisterId = import.meta.env.VITE_AUTH_CANISTER_ID || "rrkah-fqaaa-aaaaa-aaaaq-cai";

// Function to create an auth actor
export const createActor = (agent: HttpAgent): ActorSubclass<AuthActor> => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
