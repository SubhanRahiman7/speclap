import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    // setup axios interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          console.log("Getting auth token for request to:", config.url);
          const token = await getToken();
          console.log("Token received:", token ? "Present" : "Missing");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Authorization header set");
          } else {
            console.log("No token available, request will fail");
          }
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authorization issue, Please refresh the page.");
          }
          console.log("Error getting token:", error);
        }
        return config;
      },
      (error) => {
        console.log("Axios request error:", error);
        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
