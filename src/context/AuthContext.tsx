
import React, { createContext, useState, useContext, useEffect, SetStateAction } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { canisterId as authCanisterId, createActor as createAuthActor } from "../declarations/auth";

// Define User type
export interface User {
  principal: string;
  username: string;
  email: string;
  created_at: bigint;
  roles: string[];
}

// Define AuthContext state
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

// Default context state
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  isLoading: true,
  isInitializing: true,
  user: null,
  login: async () => {},
  logout: async () => {},
  setUser: () => {}
};

// Create context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create AuthContext provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  // Initialize auth client
  useEffect(() => {
    const initAuthClient = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);
        
        const isLoggedIn = await client.isAuthenticated();
        setIsAuthenticated(isLoggedIn);
        
        if (isLoggedIn) {
          // Get user identity and create an actor for the auth canister
          const identity = client.getIdentity();
          const agent = new HttpAgent({ identity });
          
          // When in development mode, we need to fetch the root key
          if (import.meta.env.DEV) {
            await agent.fetchRootKey();
          }
          
          const authActor = createAuthActor(agent);
          
          try {
            // Fetch user details from the auth canister
            const userInfo = await authActor.get_user_info();
            setUser(userInfo as unknown as User); // Fix type casting
          } catch (error) {
            console.error("Failed to fetch user info:", error);
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth client:", error);
      } finally {
        setIsLoading(false);
        setIsInitializing(false);
      }
    };
    
    initAuthClient();
  }, []);

  // Login function
  const login = async () => {
    if (!authClient) return;
    
    try {
      await authClient.login({
        identityProvider: import.meta.env.VITE_INTERNET_IDENTITY_URL || "https://identity.ic0.app",
        onSuccess: async () => {
          setIsAuthenticated(true);
          
          // Get user identity and create an actor for the auth canister
          const identity = authClient.getIdentity();
          const agent = new HttpAgent({ identity });
          
          // When in development mode, we need to fetch the root key
          if (import.meta.env.DEV) {
            await agent.fetchRootKey();
          }
          
          const authActor = createAuthActor(agent);
          
          try {
            // Fetch user details from the auth canister
            const userInfo = await authActor.get_user_info();
            setUser(userInfo as unknown as User); // Fix type casting
          } catch (error) {
            console.error("Failed to fetch user info:", error);
          }
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = async () => {
    if (!authClient) return;
    
    await authClient.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, isInitializing, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
