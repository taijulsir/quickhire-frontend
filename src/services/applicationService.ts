import api from './api';
import { Application, ApplicationFormData, ApiResponse } from '@/types';

export const applicationService = {
  async create(data: ApplicationFormData): Promise<ApiResponse<Application>> {
    const response = await api.post('/applications', data);
    return response.data;
  },

  async getAll(): Promise<ApiResponse<{ applications: Application[] }>> {
    const response = await api.get('/applications');
    return response.data;
  },

  async getByJob(jobId: string): Promise<ApiResponse<Application[]>> {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },
};
