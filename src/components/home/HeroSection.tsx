'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  const popularSearches = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

  return (
    <section className="relative overflow-hidden bg-[#F4F6FB] min-h-[calc(100vh-64px)] flex items-center w-full">
      {/* Bottom Right Diagonal Shape */}
      <div className="absolute bottom-0 right-0 w-[100%] lg:w-[60%] h-[120px] lg:h-[350px] bg-white z-0" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-8">
          {/* Left content */}
          <div className="max-w-xl xl:max-w-2xl pt-12 pb-10 lg:py-0 relative z-20">
            <h1 className="text-[44px] sm:text-6xl lg:text-[72px] font-extrabold text-[#192033] leading-[1.05] tracking-tight">
              Discover<br />
              more than<br />
              <span className="text-[#26A4FF] relative inline-block mt-1">
                5000+ Jobs
                <svg 
                  className="absolute -bottom-4 left-0 w-[105%] h-[24px]" 
                  viewBox="0 0 355 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M5 12C85 5 250 2 345 8" stroke="#26A4FF" strokeWidth="6" strokeLinecap="round" />
                  <path d="M20 20C105 15 220 12 335 15" stroke="#26A4FF" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-8 text-[#6B7280] text-lg lg:text-[18px] leading-relaxed max-w-lg font-medium">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            <form onSubmit={handleSearch} className="mt-10 bg-white rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-2 flex flex-col sm:flex-row w-full relative z-30 lg:w-[110%] lg:shadow-xl">
              <div className="flex-[1.2] flex items-center gap-3 px-4 py-3 sm:border-r border-gray-200">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-[15px] bg-transparent w-full"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-[15px] bg-transparent w-full"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button
                type="submit"
                className="bg-[#4C40F7] text-white px-8 py-3.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap text-[15px] w-full sm:w-auto"
              >
                Search my job
              </button>
            </form>
            
            <div className="mt-6 flex flex-wrap items-center gap-1.5 text-[15px]">
              <span className="text-gray-500">Popular :</span>
              {popularSearches.map((term, index) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {term}{index < popularSearches.length - 1 ? ',' : ''}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right content */}
          <div className="relative w-full h-[450px] lg:h-[calc(100vh-120px)] min-h-[450px] lg:min-h-[600px] flex justify-center lg:justify-end items-end">
            
            {/* absolute geometric shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] lg:w-[130%] h-[120%] z-0 pointer-events-none flex items-center justify-center opacity-[0.85]">
              <svg 
                viewBox="0 0 800 800" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Diagonal geometric outlines exactly like Figma */}
                <g stroke="#D4D9EE" strokeWidth="2.5">
                  {/* Left-most frame */}
                  <path d="M120,480 L120,220 L350,130 L350,390 Z" />
                  <path d="M350,130 L450,90 L450,350 L350,390" />
                  
                  {/* Mid-right frame */}
                  <path d="M250,620 L250,360 L480,270 L480,530 Z" />
                  <path d="M480,270 L600,220 L600,480 L480,530" />
                  
                  {/* Top-right frame */}
                  <path d="M480,330 L480,100 L710,10 L710,240 Z" />
                  <path d="M710,10 L810,-30 L810,200 L710,240" />
                </g>
              </svg>
            </div>
            
            {/* image */}
            <div className="relative z-10 w-full h-[95%] lg:h-[90%] flex justify-center lg:justify-end items-end pb-4 lg:pb-0 lg:pr-8">
              <Image
                src="/hero-section-boy.png"
                alt="Job seeker pointing"
                width={700}
                height={850}
                className="object-contain object-bottom h-full w-auto drop-shadow-sm"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
