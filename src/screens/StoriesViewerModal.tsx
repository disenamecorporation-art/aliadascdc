import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StoryStatus } from '../types';

interface StoriesViewerModalProps {
  initialIndex: number;
  onClose: () => void;
}

export const StoriesViewerModal: React.FC<StoriesViewerModalProps> = ({
  initialIndex = 0,
  onClose
}) => {
  const { stories, viewStory } = useApp();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex] || stories[0];

  useEffect(() => {
    if (currentStory) {
      viewStory(currentStory.id);
    }
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(i => i + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, stories, onClose, viewStory]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-0 select-none">
      <div className="relative w-full max-w-sm h-full max-h-[92vh] bg-slate-900 rounded-none sm:rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl">
        {/* Top Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
          {stories.map((s, idx) => (
            <div key={s.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    idx < currentIndex
                      ? '100%'
                      : idx === currentIndex
                      ? `${progress}%`
                      : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Header info */}
        <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D8AE52] to-[#F25AA0] p-0.5">
              <img
                src="https://i.postimg.cc/gkHbxBYK/logoapp.png"
                alt="Aliadas CDC"
                className="w-full h-full rounded-full object-cover bg-white p-0.5"
              />
            </div>
            <div>
              <p className="text-xs font-bold leading-none">{currentStory.author}</p>
              <p className="text-[10px] text-white/70">{currentStory.time} &bull; {currentStory.category}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Background Image */}
        <div className="absolute inset-0 z-10">
          <img
            src={currentStory.imageUrl}
            alt={currentStory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Click tap zones for Next / Prev */}
        <div className="absolute inset-0 z-20 flex">
          <div className="w-1/3 h-full" onClick={handlePrev} />
          <div className="w-2/3 h-full" onClick={handleNext} />
        </div>

        {/* Bottom Story Description */}
        <div className="relative z-30 p-5 mt-auto text-white space-y-2">
          <span className="inline-block px-2.5 py-0.5 bg-[#D8AE52] text-slate-950 font-extrabold text-[10px] rounded-full uppercase tracking-wider">
            {currentStory.category}
          </span>
          <h3 className="text-lg font-extrabold leading-snug font-heading">
            {currentStory.title}
          </h3>
          {currentStory.description && (
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentStory.description}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between text-[11px] text-white/70 border-t border-white/20">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {currentStory.views} visualizaciones
            </span>
            <span>Expira en {currentStory.expiresIn}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
