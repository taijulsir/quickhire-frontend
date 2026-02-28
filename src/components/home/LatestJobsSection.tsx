'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LatestJobCard from './LatestJobCard';
import { jobService } from '@/services';
import { Job } from '@/types';

export default function LatestJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getLatest();
        if (response.success && response.data) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch latest jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest<span className="text-indigo-600">jobs open</span>
          </h2>
          <Link href="/jobs" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            Show all jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {loading
            ? Array(8).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg animate-pulse bg-white">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                </div>
              ))
            : jobs.slice(0, 8).map((job) => (
                <LatestJobCard key={job._id} job={job} />
              ))}
        </div>
      </div>
    </section>
  );
}
