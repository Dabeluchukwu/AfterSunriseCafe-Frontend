import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// --- token helpers (safe on server: guard window) ---
export const getAccessToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
export const getRefreshToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
export const setTokens = ({ token, refreshToken }) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("accessToken", token);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};
export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// --- request interceptor: attach access token ---
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- response interceptor: 401 -> refresh -> retry ---
let isRefreshing = false;
let queue = [];

const flushQueue = (error, token = null) => {
  queue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)));
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    // Only attempt refresh for 401s on non-auth endpoints
    const isAuthEndpoint =
      original?.url?.includes("/auth/login") ||
      original?.url?.includes("/auth/refresh");

    if (status !== 401 || original._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until refresh resolves
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        })
        .catch((e) => Promise.reject(e));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      const { data } = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken,
      });

      setTokens({ token: data.token, refreshToken: data.refreshToken });
      flushQueue(null, data.token);

      original.headers.Authorization = `Bearer ${data.token}`;
      return api(original);
    } catch (refreshError) {
      flushQueue(refreshError, null);
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;