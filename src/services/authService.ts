import api from './api';
import { LoginCredentials, ApiResponse } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string }>> {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await api.post('/admin/logout');
    return response.data;
  },

  async checkAuth(): Promise<ApiResponse<{ admin: { email: string; role: string } }>> {
    const response = await api.get('/admin/check');
    return response.data;
  },
};
