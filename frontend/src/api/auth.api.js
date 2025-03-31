import apiClient, { ApiService } from "./interceptors/api.interceptor";
export const loginUser = async(data) => apiClient.post("/users/login", data );
export const checkUserName=async(userName) => apiClient.get(`/users/check-username/${userName}` );