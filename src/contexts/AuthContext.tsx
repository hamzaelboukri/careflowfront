import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType, RegisterData } from '../types';
import * as authService from '../services/auth.service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
  const savedToken = localStorage.getItem('careflow_token');

    async function init() {
      if (savedToken) {
        try {
          const profile = await authService.getProfile(savedToken);
          // backend may return user directly or under { user }
          const userObj = profile.user || profile;
          setUser(userObj);
          localStorage.setItem('careflow_user', JSON.stringify(userObj));
          localStorage.setItem('careflow_token', savedToken);
        } catch (err) {
          // token invalid or expired - try refresh
          try {
            const refreshed = await authService.refreshToken();
            if (refreshed.accessToken) {
              localStorage.setItem('careflow_token', refreshed.accessToken);
              const profile = await authService.getProfile(refreshed.accessToken);
              const userObj = profile.user || profile;
              setUser(userObj);
              localStorage.setItem('careflow_user', JSON.stringify(userObj));
            } else {
              setUser(null);
              localStorage.removeItem('careflow_user');
              localStorage.removeItem('careflow_token');
            }
          } catch (e) {
            setUser(null);
            localStorage.removeItem('careflow_user');
            localStorage.removeItem('careflow_token');
          }
        }
      }
      setIsLoading(false);
    }

    init();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      // expected result: { accessToken, user }
      const token = result.accessToken as string | undefined;
      const userObj = result.user || result;
      if (token) {
        localStorage.setItem('careflow_token', token);
      }
      if (userObj) {
        setUser(userObj);
        localStorage.setItem('careflow_user', JSON.stringify(userObj));
      }
    } catch (error: any) {
      console.error('Login error', error?.message || error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      const token = result.accessToken as string | undefined;
      const userObj = result.user || result;
      if (token) localStorage.setItem('careflow_token', token);
      if (userObj) {
        setUser(userObj);
        localStorage.setItem('careflow_user', JSON.stringify(userObj));
      }
    } catch (error) {
      console.error('Register error', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // ignore
    }
    setUser(null);
    localStorage.removeItem('careflow_user');
    localStorage.removeItem('careflow_token');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    accessToken: localStorage.getItem('careflow_token'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}