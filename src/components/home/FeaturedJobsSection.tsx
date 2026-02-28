'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FeaturedJobCard from './FeaturedJobCard';
import { jobService } from '@/services';
import { Job } from '@/types';

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getFeatured();
        if (response.success && response.data) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch featured jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured<span className="text-indigo-600">jobs</span>
          </h2>
          <Link href="/jobs" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            Show all jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(8).fill(0).map((_, i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-lg animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    <div className="w-16 h-6 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-16 bg-gray-200 rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                </div>
              ))
            : jobs.slice(0, 8).map((job) => (
                <FeaturedJobCard key={job._id} job={job} />
              ))}
        </div>
      </div>
    </section>
  );
}
