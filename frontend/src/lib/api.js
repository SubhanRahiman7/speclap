import { axiosInstance } from "./axios";

export async function getStreamToken() {
    try {
        console.log("Making API call to /chat/token");
        const response = await axiosInstance.get("/chat/token");
        console.log("API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting stream token:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        throw error;
    }
}