import React from 'react';

interface BottomWaveProps {
  className?: string;
  variant?: 'default' | 'subtle' | 'compact';
}

export const BottomWave: React.FC<BottomWaveProps> = ({ className = '', variant = 'default' }) => {
  return (
    <div className={`w-full overflow-hidden pointer-events-none relative ${className}`}>
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        className={`w-full ${variant === 'compact' ? 'h-16' : 'h-24 md:h-28'}`}
      >
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E0A7D" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#370659" stopOpacity="1" />
            <stop offset="100%" stopColor="#25033d" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D8AE52" />
            <stop offset="50%" stopColor="#F5CF76" />
            <stop offset="100%" stopColor="#C49839" />
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F25AA0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D43B83" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Pink Wave Underlay */}
        <path
          d="M0,80 C150,150 350,20 500,90 L500,150 L0,150 Z"
          fill="url(#pinkGradient)"
          opacity="0.85"
        />

        {/* Gold Accent Ribbon Wave */}
        <path
          d="M0,60 C120,130 320,10 500,100 L500,115 C320,25 120,145 0,75 Z"
          fill="url(#goldGradient)"
        />

        {/* Deep Purple Main Curve */}
        <path
          d="M0,95 C140,165 300,50 500,120 L500,150 L0,150 Z"
          fill="url(#purpleGradient)"
        />
      </svg>
    </div>
  );
};
