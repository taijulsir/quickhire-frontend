import api from './api';
import { LoginCredentials, ApiResponse } from '@/types';

const TOKEN_KEY = 'qh_admin_token';

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string }>> {
    const response = await api.post('/admin/login', credentials);
    const data: ApiResponse<{ token: string }> = response.data;

    // Store token in localStorage as fallback for cross-domain deployments
    // where httpOnly cookies may not be sent back on cross-origin requests
    if (data.success && data.data?.token) {
      localStorage.setItem(TOKEN_KEY, data.data.token);
    }

    return data;
  },

  async logout(): Promise<ApiResponse<null>> {
    localStorage.removeItem(TOKEN_KEY);
    const response = await api.post('/admin/logout');
    return response.data;
  },

  async checkAuth(): Promise<ApiResponse<{ admin: { email: string; role: string } }>> {
    const response = await api.get('/admin/check');
    return response.data;
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
