'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader, JobList } from '@/components/admin';
import { Button } from '@/components/common';
import { jobService } from '@/services';
import { Job } from '@/types';

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getAll({ limit: 100 });
      if (response.success && response.data) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = (id: string) => {
    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Dashboard" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-gray-600">{jobs.length} jobs posted</p>
          </div>
          <Link href="/admin/jobs/new">
            <Button>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Job
              </span>
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {loading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <JobList jobs={jobs} onDelete={handleDelete} />
          )}
        </div>
      </main>
    </div>
  );
}
