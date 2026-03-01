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

  const getTagStyles = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    switch (lowerTag) {
      case 'marketing':
        return { bg: 'bg-[#FFB8361A]', text: 'text-[#FFB836]', border: 'border-[#FFB836]' };
      case 'design':
        return { bg: 'bg-[#4640DE1A]', text: 'text-[#4640DE]', border: 'border-[#4640DE]' };
      case 'business':
        return { bg: 'bg-[#4640DE1A]', text: 'text-[#4640DE]', border: 'border-[#4640DE]' };
      case 'technology':
        return { bg: 'bg-[#FF65501A]', text: 'text-[#FF6550]', border: 'border-[#FF6550]' };
      default:
        return { bg: 'bg-[#56CDAD1A]', text: 'text-[#56CDAD]', border: 'border-[#56CDAD]' };
    }
  };

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex items-center gap-6 p-6 border border-[#D6DDEB] hover:border-[#4640DE] hover:shadow-lg transition-all bg-white group"
    >
      <div className="w-[46px] h-[46px] shrink-0 overflow-hidden relative">
        {job.companyLogo ? (
          <Image 
            src={job.companyLogo} 
            alt={job.company} 
            width={46}
            height={46}
            className="object-contain w-full h-full" 
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-[#25324B] font-bold text-sm">{getCompanyInitials(job.company)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-epilogue font-semibold text-[20px] text-[#25324B] leading-[120%] mb-1 group-hover:text-[#4640DE] transition-colors truncate">
          {job.title}
        </h3>
        <p className="font-epilogue text-[16px] text-[#7C8493] leading-[160%]">
          {job.company} <span className="mx-1">•</span> {job.location}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <span className="px-4 py-1 text-[14px] font-semibold font-epilogue bg-[#56CDAD1A] text-[#56CDAD] rounded-full">
          {job.type}
        </span>
        <div className="w-px h-6 bg-[#D6DDEB] mx-2 hidden sm:block" />
        {job.tags?.slice(0, 2).map((tag) => {
          const styles = getTagStyles(tag);
          return (
            <span 
              key={tag} 
              className={`px-4 py-1 rounded-full text-[14px] font-semibold font-epilogue border ${styles.border} ${styles.text}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
