import axios from "axios";
import axiosRetry from "axios-retry";

const httpClient = axios.create({
  timeout: 8000, // 8s timeout
});

axiosRetry(httpClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNABORTED",
});

export default httpClient;
