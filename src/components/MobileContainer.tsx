import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center w-full font-sans antialiased">
      {/* Clean Mobile Screen Viewport */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col justify-between overflow-x-hidden">
        <main className="flex-1 w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
};
