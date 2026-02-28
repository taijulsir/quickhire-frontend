import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/types';
import { Tag } from '@/components/common';
import { BASE_URL } from '@/services/api';

interface FeaturedJobCardProps {
  job: Job;
}

export default function FeaturedJobCard({ job }: FeaturedJobCardProps) {
  const getCompanyInitials = (company: string) => {
    return company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  const getTagStyles = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    switch (lowerTag) {
      case 'marketing':
        return { bg: 'bg-[#EB85331A]', text: 'text-[#FFB836]' };
      case 'design':
        return { bg: 'bg-[#56CDAD1A]', text: 'text-[#56CDAD]' };
      case 'business':
        return { bg: 'bg-[#4640DE1A]', text: 'text-[#4640DE]' };
      case 'technology':
        return { bg: 'bg-[#FF65501A]', text: 'text-[#FF6550]' };
      case 'finance':
        return { bg: 'bg-[#26A4FF1A]', text: 'text-[#26A4FF]' };
      case 'engineering':
        return { bg: 'bg-[#7B61FF1A]', text: 'text-[#7B61FF]' };
      case 'sales':
        return { bg: 'bg-[#F94D6A1A]', text: 'text-[#F94D6A]' };
      case 'human resource':
        return { bg: 'bg-[#00B0741A]', text: 'text-[#00B074]' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block p-6 border border-[#D6DDEB] rounded-none hover:border-[#4640DE] hover:shadow-md transition-all bg-white group"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 flex items-center justify-center overflow-hidden relative rounded-full">
          {job.companyLogo ? (
            <Image 
              src={job.companyLogo} 
              alt={job.company} 
              width={48}
              height={48}
              className="object-cover w-full h-full" 
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-[#25324B] font-bold text-sm">{getCompanyInitials(job.company)}</span>
            </div>
          )}
        </div>
        <span className="px-3 py-1 text-[14px] font-semibold border border-[#4640DE] text-[#4640DE] rounded-none font-epilogue">
          {job.type}
        </span>
      </div>
      
      <div className="mb-2">
        <h3 className="font-epilogue font-semibold text-[18px] text-[#25324B] leading-[120%] mb-1 group-hover:text-[#4640DE] transition-colors">{job.title}</h3>
        <p className="font-epilogue text-[16px] text-[#7C8493] leading-[160%]">
          {job.company} <span className="mx-1">•</span> {job.location}
        </p>
      </div>

      <p className="font-epilogue text-[16px] text-[#7C8493] leading-[160%] mb-6 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {job.tags?.slice(0, 3).map((tag) => {
          const styles = getTagStyles(tag);
          return (
            <span 
              key={tag} 
              className={`px-4 py-1.5 rounded-full text-[14px] font-semibold font-epilogue ${styles.bg} ${styles.text}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
