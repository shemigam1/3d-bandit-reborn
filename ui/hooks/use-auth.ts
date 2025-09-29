// import { useAuth as useAuthContext } from "@/contexts/AuthContext";
import { useAuth as useAuthContext } from "@/context/authcontext";
export const useAuth = useAuthContext;

// Additional hook for API calls
export const useAuthenticatedFetch = () => {
  const { token } = useAuth();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return authenticatedFetch;
};
