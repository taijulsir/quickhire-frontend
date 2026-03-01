'use client';

import Image from 'next/image';
import SearchBox from './SearchBox';

export default function HeroSection() {
  return (
    <section className='relative flex flex-col md:flex-row items-center mx-5 md:mx-20 2xl:mx-30 3xl:mx-40 md:h-[90vh] md:max-h-[1200px] py-10 md:py-0'>
      {/* Pattern background - visible on mobile behind content */}
      <div className='absolute top-0 right-0 bottom-0 w-1/2 z-0 pointer-events-none md:hidden'>
        <Image
          src="/images/hero/pattern.png"
          alt="decorative pattern"
          fill
          className='object-cover object-right-top opacity-30'
        />
      </div>

      {/* Left side - full width on mobile, 50% on desktop */}
      <div className='w-full md:w-1/2 relative z-10'>
        {/* Heading */}
        <div className='mb-6'>
          <h1 className='text-4xl md:text-7xl leading-[1.1] font-bold text-[#25324B] font-[family-name:var(--font-clash-display)]'>
            Discover
          </h1>
          <h1 className='text-4xl md:text-7xl leading-[1.1] font-bold text-[#25324B] font-[family-name:var(--font-clash-display)]'>
            more than
          </h1>
          <div className='relative inline-block'>
            <h1 className='text-4xl md:text-7xl leading-[1.1] font-bold text-[#26A4FF] font-[family-name:var(--font-clash-display)] mb-2 md:mb-4'>
              5000+ Jobs
            </h1>
            <Image
              src="/images/hero/text-border.png"
              alt="underline decoration"
              width={280}
              height={20}
              className='absolute -bottom-2 left-0 w-[220px] md:w-[450px] h-auto'
            />
          </div>
        </div>

        {/* Subtitle */}
        <p className='text-sm md:text-base text-[#515B6F] leading-relaxed mb-8 max-w-[500px]'>
          Great platform for the job seeker that searching for
          new career heights and passionate about startups.
        </p>

        {/* Search Box - full width on mobile, extends 140% on desktop */}
        <div className='relative z-20 w-full'>
          <div className='md:hidden'>
            <SearchBox />
          </div>
          <div className='hidden md:block' style={{ width: '140%' }}>
            <SearchBox />
          </div>
        </div>

        {/* Popular Tags */}
        <p className='text-xs md:text-sm text-[#515B6F] mt-4'>
          <span className='font-medium text-[#25324B]'>Popular : </span>
          UI Designer, UX Researcher, Android, Admin
        </p>
      </div>

      {/* Right side - hidden on mobile, 50% on desktop */}
      <div className='hidden md:flex w-1/2 relative items-end justify-center self-stretch'>
        {/* Pattern background - visible but behind navbar */}
        <div className='absolute -top-20 -right-20 bottom-0 -left-8 z-0 pointer-events-none'>
          <Image
            src="/images/hero/pattern.png"
            alt="decorative pattern"
            fill
            className='object-cover object-right-top'
          />
        </div>

        {/* Hero Image - fills full section height */}
        <div className='relative z-[1] flex items-end justify-center h-full w-full'>
          <Image
            src="/images/hero/hero.png"
            alt="hero person"
            width={420}
            height={560}
            className='h-full w-auto object-contain object-bottom'
            priority
          />
        </div>
      </div>
    </section>
  );
}
