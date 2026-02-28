export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  tags: string[];
  companyLogo?: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  _id: string;
  job_id: string | Job;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  created_at: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    jobs: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface ApplicationFormData {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  tags: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
