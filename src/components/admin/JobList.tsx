'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Trash2, Edit2 } from 'lucide-react';
import { Job } from '@/types';
import { Button } from '@/components/common';
import { jobService } from '@/services';
import { BASE_URL } from '@/services/api';

interface JobListProps {
  jobs: Job[];
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

export default function JobList({ jobs, onDelete, onEdit }: JobListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    setDeletingId(jobToDelete);
    try {
      const response = await jobService.delete(jobToDelete);
      if (response.success) {
        onDelete(jobToDelete);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete job');
    } finally {
      setDeletingId(null);
      setJobToDelete(null);
    }
  };

  const getCompanyInitials = (company: string) => {
    return company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg h-full flex flex-col items-center justify-center">
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
    <>
      <div className="flex-1 overflow-y-auto min-h-0 bg-white">
        <table className="w-full relative">
          <thead className="sticky top-0 bg-gray-50 z-10 shadow-xs">
            <tr>
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
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {job.companyLogo ? (
                        <img
                          src={job.companyLogo.startsWith('http') ? job.companyLogo : `${BASE_URL}${job.companyLogo}`}
                          alt={job.company}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-gray-600 font-bold text-xs">{getCompanyInitials(job.company)}</span>
                      )}
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
                    <button
                      title="Edit Job"
                      onClick={() => onEdit(job)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <Link href={`/jobs/${job._id}`} title="View Job">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      title="Delete Job"
                      onClick={() => setJobToDelete(job._id)}
                      disabled={deletingId === job._id}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col relative">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Job</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this job posting? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setJobToDelete(null)} disabled={deletingId !== null}>
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  isLoading={deletingId !== null}
                  className="bg-red-600 hover:bg-red-700 text-white border-transparent"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
