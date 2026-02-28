import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/types';
import { Tag } from '@/components/common';
import { BASE_URL } from '@/services/api';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const getCompanyInitials = (company: string) => {
    return company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  const getTagVariant = (tag: string): 'primary' | 'secondary' | 'outline' => {
    if (tag.toLowerCase() === 'marketing') return 'secondary';
    if (tag.toLowerCase() === 'design') return 'primary';
    return 'outline';
  };

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-lg transition-all bg-white"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
          {job.companyLogo ? (
            <Image 
              src={job.companyLogo.startsWith('/images') ? job.companyLogo : job.companyLogo} 
              alt={job.company} 
              fill
              className="object-cover" 
            />
          ) : (
            <span className="text-gray-600 font-bold">{getCompanyInitials(job.company)}</span>
          )}
        </div>
        <span className="px-3 py-1 text-xs font-medium border border-indigo-200 text-indigo-600 rounded-full">
          {job.type}
        </span>
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
      <p className="text-sm text-gray-500 mb-3">
        {job.company} • {job.location}
      </p>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
      <div className="flex flex-wrap gap-2">
        {job.tags?.slice(0, 3).map((tag) => (
          <Tag key={tag} text={tag} variant={getTagVariant(tag)} />
        ))}
      </div>
    </Link>
  );
}
