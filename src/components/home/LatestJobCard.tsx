import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/types';
import { Tag } from '@/components/common';
import { BASE_URL } from '@/services/api';

interface LatestJobCardProps {
  job: Job;
}

export default function LatestJobCard({ job }: LatestJobCardProps) {
  const getCompanyInitials = (company: string) => {
    return company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  const getTagVariant = (tag: string): 'primary' | 'secondary' | 'outline' => {
    if (tag.toLowerCase() === 'marketing') return 'secondary';
    if (tag.toLowerCase() === 'design') return 'primary';
    return 'outline';
  };
  console.log('LatestJobCard rendered for job:', job.title);
  console.log('job.companyLogo.startsWith("/images"):', job.companyLogo?.startsWith('/images'));  

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all bg-white"
    >
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
        {job.companyLogo ? (
          <Image 
            src={job.companyLogo.startsWith('/images') ? job.companyLogo : job.companyLogo} 
            alt={job.company} 
            fill
            className="object-cover" 
          />
        ) : (
          <span className="text-gray-600 font-bold text-sm">{getCompanyInitials(job.company)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
        <p className="text-sm text-gray-500">
          {job.company} • {job.location}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-end">
        <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full border border-green-200">
          {job.type}
        </span>
        {job.tags?.slice(0, 2).map((tag) => (
          <Tag key={tag} text={tag} variant={getTagVariant(tag)} />
        ))}
      </div>
    </Link>
  );
}
