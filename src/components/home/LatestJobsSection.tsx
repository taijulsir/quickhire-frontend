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
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-5">
        <svg width="430" height="916" viewBox="0 0 430 916" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M430 0H0V916H430V0Z" fill="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="215" y1="0" x2="215" y2="916" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4640DE"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-clash text-[48px] font-semibold text-[#25324B] leading-[110%] tracking-[0%]">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link href="/jobs" className="text-[#4640DE] font-epilogue font-semibold text-[16px] leading-[160%] flex items-center gap-2 hover:opacity-80 transition-opacity mb-2">
            Show all jobs
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.172 11L10.808 5.63605L12.222 4.22183L20 12L12.222 19.7782L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading
            ? Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-[120px] bg-white animate-pulse" />
              ))
            : jobs.slice(0, 8).map((job) => (
                <LatestJobCard key={job._id} job={job} />
              ))}
        </div>
      </div>
    </section>
  );
}
