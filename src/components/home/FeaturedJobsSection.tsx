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
          <h2 className="font-clash text-[48px] font-semibold text-[#25324B] leading-[1.1] tracking-[0%]">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link href="/jobs" className="text-[#4640DE] font-epilogue font-semibold text-[16px] leading-[1.6] tracking-[0%] flex items-center gap-2 hover:opacity-80 transition-opacity">
            Show all jobs
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.172 11L10.808 5.63605L12.222 4.22183L20 12L12.222 19.7782L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
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
