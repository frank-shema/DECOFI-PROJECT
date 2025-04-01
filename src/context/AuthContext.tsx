
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authClient: AuthClient | null;
  principal: string | null;
  agent: HttpAgent | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local development host or mainnet host
const host = process.env.NODE_ENV === 'production' 
  ? 'https://ic0.app' 
  : 'http://localhost:8000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [agent, setAgent] = useState<HttpAgent | null>(null);

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
          setAgent(newAgent);
          
          if (process.env.NODE_ENV !== 'production') {
            // Only needed for local development
            await newAgent.fetchRootKey();
          }
          
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        toast({
          title: 'Authentication Error',
          description: 'Failed to initialize authentication. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  const login = async (): Promise<void> => {
    if (!authClient) return;
    
    const days = 30;
    const idleOptions = {
      idleTimeout: days * 24 * 60 * 60 * 1000 * 1000 * 1000, // in nanoseconds
      disableIdle: true,
    };
    
    await new Promise<void>((resolve) => {
      authClient.login({
        identityProvider: process.env.NODE_ENV === 'production'
          ? 'https://identity.ic0.app'
          : 'http://localhost:8000?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          setPrincipal(principal);
          
          // Create an agent for backend calls
          const newAgent = new HttpAgent({ identity, host });
          if (process.env.NODE_ENV !== 'production') {
            // Only needed for local development
            await newAgent.fetchRootKey();
          }
          setAgent(newAgent);
          
          setIsAuthenticated(true);
          toast({
            title: 'Login Successful',
            description: 'You have successfully logged in.',
          });
          resolve();
        },
        onError: (error) => {
          console.error('Login error:', error);
          toast({
            title: 'Login Failed',
            description: 'There was an error during login. Please try again.',
            variant: 'destructive',
          });
          resolve();
        },
        ...idleOptions,
      });
    });
  };

  const logout = async (): Promise<void> => {
    if (!authClient) return;
    
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
    setAgent(null);
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const value = {
    isAuthenticated,
    isInitializing,
    login,
    logout,
    authClient,
    principal,
    agent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
