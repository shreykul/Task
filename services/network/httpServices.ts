import { toastHelper } from "@/utils/Helpers";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import axiosRetry from "axios-retry";

const httpClient = axios.create({
  timeout: 8000, // 8s timeout
});

axiosRetry(httpClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    error.code === "ECONNABORTED",
});

httpClient.interceptors.request.use(
  async (config) => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      toastHelper("It seems you're offline"); 
      return Promise.reject({
        message: "No internet connection",
        code: "OFFLINE",
        config,
      });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
