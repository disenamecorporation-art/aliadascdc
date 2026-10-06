import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'white';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
  variant = 'dark'
}) => {
  const sizeClasses = {
    sm: 'h-9 max-w-[140px]',
    md: 'h-14 max-w-[190px]',
    lg: 'h-24 max-w-[260px]',
    xl: 'h-32 max-w-[320px]'
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img
        src="https://i.postimg.cc/gkHbxBYK/logoapp.png"
        alt="ALIADAS CDC"
        className={`${sizeClasses[size]} object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105`}
        loading="eager"
      />
      {showSlogan && (
        <p
          className={`mt-2 text-center text-sm font-semibold tracking-wide ${
            variant === 'white' ? 'text-white/90 drop-shadow' : 'text-[#4E0A7D]'
          }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Tu suerte, nuestra pasión
        </p>
      )}
    </div>
  );
};
