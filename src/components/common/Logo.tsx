import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center cursor-pointer select-none transition-transform active:scale-95 ${className}`}
    >
      <img
        src="/fairfarm-logo.jpg"
        alt="FAIRFARM - The smarter way from farm to fair price"
        className={`${sizeMap[size]} w-auto object-contain drop-shadow-sm rounded`}
      />
      {showTagline && (
        <span className="text-[11px] sm:text-xs font-medium text-forest-dark tracking-wide mt-1 text-center">
          The smarter way from farm to fair price.
        </span>
      )}
    </div>
  );
};

