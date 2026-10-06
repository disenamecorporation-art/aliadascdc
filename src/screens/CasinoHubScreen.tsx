import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Flame, ChevronRight, Zap } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface CasinoHubScreenProps {
  onBack: () => void;
  onSelectGame: (gameKey: 'tragamonedas_777' | 'tragamonedas_animalitos' | 'tragamonedas_hipica') => void;
}

export const CasinoHubScreen: React.FC<CasinoHubScreenProps> = ({
  onBack,
  onSelectGame
}) => {
  const games = [
    {
      id: 'tragamonedas_777' as const,
      title: 'ALIADAS 777 GOLD',
      subtitle: 'Tragamonedas Clásica Vegas & Giros Gratis',
      icon: '🎰',
      jackpot: 'Jackpot x100',
      badge: 'POPULAR',
      badgeColor: 'bg-yellow-400 text-slate-950',
      gradient: 'from-[#4E0A7D] via-[#63119c] to-[#30054f]',
      borderColor: 'border-[#D8AE52]'
    },
    {
      id: 'tragamonedas_animalitos' as const,
      title: 'ANIMALITOS SAFARI SLOT',
      subtitle: 'Selva, León Rey & Multiplicador Salvaje x4',
      icon: '🦁',
      jackpot: 'Jackpot x120',
      badge: 'NUEVO',
      badgeColor: 'bg-emerald-400 text-slate-950',
      gradient: 'from-[#06331a] via-[#0d592e] to-[#031c0e]',
      borderColor: 'border-emerald-400'
    },
    {
      id: 'tragamonedas_hipica' as const,
      title: 'HÍPICA ROYALE 5y6',
      subtitle: 'Derby, Copa de Oro & Triple Corona x5',
      icon: '🏇',
      jackpot: 'Jackpot x150',
      badge: 'ALTA GANANCIA',
      badgeColor: 'bg-red-500 text-white',
      gradient: 'from-[#380e0e] via-[#631414] to-[#1a0505]',
      borderColor: 'border-[#D8AE52]'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Casino Tragamonedas" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Banner Hero */}
        <div className="bg-gradient-to-r from-[#4E0A7D] via-[#63119c] to-[#2c0547] text-white rounded-3xl p-4 shadow-lg border border-[#D8AE52]/40 relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-black/40 border border-yellow-400/50 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              👑
            </div>
            <div>
              <span className="text-[10px] text-yellow-300 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-300" /> Salón de Juegos Aliadas CDC
              </span>
              <h2 className="text-base font-black text-white font-heading leading-tight">
                3 Tragamonedas Exclusivas
              </h2>
              <p className="text-[11px] text-purple-200">
                ¡Free Spins, Jackpots y premios en cada giro!
              </p>
            </div>
          </div>
        </div>

        {/* 3 Games Cards */}
        <div className="space-y-3 pt-1">
          {games.map(game => (
            <motion.button
              key={game.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGame(game.id)}
              className={`w-full text-left bg-gradient-to-r ${game.gradient} text-white p-4 rounded-3xl border-2 ${game.borderColor} shadow-md flex items-center justify-between transition-all relative overflow-hidden`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  {game.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-black text-white font-heading tracking-wide uppercase">
                      {game.title}
                    </h3>
                    <span className={`px-1.5 py-0.2 font-black text-[8px] rounded-full ${game.badgeColor}`}>
                      {game.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                    {game.subtitle}
                  </p>
                  <span className="inline-block text-[10px] font-black text-yellow-300 font-mono mt-1">
                    🏆 {game.jackpot}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
