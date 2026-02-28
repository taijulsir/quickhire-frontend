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
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Discover<br />
              more than<br />
              <span className="text-indigo-600 relative">
                5000+ Jobs
                <svg className="absolute -bottom-2 left-0 w-48" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#FCD34D" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-gray-600 text-lg max-w-md">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>
            <form onSubmit={handleSearch} className="mt-8 bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                Search my job
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {term},
                </button>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white rounded-3xl" />
              <Image
                src="/hero-image.png"
                alt="Job seeker"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
