import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
export const API_URL = `${BASE_URL}/api`;

const TOKEN_KEY = 'qh_admin_token';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach stored token as Authorization header on every request
// This ensures auth works in production cross-domain deployments
// where httpOnly cookies may not be forwarded
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
