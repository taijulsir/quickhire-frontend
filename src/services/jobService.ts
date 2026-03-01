import api from './api';
import { Job, ApiResponse, PaginatedResponse, Category } from '@/types';

export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  _id: string;
  jobName: string;
  companyName: string;
  location: string;
  logo: string;
  time: string;
}

export const jobService = {
  async getAll(filters: JobFilters = {}): Promise<PaginatedResponse<Job>> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/jobs?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Job>> {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<Job[]>> {
    const response = await api.get('/jobs/featured');
    return response.data;
  },

  async getLatest(): Promise<ApiResponse<Job[]>> {
    const response = await api.get('/jobs/latest');
    return response.data;
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await api.get('/jobs/categories');
    return response.data;
  },

  async create(data: Omit<Job, '_id' | 'created_at' | 'updated_at'> | FormData): Promise<ApiResponse<Job>> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    const response = await api.post('/jobs', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    });
    return response.data;
  },

  async update(id: string, data: Partial<Job> | FormData): Promise<ApiResponse<Job>> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    const response = await api.patch(`/jobs/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    });
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  async searchJobs(q: string): Promise<SearchResult[]> {
    const response = await api.get('/public/jobs/search', { params: { q } });
    return response.data;
  },

  async getLocations(): Promise<string[]> {
    const response = await api.get('/public/locations');
    return response.data;
  },
};
