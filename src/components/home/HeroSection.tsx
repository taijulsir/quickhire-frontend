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
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Discover<br />
              more than<br />
              <span className="text-indigo-600 relative inline-block">
                5000+ Jobs
                <svg 
                  className="absolute -bottom-1 left-0 w-full" 
                  viewBox="0 0 220 12" 
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M2 8.5C20 3 60 1 110 5C160 9 200 7 218 4" 
                    stroke="#26A4FF" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M8 10C30 6 70 4 120 6C170 8 195 5 210 3" 
                    stroke="#26A4FF" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-gray-500 text-base lg:text-lg leading-relaxed max-w-md">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>
            <form onSubmit={handleSearch} className="mt-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-2 flex flex-col sm:flex-row">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm bg-transparent"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm bg-transparent"
                />
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap text-sm m-1"
              >
                Search my job
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-1 text-sm">
              <span className="text-gray-500">Popular :</span>
              {popularSearches.map((term, index) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {term}{index < popularSearches.length - 1 ? ',' : ''}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full h-[520px]">
              <div className="absolute top-8 right-0 w-[420px] h-[480px]">
                <div className="absolute inset-0 border border-indigo-200/40 rounded-lg transform rotate-6" />
                <div className="absolute inset-4 border border-indigo-200/30 rounded-lg transform -rotate-3" />
                <div className="absolute inset-8 border border-indigo-200/20 rounded-lg transform rotate-3" />
                <div className="absolute -top-4 -left-4 w-full h-full border border-indigo-200/25 rounded-lg transform -rotate-6" />
                <div className="absolute top-12 left-8 w-[90%] h-[90%] border border-indigo-100/30 rounded-lg transform rotate-2" />
              </div>
              
              <div className="absolute top-0 right-12 w-3 h-3 bg-indigo-300/40 rounded-full" />
              <div className="absolute top-20 right-4 w-2 h-2 bg-indigo-400/30 rounded-full" />
              <div className="absolute bottom-32 right-0 w-4 h-4 bg-indigo-200/50 rounded-full" />
              <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-300/40 rounded-full" />
              
              <div className="absolute inset-0 flex items-end justify-center z-10">
                <Image
                  src="/hero-image.png"
                  alt="Job seeker pointing"
                  width={450}
                  height={500}
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="lg:hidden flex justify-center mt-8">
            <div className="relative w-full max-w-sm h-[350px]">
              <div className="absolute inset-0">
                <div className="absolute inset-2 border border-indigo-200/30 rounded-lg transform rotate-3" />
                <div className="absolute inset-4 border border-indigo-200/20 rounded-lg transform -rotate-2" />
              </div>
              <div className="absolute inset-0 flex items-end justify-center z-10">
                <Image
                  src="/hero-image.png"
                  alt="Job seeker pointing"
                  width={300}
                  height={350}
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
