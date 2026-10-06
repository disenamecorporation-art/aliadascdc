import React from 'react';
import { ShieldCheck, Zap, Lock, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const TrustBadgesBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-50/50 via-purple-50/40 to-pink-50/40 border-y border-amber-200/50 py-4 px-3 my-4 rounded-2xl shadow-xs">
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-[#D8AE52]/15 text-[#b88d33] flex items-center justify-center mb-1">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Seguro</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mb-1">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Rápido</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-[#4E0A7D]/15 text-[#4E0A7D] flex items-center justify-center mb-1">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Confiable</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-[#F25AA0]/15 text-[#F25AA0] flex items-center justify-center mb-1">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Transparente</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-purple-100/80 flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-1.5 text-[#4E0A7D] font-bold">
          <span className="text-amber-500 font-extrabold text-sm">👑</span>
          <span>Aliadas CDC Oficial</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium italic">
          La mejor experiencia en juegos de lotería
        </span>
      </div>
    </div>
  );
};
