import type { HTMLAttributes } from 'react';

interface BrandMarkProps extends HTMLAttributes<HTMLDivElement> {
  iconClassName?: string;
}

export function BrandMark({ className = '', iconClassName = '' }: BrandMarkProps) {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shadow-sm ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className={`h-[70%] w-[70%] ${iconClassName}`}>
        <defs>
          <linearGradient id="brand-grad" x1="8" x2="56" y1="56" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#737373" />
            <stop offset="1" stopColor="#a3a3a3" />
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="50" height="50" rx="8" fill="none" stroke="url(#brand-grad)" strokeWidth="4.5" />
        <path d="M18 24h24" fill="none" stroke="url(#brand-grad)" strokeWidth="5" strokeLinecap="round" />
        <path d="M18 24v14" fill="none" stroke="url(#brand-grad)" strokeWidth="5" strokeLinecap="round" />
        <path d="M18 38h10" fill="none" stroke="url(#brand-grad)" strokeWidth="5" strokeLinecap="round" />
        <path d="M25 31l8 8 15-15" fill="none" stroke="url(#brand-grad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

interface BrandWordmarkProps {
  className?: string;
  textClassName?: string;
  markClassName?: string;
}

export function BrandWordmark({ className = '', textClassName = '', markClassName = '' }: BrandWordmarkProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <BrandMark className={`h-10 w-10 ${markClassName}`} />
      <span className={`text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${textClassName}`}>
        AppointmentLelo
        <span>.io</span>
      </span>
    </div>
  );
}
