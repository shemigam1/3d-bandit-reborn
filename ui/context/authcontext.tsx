"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authUtils } from "@/lib/auth";
import { loginUser } from "@/lib/api";
// import { Router } from "next/router";
// import { useRouter } from "next/router";
interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // Load user data on mount
  useEffect(() => {
    try {
      const savedToken = authUtils.getToken();
      const savedUser = authUtils.getUser();

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      } else if (savedToken && !savedUser) {
        // Token exists but no user data - clear everything
        authUtils.clearAuth();
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      // Clear potentially corrupted data
      authUtils.clearAuth();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser({ email, password });

      if (response.data) {
        const data = response.data;

        const { token, user } = data.data;
        // console.log();
        // console.log(data.data);

        // Validate data before saving
        if (token && user) {
          // Save to localStorage
          authUtils.setToken(token as string);
          authUtils.setUser(user);

          // Update state
          setToken(token as string);
          setUser(user as User);

          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    authUtils.clearAuth();
    setUser(null);
    setToken(null);
    // router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
