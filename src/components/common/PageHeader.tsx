import Link from 'next/link';
import { GoArrowLeft } from 'react-icons/go';

interface PageHeaderProps {
  backHref: string;
  backLabel: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function PageHeader({
  backHref,
  backLabel,
  title,
  titleHighlight,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-10">
      <Link
        href={backHref}
        className="text-[#4640DE] font-semibold flex items-center gap-2 mb-5 hover:underline transition-all text-sm w-fit"
      >
        <GoArrowLeft className="text-base" />
        {backLabel}
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)] mb-2">
        {title}{' '}
        {titleHighlight && (
          <span className="text-[#26A4FF]">{titleHighlight}</span>
        )}
      </h1>

      {subtitle && (
        <p className="text-[#7C8493] text-base">{subtitle}</p>
      )}
    </div>
  );
}
