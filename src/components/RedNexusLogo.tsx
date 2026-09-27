import React from 'react';

interface RedNexusLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  whiteText?: boolean;
}

export const RedNexusLogo: React.FC<RedNexusLogoProps> = ({
  className = '',
  size = 'md',
  whiteText = false,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
      {/* Exact stylized Red Nexus folded ribbon/origami emblem */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0 drop-shadow-sm`}
      >
        <path
          d="M6 5L14 5L14 31L6 31L6 5Z"
          fill="#DC2626"
        />
        <path
          d="M14 5L24 23L24 5L30 5L30 31L20 13L20 31L14 31L14 5Z"
          fill="#B91C1C"
        />
        <path
          d="M6 5L22 31H30L14 5H6Z"
          fill="url(#red-nexus-grad)"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="red-nexus-grad" x1="6" y1="5" x2="30" y2="31" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF4444" />
            <stop offset="1" stopColor="#991B1B" />
          </linearGradient>
        </defs>
      </svg>

      <div className={`font-black tracking-wider flex items-center leading-none ${textSizes[size]}`}>
        <span className={whiteText ? 'text-white' : 'text-slate-900'}>RED</span>
        <span className="text-[#DC2626] ml-1.5 font-extrabold">NEXUS</span>
      </div>
    </div>
  );
};
