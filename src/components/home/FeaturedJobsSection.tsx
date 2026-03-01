'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import { jobService } from '@/services';
import { BASE_URL } from '@/services/api';
import { Job } from '@/types';

type TagColor = 'orange' | 'purple' | 'green' | 'red';

const TAG_STYLES: Record<TagColor, string> = {
  orange: 'bg-[#FFB836]/10 text-[#FFB836] border-[#FFB836]',
  purple: 'bg-[#4640DE]/10 text-[#4640DE] border-[#4640DE]',
  green: 'bg-[#56CDAD]/10 text-[#56CDAD] border-[#56CDAD]',
  red: 'bg-[#FF6550]/10 text-[#FF6550] border-[#FF6550]',
};

const TAG_HOVER_STYLES: Record<TagColor, string> = {
  orange: 'group-hover:bg-[#FFB836]/20 group-hover:text-[#FFB836] group-hover:border-[#FFB836]/40',
  purple: 'group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40',
  green: 'group-hover:bg-[#56CDAD]/20 group-hover:text-[#56CDAD] group-hover:border-[#56CDAD]/40',
  red: 'group-hover:bg-[#FF6550]/20 group-hover:text-[#FF6550] group-hover:border-[#FF6550]/40',
};

const CATEGORY_COLORS: Record<string, TagColor> = {
  Design: 'purple',
  Sales: 'orange',
  Marketing: 'orange',
  Finance: 'green',
  Technology: 'red',
  Engineering: 'red',
  Business: 'green',
  'Human Resource': 'purple',
};

const TYPE_COLORS: Record<string, TagColor> = {
  'Full Time': 'purple',
  'Part Time': 'orange',
  Internship: 'green',
  Remote: 'red',
  Contract: 'orange',
  Freelance: 'red',
};

function getLogoUrl(logo?: string) {
  if (!logo) return '';
  if (logo.startsWith('http')) return logo;
  return `${BASE_URL}${logo}`;
}

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getFeatured();
        if (response.success && response.data) {
          setJobs(response.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Failed to fetch featured jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderJobCard = (job: Job) => {
    const categoryColor = CATEGORY_COLORS[job.category] || 'purple';
    const typeColor = TYPE_COLORS[job.type] || 'purple';
    const logoUrl = getLogoUrl(job.companyLogo);

    return (
      <Link
        href={`/jobs/${job._id}`}
        key={job._id}
        className="group border border-[#D6DDEB] p-6 cursor-pointer transition-all duration-300 hover:bg-[#4640DE] block"
      >
        {/* Logo + Badge */}
        <div className="flex items-center justify-between mb-5">
          {logoUrl ? (
            <img src={logoUrl} alt={job.company} className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold bg-[#F0F0FF] text-[#4640DE]">
              {job.company.charAt(0)}
            </div>
          )}
          <span className="border border-[#4640DE] text-[#4640DE] text-xs font-medium px-3 py-1 group-hover:border-white group-hover:text-white transition-colors duration-300">
            {job.type}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-bold text-[#25324B] mb-1 group-hover:text-white transition-colors duration-300">
          {job.title}
        </h3>

        {/* Company + Location */}
        <p className="text-sm text-[#7C8493] mb-3 group-hover:text-white/70 transition-colors duration-300">
          {job.company} · {job.location}
        </p>

        {/* Description */}
        <p className="text-sm text-[#7C8493] leading-relaxed mb-5 line-clamp-2 group-hover:text-white/70 transition-colors duration-300">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-300 ${TAG_STYLES[categoryColor]} ${TAG_HOVER_STYLES[categoryColor]}`}>
            {job.category}
          </span>
          <span className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-300 ${TAG_STYLES[typeColor]} ${TAG_HOVER_STYLES[typeColor]}`}>
            {job.type}
          </span>
          {job.tags?.slice(0, 1).map((tag) => {
            const tagColor = CATEGORY_COLORS[tag] || 'green';
            return (
              <span
                key={tag}
                className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-300 ${TAG_STYLES[tagColor]} ${TAG_HOVER_STYLES[tagColor]}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </Link>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 mx-5 md:mx-20 2xl:mx-30 3xl:mx-40">
        <div className="hidden md:block">
          <h2 className="text-4xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-10">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-[#D6DDEB] p-6 animate-pulse">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#D6DDEB]" />
                  <div className="w-16 h-6 bg-[#D6DDEB] rounded" />
                </div>
                <div className="h-5 bg-[#D6DDEB] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#D6DDEB] rounded w-1/2 mb-3" />
                <div className="h-4 bg-[#D6DDEB] rounded w-full mb-5" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-[#D6DDEB] rounded-full" />
                  <div className="h-6 w-16 bg-[#D6DDEB] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <h2 className="text-2xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-6">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="min-w-[75%] border border-[#D6DDEB] p-6 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-[#D6DDEB] mb-5" />
                <div className="h-5 bg-[#D6DDEB] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#D6DDEB] rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (jobs.length === 0) {
    return (
      <section className="py-16 mx-5 md:mx-20 2xl:mx-30 3xl:mx-40">
        <h2 className="text-2xl md:text-4xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-6 md:mb-10">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>
        <div className="border border-[#D6DDEB] bg-white p-12 text-center">
          <p className="text-[#7C8493] text-lg">No featured jobs available at the moment</p>
          <p className="text-[#7C8493] text-sm mt-2">Check back later for new opportunities!</p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16'>
      {/* MOBILE LAYOUT */}
      <div className="md:hidden">
        <h2 className="text-2xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-6">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
          {jobs.map((job) => (
            <div key={job._id} className="min-w-[75%] shrink-0" style={{ scrollSnapAlign: 'start' }}>
              {renderJobCard(job)}
            </div>
          ))}
        </div>

        <Link
          href="/jobs"
          className="text-[#4640DE] font-semibold flex items-center gap-2 mt-6 text-sm"
        >
          Show all jobs <GoArrowRight className="text-lg" />
        </Link>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)]">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="text-[#4640DE] font-semibold flex items-center gap-2 hover:underline"
          >
            Show all jobs <GoArrowRight className="text-lg" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {jobs.map((job) => renderJobCard(job))}
        </div>
      </div>
    </section>
  );
}
