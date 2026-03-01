'use client';

import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { TbChartBar, TbSpeakerphone, TbDeviceDesktop } from 'react-icons/tb';
import { FiTarget, FiCode } from 'react-icons/fi';
import { BsBriefcase, BsPeople } from 'react-icons/bs';
import { GoArrowRight } from 'react-icons/go';
import { jobService } from '@/services';
import { Category } from '@/types';

const CATEGORY_ICONS: Record<string, IconType> = {
  Design: HiOutlinePencilAlt,
  Sales: TbChartBar,
  Marketing: TbSpeakerphone,
  Finance: FiTarget,
  Technology: TbDeviceDesktop,
  Engineering: FiCode,
  Business: BsBriefcase,
  'Human Resource': BsPeople,
};

// All category names in display order
const ALL_CATEGORIES = [
  'Design',
  'Sales',
  'Marketing',
  'Finance',
  'Technology',
  'Engineering',
  'Business',
  'Human Resource',
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await jobService.getCategories();
        if (response.success && response.data) {
          // Merge API counts with all categories (show 0 if no jobs)
          const merged = ALL_CATEGORIES.map((name) => {
            const found = response.data?.find((c) => c.name === name);
            return { name, count: found ? found.count : 0 };
          });
          setCategories(merged);
        } else {
          setCategories(ALL_CATEGORIES.map((name) => ({ name, count: 0 })));
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories(ALL_CATEGORIES.map((name) => ({ name, count: 0 })));
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Skeleton card for loading state
  const SkeletonCard = () => (
    <div className="border border-[#D6DDEB] p-8 animate-pulse">
      <div className="w-10 h-10 bg-[#D6DDEB] rounded mb-6" />
      <div className="h-5 w-24 bg-[#D6DDEB] rounded mb-2" />
      <div className="h-4 w-32 bg-[#D6DDEB] rounded" />
    </div>
  );

  // Skeleton card for mobile
  const MobileSkeletonCard = () => (
    <div className="flex gap-4 border border-[#D6DDEB] py-5 px-4 animate-pulse">
      <div className="w-12 h-12 rounded-lg bg-[#D6DDEB] shrink-0" />
      <div className="flex-1">
        <div className="h-4 w-20 bg-[#D6DDEB] rounded mb-2" />
        <div className="h-3 w-28 bg-[#D6DDEB] rounded" />
      </div>
    </div>
  );

  return (
    <section className="py-16">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-6">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h2>

        {/* Category List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, i) => <MobileSkeletonCard key={i} />)
          ) : categories.length === 0 ? (
            // No data state
            <div className="text-center py-8 text-[#7C8493]">No categories available</div>
          ) : (
            categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.name] || BsBriefcase;
              return (
                <Link
                  href={`/jobs/category/${encodeURIComponent(category.name)}`}
                  key={category.name}
                  className="flex gap-4 border border-[#D6DDEB] py-5 px-4 cursor-pointer transition-all duration-300 hover:border-[#4640DE]"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#F0F0FF] flex items-center justify-center shrink-0">
                    <Icon className="text-[#4640DE] text-xl" />
                  </div>

                  {/* Text + Arrow row */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#25324B] mb-0.5">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#7C8493]">{category.count} jobs available</span>
                      <GoArrowRight className="text-[#7C8493] text-lg shrink-0" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Show all jobs link - bottom */}
        <Link
          href="/jobs"
          className="text-[#4640DE] font-semibold flex items-center gap-2 mt-6 text-sm"
        >
          Show all jobs <GoArrowRight className="text-lg" />
        </Link>
      </div>

      {/*  DESKTOP LAYOUT */}
      <div className="hidden md:block">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)]">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          <Link
            href="/jobs"
            className="text-[#4640DE] font-semibold flex items-center gap-2 hover:underline"
          >
            Show all jobs <GoArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-4 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : categories.length === 0 ? (
            // No data state
            <div className="col-span-4 text-center py-12 text-[#7C8493]">
              No categories available
            </div>
          ) : (
            categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.name] || BsBriefcase;
              return (
                <Link
                  href={`/jobs/category/${encodeURIComponent(category.name)}`}
                  key={category.name}
                  className="group border border-[#D6DDEB] p-8 cursor-pointer transition-all duration-300 hover:bg-[#4640DE] block"
                >
                  {/* DESIGN UPDATE: Using local SVG for Design, Finance, Sales if available, otherwise Icon */}
                  {['Design', 'Finance', 'Sales'].includes(category.name) ? (
                    <img
                      src={`/images/categories/${category.name.toLowerCase()}.svg`}
                      alt={category.name}
                      className="w-10 h-10 mb-6 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  ) : (
                    <Icon className="text-[#4640DE] text-4xl mb-6 group-hover:text-white transition-colors duration-300" />
                  )}

                  <h3 className="text-lg font-bold text-[#25324B] mb-1 group-hover:text-white transition-colors duration-300">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#7C8493] text-base group-hover:text-white/80 transition-colors duration-300">
                      {category.count} jobs available
                    </span>
                    <GoArrowRight className="text-[#7C8493] text-sm group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

