import { createContext } from 'react';

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// @ts-expect-error - Context will be provided by AuthProvider
export const AuthContext = createContext<AuthContextType>(undefined);
