import api from './api';
import { ApiResponse } from '@/types';

export interface DashboardStats {
    totalJobs: number;
    totalApplications: number;
    activeJobsCount: number;
    jobTypesSummary: Record<string, number>;
    chartData: Array<{
        _id: string;
        views: number;
        applications: number;
    }>;
    recentJobs: any[];
}

export const adminService = {
    getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
        const response = await api.get('/admin/dashboard-stats');
        return response.data;
    },
};
