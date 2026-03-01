'use client';

import { useEffect, useState } from 'react';
import { Input, Select } from '@/components/common';
import { jobService } from '@/services';

interface JobFiltersProps {
  search: string;
  category: string;
  location: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Design', label: 'Design' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Human Resource', label: 'Human Resource' },
];

export default function JobFilters({
  search,
  category,
  location,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
}: JobFiltersProps) {
  const [locations, setLocations] = useState<{ value: string; label: string }[]>([
    { value: '', label: 'All Locations' },
  ]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await jobService.getLocations();
        if (Array.isArray(response)) {
          const locationOptions = response.map((loc: string) => ({
            value: loc,
            label: loc,
          }));
          setLocations([{ value: '', label: 'All Locations' }, ...locationOptions]);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          options={categories}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
        <Select
          options={locations}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
    </div>
  );
}
