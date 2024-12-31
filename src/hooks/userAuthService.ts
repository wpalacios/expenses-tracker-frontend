import apiClient from "@/utils/api";

export const useAuthService = () => {
  const register = async (email: string, password: string) => {
    return apiClient.post("/auth/register", { email, password });
  };

  const login = async (email: string, password: string) => {
    return apiClient.post("/auth/login", { email, password });
  };

  return { register, login };
};
