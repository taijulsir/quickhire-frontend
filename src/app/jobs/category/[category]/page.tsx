'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { Navbar, Footer, PageHeader } from '@/components/common';
import { JobCard } from '@/components/jobs';
import { jobService } from '@/services';
import { Job } from '@/types';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  const decodedCategory = decodeURIComponent(category);
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Reusing jobService.getAll with fixed category
      const response = await jobService.getAll({
        category: decodedCategory,
        page: pagination.page,
        limit: 12,
      });

      if (response.success && response.data) {
        setJobs(response.data.jobs);
        setPagination({
          total: response.data.pagination.total,
          page: response.data.pagination.page,
          pages: response.data.pagination.pages,
        });
      }
    } catch (error) {
      console.error('Failed to fetch category jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [decodedCategory, pagination.page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-epilogue)]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-5 md:px-20 py-12">
        {/* Header Section */}
        <PageHeader
          backHref="/jobs"
          backLabel="Back to all jobs"
          title={decodedCategory}
          titleHighlight="Jobs"
          subtitle={`${pagination.total} positions available`}
        />

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-[#D6DDEB] p-8 animate-pulse rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-[#D6DDEB] rounded-xl" />
                  <div className="w-24 h-8 bg-[#D6DDEB] rounded" />
                </div>
                <div className="h-7 bg-[#D6DDEB] rounded w-3/4 mb-3" />
                <div className="h-5 bg-[#D6DDEB] rounded w-1/2 mb-6" />
                <div className="h-20 bg-[#D6DDEB] rounded w-full mb-8" />
                <div className="flex gap-3">
                  <div className="h-8 w-24 bg-[#D6DDEB] rounded-full" />
                  <div className="h-8 w-24 bg-[#D6DDEB] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[#D6DDEB] rounded-2xl">
            <h3 className="text-2xl font-bold text-[#25324B] mb-2 font-[family-name:var(--font-clash-display)]">
              No jobs found
            </h3>
            <p className="text-[#7C8493] mb-8">
              We couldn't find any positions for "{decodedCategory}" right now.
            </p>
            <Link 
              href="/jobs"
              className="bg-[#4640DE] text-white px-8 py-4 font-bold hover:bg-[#3b36 b1] transition-all inline-flex items-center gap-2"
            >
              Browse all jobs <GoArrowRight className="text-xl" />
            </Link>
          </div>
        )}

        {/* Pagination placeholder (can be expanded if needed) */}
        {pagination.pages > 1 && !loading && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: pagination.pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                className={`w-12 h-12 rounded-lg font-bold transition-all ${
                  pagination.page === i + 1 
                    ? 'bg-[#4640DE] text-white shadow-lg' 
                    : 'bg-white text-[#4640DE] border border-[#D6DDEB] hover:bg-[#F8F8FD]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
