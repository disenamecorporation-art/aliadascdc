import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TopHeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  onBack,
  showBack = true,
  rightAction
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#4E0A7D] text-white px-4 py-3 flex items-center justify-between shadow-xs select-none">
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-purple-200 transition-colors active:scale-95"
            aria-label="Volver"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}
        <h1 className="text-base font-bold text-white tracking-tight font-heading truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightAction}
      </div>
    </header>
  );
};
