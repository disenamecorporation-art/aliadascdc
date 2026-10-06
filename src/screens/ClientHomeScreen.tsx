import React from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Dices,
  BarChart3,
  Sparkles,
  Receipt,
  Users2,
  Gift,
  User,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ClientHomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpenStories?: (index: number) => void;
}

export const ClientHomeScreen: React.FC<ClientHomeScreenProps> = ({ onNavigate }) => {
  const { currentUser } = useApp();

  const user = currentUser || {
    name: 'María',
    lastName: 'García',
    taquillaName: 'La 1',
    balance: 120.50,
    referralCode: 'ALIADAS-4587',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  };

  const gridActions = [
    { id: 'jugar', label: 'Jugar', icon: Dices, screen: 'jugar' },
    { id: 'tragamonedas', label: 'Tragamonedas (3)', icon: '🎰', screen: 'casino_hub' },
    { id: 'pronosticos', label: 'Pronósticos', icon: Sparkles, screen: 'pronosticos' },
    { id: 'resultados', label: 'Resultados', icon: BarChart3, screen: 'resultados' },
    { id: 'mis_jugadas', label: 'Mis Jugadas', icon: Receipt, screen: 'mis_jugadas' },
    { id: 'polla_animalitos', label: 'Polla Animalitos', icon: '🐘', screen: 'polla_animalitos' },
    { id: 'polla_hipica', label: 'Polla Hípica', icon: '🐎', screen: 'polla_hipica' },
    { id: 'referidos', label: 'Referidos', icon: Users2, screen: 'bonos_referidos' },
    { id: 'mi_perfil', label: 'Mi Perfil', icon: User, screen: 'mi_perfil' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      {/* Top Header Bar */}
      <div className="bg-[#4E0A7D] text-white px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={() => onNavigate('role_selector')}
          className="text-white hover:text-purple-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Logo centered */}
        <div className="flex justify-center flex-1 pr-6">
          <img
            src="https://i.postimg.cc/gkHbxBYK/logoapp.png"
            alt="ALIADAS CDC"
            className="h-8 object-contain filter brightness-0 invert"
          />
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* User Info Bar */}
        <div
          onClick={() => onNavigate('mi_perfil')}
          className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-3 cursor-pointer"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border border-purple-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {user.name} {user.lastName}
            </h3>
            <p className="text-xs text-slate-500">
              Cliente #{user.referralCode?.split('-')[1] || '4587'}
            </p>
            <span className="inline-block text-[11px] text-[#4E0A7D] font-bold">
              Taquilla: {user.taquillaName || 'La 1'}
            </span>
          </div>
        </div>

        {/* Mi Billetera Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#4E0A7D] text-white rounded-2xl p-4 shadow-md flex items-center justify-between"
        >
          <div>
            <p className="text-xs text-purple-200 font-medium">Mi Billetera</p>
            <h2 className="text-2xl font-extrabold text-white mt-0.5 tracking-tight font-heading">
              Bs. {user.balance.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('depositar')}
            className="py-2 px-4 bg-[#F25AA0] hover:bg-[#e0458e] text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all"
          >
            Depositar
          </button>
        </motion.div>

        {/* Tragamonedas Casino Banner */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('casino_hub')}
          className="bg-gradient-to-r from-amber-500 via-purple-700 to-[#4E0A7D] p-3.5 rounded-2xl text-white shadow-md border border-[#D8AE52]/40 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-950/60 border border-amber-400/50 flex items-center justify-center text-2xl shadow-inner shrink-0">
              🎰
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-black text-white uppercase tracking-wider font-heading">
                  Casino Tragamonedas (3 Juegos)
                </h3>
                <span className="px-1.5 py-0.2 bg-pink-500 text-white font-black text-[9px] rounded-full flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" /> FREE SPINS
                </span>
              </div>
              <p className="text-[10px] text-amber-200">
                Aliadas 777, Animalitos Safari y Derby Hípico
              </p>
            </div>
          </div>

          <button className="px-2.5 py-1.5 bg-[#D8AE52] text-slate-950 font-black text-[11px] rounded-xl shadow-sm shrink-0">
            Jugar
          </button>
        </motion.div>

        {/* 3x3 Grid of Actions */}
        <div className="grid grid-cols-3 gap-3">
          {gridActions.map(item => {
            const isEmoji = typeof item.icon === 'string';
            const Icon = !isEmoji ? (item.icon as React.ElementType) : null;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.screen)}
                className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center text-[#4E0A7D] mb-1.5">
                  {isEmoji ? (
                    <span className="text-2xl">{item.icon as string}</span>
                  ) : (
                    Icon && <Icon className="w-6 h-6 stroke-[2.2] text-[#4E0A7D]" />
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
