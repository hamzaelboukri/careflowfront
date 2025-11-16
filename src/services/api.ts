import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3010';

// Primary axios instance used across the app
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // include cookies for refresh-token flows
  headers: {
    'Content-Type': 'application/json',
  },
});

// A separate axios instance without the interceptor for refresh calls
const refreshInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('careflow_token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      if (isRefreshing) {
        // queue the request until refresh finished
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const resp = await refreshInstance.post('/auth/refresh-token');
        const data: any = resp.data;
        const newToken = data?.accessToken || data?.token || null;
        if (newToken) {
          localStorage.setItem('careflow_token', newToken);
          processQueue(null, newToken);
          if (originalRequest.headers) originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
        processQueue(new Error('Failed to refresh token'), null);
        return Promise.reject(error);
      } catch (err) {
        processQueue(err, null);
        // clear storage on refresh failure
        localStorage.removeItem('careflow_token');
        localStorage.removeItem('careflow_user');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
