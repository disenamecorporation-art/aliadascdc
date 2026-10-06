import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface PlayHistoryScreenProps {
  onBack: () => void;
}

export const PlayHistoryScreen: React.FC<PlayHistoryScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'En proceso' | 'Ganadas' | 'Perdidas'>('En proceso');

  const plays = [
    {
      id: '1',
      lottery: 'Lotería Nacional',
      date: '02/10/2025 - 10:32',
      status: 'En proceso',
      statusType: 'process',
      icon: '🏛️'
    },
    {
      id: '2',
      lottery: 'Caracas',
      date: '02/10/2025 - 09:15',
      status: 'Ganada',
      statusType: 'win',
      amount: '+ Bs. 150,00',
      icon: '🏙️'
    },
    {
      id: '3',
      lottery: 'Animalitos',
      date: '01/10/2025 - 20:40',
      status: 'Perdida',
      statusType: 'lost',
      icon: '🐾'
    },
    {
      id: '4',
      lottery: 'Tripleta',
      date: '01/10/2025 - 15:22',
      status: 'Ganada',
      statusType: 'win',
      amount: '+ Bs. 80,00',
      icon: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Mis Jugadas" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* 3 Tabs matching Screenshot 13 */}
        <div className="flex items-center gap-2">
          {(['En proceso', 'Ganadas', 'Perdidas'] as const).map(item => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === item
                  ? 'bg-[#4E0A7D] text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Plays List matching Screenshot 13 */}
        <div className="space-y-3">
          {plays.map(play => (
            <div
              key={play.id}
              className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg shrink-0">
                  {play.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    {play.lottery}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {play.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    play.statusType === 'process'
                      ? 'bg-amber-100 text-amber-800'
                      : play.statusType === 'win'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {play.status}
                </span>

                {play.amount && (
                  <span className="block text-xs font-extrabold text-emerald-600 mt-0.5">
                    {play.amount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
