import { LoginForm } from "@/common/models/globalModel";
import { AxiosInstance } from "axios";

const AuthService = (api: AxiosInstance) => ({
  login: async (params: LoginForm) => {
    const response = await api.post(`auth/login`, params).then((res) => {
      return res;
    });
    return response;
  },
  refreshToken: async () => {
    const response = await api.get(`auth/refresh`).then((res) => {
      return res;
    });
    return response;
  },
  logout: async () => {
    const response = await api.get(`auth/logout`).then((res) => {
      return res;
    });
    return response;
  },
});

export default AuthService;
