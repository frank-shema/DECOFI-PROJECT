import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import { toast } from "@/hooks/use-toast";
import { idlFactory as authIdl } from "@/declarations/auth/auth.did";
import { idlFactory as governanceIdl } from "@/declarations/governance/governance.did";
import { idlFactory as loansIdl } from "@/declarations/loans/loans.did";
import { idlFactory as walletIdl } from "@/declarations/wallet/wallet.did";
import type { AuthService, User } from "@/declarations/auth/auth.types";
import type { GovernanceService } from "@/declarations/governance/governance.types.ts";
import type {
  LoansService,
  LoanApplication,
  LoanPayment,
} from "../declarations/loans/loans.types";
import type {
  WalletService,
  TxRecord,
} from "../declarations/wallet/wallet.types";

// Define the frontend User type (converting Principal to string)
interface FrontendUser {
  principal: string;
  username: string;
  email: string;
  created_at: bigint;
  roles: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  authClient: AuthClient | null;
  principal: string | null;
  agent: HttpAgent | null;
  user: FrontendUser | null;
  authActor: AuthService | null;
  governanceActor: GovernanceService | null;
  loansActor: LoansService | null;
  walletActor: WalletService | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local development host or mainnet host
const host =
  process.env.NODE_ENV === "production"
    ? "https://ic0.app"
    : "http://localhost:8000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [agent, setAgent] = useState<HttpAgent | null>(null);
  const [user, setUser] = useState<FrontendUser | null>(null);
  const [authActor, setAuthActor] = useState<AuthService | null>(null);
  const [governanceActor, setGovernanceActor] =
    useState<GovernanceService | null>(null);
  const [loansActor, setLoansActor] = useState<LoansService | null>(null);
  const [walletActor, setWalletActor] = useState<WalletService | null>(null);

  useEffect(() => {
    // Initialize authentication client when component mounts
    const initAuth = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);

        // Check if user is already logged in
        const isLoggedIn = await client.isAuthenticated();
        if (isLoggedIn) {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal().toString();
          setPrincipal(principal);

          // Create an agent for backend calls
          const newAgent = new HttpAgent({ identity, host });
          if (process.env.NODE_ENV !== "production") {
            // Only needed for local development
            await newAgent.fetchRootKey();
          }
          setAgent(newAgent);

          // Initialize actors for all canisters
          const newAuthActor = Actor.createActor<AuthService>(authIdl, {
            agent: newAgent,
            canisterId: "auth-canister-id", // Replace with actual canister ID
          });
          setAuthActor(newAuthActor);

          const newGovernanceActor = Actor.createActor<GovernanceService>(
            governanceIdl,
            {
              agent: newAgent,
              canisterId: "governance-canister-id", // Replace with actual canister ID
            }
          );
          setGovernanceActor(newGovernanceActor);

          const newLoansActor = Actor.createActor<LoansService>(loansIdl, {
            agent: newAgent,
            canisterId: "loans-canister-id", // Replace with actual canister ID
          });
          setLoansActor(newLoansActor);

          const newWalletActor = Actor.createActor<WalletService>(walletIdl, {
            agent: newAgent,
            canisterId: "wallet-canister-id", // Replace with actual canister ID
          });
          setWalletActor(newWalletActor);

          // Check on-chain authentication status
          const isAuthOnChain = await newAuthActor.isAuthenticated();
          setIsAuthenticated(isAuthOnChain);

          if (isAuthOnChain) {
            const userInfo = await newAuthActor.getUserInfo();
            setUser({
              principal: userInfo.principal.toText(),
              username: userInfo.username,
              email: userInfo.email,
              created_at: userInfo.createdAt,
              roles: userInfo.roles,
            });
          }
        }
      } catch (error) {
        console.error("Authentication initialization error:", error);
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string): Promise<void> => {
    if (!authClient) return;

    const days = 30;
    const idleOptions = {
      idleTimeout: days * 24 * 60 * 60 * 1000 * 1000 * 1000, // in nanoseconds
      disableIdle: true,
    };

    await new Promise<void>((resolve) => {
      authClient.login({
        identityProvider:
          process.env.NODE_ENV === "production"
            ? "https://identity.ic0.app"
            : "http://localhost:8000?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai",
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          setPrincipal(principal);

          // Create an agent for backend calls
          const newAgent = new HttpAgent({ identity, host });
          if (process.env.NODE_ENV !== "production") {
            // Only needed for local development
            await newAgent.fetchRootKey();
          }
          setAgent(newAgent);

          // Initialize actors for all canisters
          const newAuthActor = Actor.createActor<AuthService>(authIdl, {
            agent: newAgent,
            canisterId: "auth-canister-id", // Replace with actual canister ID
          });
          setAuthActor(newAuthActor);

          const newGovernanceActor = Actor.createActor<GovernanceService>(
            governanceIdl,
            {
              agent: newAgent,
              canisterId: "governance-canister-id", // Replace with actual canister ID
            }
          );
          setGovernanceActor(newGovernanceActor);

          const newLoansActor = Actor.createActor<LoansService>(loansIdl, {
            agent: newAgent,
            canisterId: "loans-canister-id", // Replace with actual canister ID
          });
          setLoansActor(newLoansActor);

          const newWalletActor = Actor.createActor<WalletService>(walletIdl, {
            agent: newAgent,
            canisterId: "wallet-canister-id", // Replace with actual canister ID
          });
          setWalletActor(newWalletActor);

          // Call the login method on the canister
          const success = await newAuthActor.login(username);
          if (success) {
            setIsAuthenticated(true);
            const userInfo = await newAuthActor.getUserInfo();
            setUser({
              principal: userInfo.principal.toText(),
              username: userInfo.username,
              email: userInfo.email,
              created_at: userInfo.createdAt,
              roles: userInfo.roles,
            });
            toast({
              title: "Login Successful",
              description: "You have successfully logged in.",
            });
          } else {
            toast({
              title: "Login Failed",
              description:
                "Failed to log in to the canister. Please try again.",
              variant: "destructive",
            });
          }
          resolve();
        },
        onError: (error) => {
          console.error("Login error:", error);
          toast({
            title: "Login Failed",
            description: "There was an error during login. Please try again.",
            variant: "destructive",
          });
          resolve();
        },
        ...idleOptions,
      });
    });
  };

  const logout = async (): Promise<void> => {
    if (!authClient || !agent || !authActor) return;

    // Call the logout method on the canister
    const success = await authActor.logout();
    if (success) {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      setAgent(null);
      setUser(null);
      setAuthActor(null);
      setGovernanceActor(null);
      setLoansActor(null);
      setWalletActor(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } else {
      toast({
        title: "Logout Failed",
        description: "Failed to log out from the canister. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    isAuthenticated,
    isInitializing,
    login,
    logout,
    authClient,
    principal,
    agent,
    user,
    authActor,
    governanceActor,
    loansActor,
    walletActor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
