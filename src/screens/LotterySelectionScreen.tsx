import React, { useState } from 'react';
import { ChevronRight, Flame } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface LotterySelectionScreenProps {
  onBack: () => void;
  onNavigatePollaHipica: () => void;
  onNavigatePollaAnimalitos: () => void;
  onNavigateHistory: () => void;
  onNavigateTragamonedas?: () => void;
}

export const LotterySelectionScreen: React.FC<LotterySelectionScreenProps> = ({
  onBack,
  onNavigatePollaHipica,
  onNavigatePollaAnimalitos,
  onNavigateTragamonedas
}) => {
  const [activeTab, setActiveTab] = useState<'loterias' | 'polla_hipica' | 'animalitos'>('loterias');

  const lotteries = [
    {
      id: 'tragamonedas',
      name: 'Tragamonedas 777 (Casino & Free Spins)',
      type: '(Jackpot x100 / Giros Gratis)',
      icon: '🎰',
      isGold: true
    },
    {
      id: 'nacional',
      name: 'Lotería Nacional',
      type: '(Tripletas / Terminales)',
      icon: '🏛️'
    },
    {
      id: 'tachira',
      name: 'Táchira',
      type: '(Tripletas / Terminales)',
      icon: '🎯'
    },
    {
      id: 'zulia',
      name: 'Zulia',
      type: '(Tripletas / Terminales)',
      icon: '⚡'
    },
    {
      id: 'caracas',
      name: 'Caracas',
      type: '(Tripletas / Terminales)',
      icon: '🏙️'
    },
    {
      id: 'animalitos',
      name: 'Lotería de Animalitos',
      type: '(Animalitos)',
      icon: '🐾',
      isPink: true
    },
    {
      id: 'hipica',
      name: 'Polla Hípica',
      type: '(Caballos)',
      icon: '🏇'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Jugar" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* 3 Pills at Top matching Screenshot 7 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('loterias')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'loterias'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Loterías
          </button>
          <button
            onClick={() => {
              setActiveTab('polla_hipica');
              onNavigatePollaHipica();
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'polla_hipica'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Polla Hípica
          </button>
          <button
            onClick={() => {
              setActiveTab('animalitos');
              onNavigatePollaAnimalitos();
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'animalitos'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Animalitos
          </button>
        </div>

        {/* List of Lotteries & Games matching Screenshot 7 */}
        <div className="space-y-3">
          {lotteries.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'tragamonedas' && onNavigateTragamonedas) onNavigateTragamonedas();
                else if (item.id === 'hipica') onNavigatePollaHipica();
                else if (item.id === 'animalitos') onNavigatePollaAnimalitos();
              }}
              className={`w-full rounded-2xl p-3.5 flex items-center justify-between shadow-xs active:scale-98 transition-all text-left ${
                item.isGold
                  ? 'bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border-2 border-[#D8AE52]'
                  : 'bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                    item.isGold
                      ? 'bg-amber-100 text-slate-900 border border-amber-300'
                      : item.isPink
                      ? 'bg-pink-100 text-[#F25AA0]'
                      : 'bg-purple-50 text-[#4E0A7D]'
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {item.name}
                    </h3>
                    {item.isGold && (
                      <span className="px-1.5 py-0.2 bg-pink-500 text-white font-black text-[8px] rounded-full flex items-center gap-0.5">
                        <Flame className="w-2 h-2" /> FREE SPINS
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {item.type}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
