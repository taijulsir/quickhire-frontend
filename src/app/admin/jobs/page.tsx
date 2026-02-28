'use client';

import { useEffect, useState, useCallback } from 'react';
import { AdminHeader, JobList } from '@/components/admin';
import JobForm from '@/components/admin/JobForm';
import { Button, Input, Select } from '@/components/common';
import { jobService } from '@/services';
import { Job } from '@/types';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Design', label: 'Design' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Human Resource', label: 'Human Resource' },
];

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await jobService.getAll({
        search,
        category,
        limit: 100
      });
      if (response.success && response.data) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const handleDelete = (id: string) => {
    setJobs(jobs.filter((job) => job._id !== id));
  };

  const handleJobSuccess = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    fetchJobs();
  };

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 h-[calc(100vh)]">
      <AdminHeader title="Job Listing" />
      <main className="flex-1 overflow-hidden w-full flex flex-col min-h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-full w-full min-h-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
              <p className="text-gray-600">{jobs.length} jobs available</p>
            </div>
            <Button onClick={handleAddNewClick}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Job
              </span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search jobs by title or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-64">
              <Select
                options={categories}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 flex-1 overflow-hidden flex flex-col relative shadow-sm min-h-0">
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
              <JobList jobs={jobs} onDelete={handleDelete} onEdit={handleEditClick} />
            )}
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => {
            setIsModalOpen(false);
            setEditingJob(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl h-[90vh] overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-8 py-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingJob(null);
                }}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-3 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-6 md:p-8">
              <JobForm
                initialData={editingJob || undefined}
                onSuccess={handleJobSuccess}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingJob(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
