'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { Button } from '@/components/common';
import { jobService } from '@/services';

interface JobListProps {
  jobs: Job[];
  onDelete: (id: string) => void;
}

export default function JobList({ jobs, onDelete }: JobListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    setDeletingId(id);
    try {
      const response = await jobService.delete(id);
      if (response.success) {
        onDelete(id);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete job');
    } finally {
      setDeletingId(null);
    }
  };

  const getCompanyInitials = (company: string) => {
    return company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first job posting.</p>
        <Link href="/admin/jobs/new">
          <Button>Create Job</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Job</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Category</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Location</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Type</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-xs">{getCompanyInitials(job.company)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded">
                  {job.category}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">{job.location}</td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded">
                  {job.type}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/jobs/${job._id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(job._id)}
                    isLoading={deletingId === job._id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
