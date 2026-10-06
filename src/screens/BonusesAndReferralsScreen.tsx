import React from 'react';
import { Gift, Users2 } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface BonusesAndReferralsScreenProps {
  onBack: () => void;
}

export const BonusesAndReferralsScreen: React.FC<BonusesAndReferralsScreenProps> = ({ onBack }) => {
  const topReferrers = [
    {
      rank: 1,
      name: 'Ana Torres',
      referrals: '12 referidos',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 2,
      name: 'María López',
      referrals: '10 referidos',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 3,
      name: 'Carlos Pérez',
      referrals: '8 referidos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Bonos y Referidos" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Banner with Gift Box matching Screenshot 12 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl shrink-0">
            🎁
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 font-heading leading-tight">
              Bienvenida a<br />Aliadas CDC
            </h2>
          </div>
        </div>

        {/* 2 Bonus Cards matching Screenshot 12 */}
        <div className="space-y-3">
          {/* Card 1: Bono de Bienvenida */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#4E0A7D] flex items-center justify-center text-xl shrink-0">
                🎀
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Bono de Bienvenida
                </h3>
                <p className="text-[11px] font-extrabold text-[#4E0A7D]">
                  Bs. 50,00
                </p>
                <p className="text-[10px] text-slate-400">
                  Se acredita al registrarte.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Bono por Referido */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#F25AA0] flex items-center justify-center text-xl shrink-0">
                👥
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Bono por Referido
                </h3>
                <p className="text-[11px] font-extrabold text-[#4E0A7D]">
                  Bs. 10,00
                </p>
                <p className="text-[10px] text-slate-400">
                  Por cada amigo que se registre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Top Referidores matching Screenshot 12 */}
        <div className="pt-2 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 font-heading">
            Top Referidores
          </h3>

          <div className="space-y-2.5">
            {topReferrers.map(item => (
              <div
                key={item.rank}
                className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 w-4 text-center">
                    {item.rank}
                  </span>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover border border-purple-100"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {item.name}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">
                  {item.referrals}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
