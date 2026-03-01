'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import { jobService } from '@/services';
import { BASE_URL } from '@/services/api';
import { Job } from '@/types';

type TagColor = 'green' | 'orange' | 'purple' | 'red';

const TAG_STYLES: Record<TagColor, string> = {
  green: 'bg-[#56CDAD]/10 text-[#56CDAD] border-[#56CDAD]',
  orange: 'bg-[#FFB836]/10 text-[#FFB836] border-[#FFB836]',
  purple: 'bg-[#4640DE]/10 text-[#4640DE] border-[#4640DE]',
  red: 'bg-[#FF6550]/10 text-[#FF6550] border-[#FF6550]',
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
  'Full Time': 'green',
  'Part Time': 'orange',
  Internship: 'purple',
  Remote: 'red',
  Contract: 'orange',
  Freelance: 'red',
};

function getLogoUrl(logo?: string) {
  if (!logo) return '';
  if (logo.startsWith('http')) return logo;
  return `${BASE_URL}${logo}`;
}

export default function LatestJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getLatest();
        if (response.success && response.data) {
          setJobs(response.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to fetch latest jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderSkeleton = (count: number, isMobile: boolean) =>
    Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`${isMobile ? '' : 'flex items-start gap-5'} bg-white border border-[#D6DDEB] p-5 animate-pulse`}
      >
        <div
          className={`${isMobile ? 'w-12 h-12 mb-4' : 'w-14 h-14 shrink-0'} rounded-xl bg-[#D6DDEB]`}
        />
        <div className={isMobile ? '' : 'flex-1'}>
          <div className="h-5 bg-[#D6DDEB] rounded w-3/4 mb-2" />
          <div className="h-4 bg-[#D6DDEB] rounded w-1/2 mb-3" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-[#D6DDEB] rounded-full" />
            <div className="h-6 w-16 bg-[#D6DDEB] rounded-full" />
          </div>
        </div>
      </div>
    ));

  const renderJobCard = (job: Job, isMobile: boolean) => {
    const typeColor = TYPE_COLORS[job.type] || 'green';
    const categoryColor = CATEGORY_COLORS[job.category] || 'purple';
    const logoUrl = getLogoUrl(job.companyLogo);

    const logoElement = logoUrl ? (
      <img
        src={logoUrl}
        alt={job.company}
        className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} rounded-xl object-cover`}
      />
    ) : (
      <div
        className={`${isMobile ? 'w-12 h-12 text-xl' : 'w-14 h-14 text-2xl'} rounded-xl flex items-center justify-center font-bold bg-[#F0F0FF] text-[#4640DE]`}
      >
        {job.company.charAt(0)}
      </div>
    );

    const tags = (
      <div className="flex flex-wrap gap-2">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${TAG_STYLES[typeColor]}`}
        >
          {job.type}
        </span>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${TAG_STYLES[categoryColor]}`}
        >
          {job.category}
        </span>
        {job.tags?.slice(0, 1).map((tag) => {
          const tagColor = CATEGORY_COLORS[tag] || 'purple';
          return (
            <span
              key={tag}
              className={`text-xs font-medium px-3 py-1 rounded-full border ${TAG_STYLES[tagColor]}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    );

    if (isMobile) {
      return (
        <Link
          href={`/jobs/${job._id}`}
          key={job._id}
          className="bg-white border border-[#D6DDEB] p-5 cursor-pointer block transition-all duration-300 hover:border-[#4640DE]"
        >
          <div className="mb-4">{logoElement}</div>
          <h3 className="text-lg font-bold text-[#25324B] mb-1">
            {job.title}
          </h3>
          <p className="text-sm text-[#7C8493] mb-3">
            {job.company} • {job.location}
          </p>
          {tags}
        </Link>
      );
    }

    return (
      <Link
        href={`/jobs/${job._id}`}
        key={job._id}
        className="flex items-start gap-5 bg-white border border-[#D6DDEB] p-5 transition-all duration-300 hover:border-[#4640DE] cursor-pointer"
      >
        <div className="shrink-0">{logoElement}</div>
        <div>
          <h3 className="text-lg font-bold text-[#25324B] mb-0.5">
            {job.title}
          </h3>
          <p className="text-sm text-[#7C8493] mb-3">
            {job.company} • {job.location}
          </p>
          {tags}
        </div>
      </Link>
    );
  };

  return (
    <section className="relative bg-[#F8F8FD] py-16 overflow-hidden">
      {/* Top-left triangle clip-path decoration */}
      <div
        className="absolute top-0 left-0 h-14 w-25 md:w-30 md:h-24 bg-white pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />

      {/* Pattern background on the right 50% - desktop only */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none hidden md:block">
        <Image
          src="/images/hero/pattern.png"
          alt="decorative pattern"
          fill
          className="object-cover object-left-top opacity-60"
        />
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden mx-5">
        <h2 className="text-2xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-6">
          Latest <span className="text-[#26A4FF]">jobs open</span>
        </h2>

        <div className="flex flex-col gap-4">
          {loading
            ? renderSkeleton(3, true)
            : jobs.length === 0
              ? (
                  <div className="border border-[#D6DDEB] bg-white p-8 text-center">
                    <p className="text-[#7C8493]">No jobs available yet</p>
                  </div>
                )
              : jobs.map((job) => renderJobCard(job, true))}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="relative z-10 mx-20 2xl:mx-30 3xl:mx-40 hidden md:block">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)]">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="text-[#4640DE] font-semibold flex items-center gap-2 hover:underline"
          >
            Show all jobs <GoArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Jobs Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-6">
          {loading
            ? renderSkeleton(4, false)
            : jobs.length === 0
              ? (
                  <div className="col-span-2 border border-[#D6DDEB] bg-white p-12 text-center">
                    <p className="text-[#7C8493] text-lg">No jobs available yet</p>
                  </div>
                )
              : jobs.map((job) => renderJobCard(job, false))}
        </div>
      </div>
    </section>
  );
}
