import React from 'react';
import { motion } from 'motion/react';
import { Wallet, Target, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface WalletScreenProps {
  onBack: () => void;
  onNavigateDeposit: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  onBack,
  onNavigateDeposit
}) => {
  const movements = [
    {
      id: '1',
      title: 'Depósito',
      date: '02/10/2025 - 10:45',
      amount: '+ Bs. 50,00',
      isPositive: true,
      iconColor: 'bg-[#D8AE52] text-white'
    },
    {
      id: '2',
      title: 'Apuesta',
      date: '02/10/2025 - 09:30',
      amount: '- Bs. 20,00',
      isPositive: false,
      iconColor: 'bg-[#4E0A7D] text-white'
    },
    {
      id: '3',
      title: 'Bono Referido',
      date: '01/10/2025 - 18:20',
      amount: '+ Bs. 10,00',
      isPositive: true,
      iconColor: 'bg-[#D8AE52] text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Mi Billetera" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Main Card matching Screenshot 5 */}
        <div className="bg-[#4E0A7D] text-white rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs text-purple-200">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[11px] font-semibold">Saldo Disponible</span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-heading pl-1">
            120,50
          </div>
        </div>

        {/* 2 Big Action Buttons matching Screenshot 5 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Depositar: Purple background button */}
          <button
            onClick={onNavigateDeposit}
            className="p-4 bg-[#4E0A7D] text-white rounded-2xl flex flex-col items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold">Depositar</span>
          </button>

          {/* Historial: White background button with purple text */}
          <button
            onClick={() => {}}
            className="p-4 bg-white border border-slate-200 text-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#4E0A7D]" />
            </div>
            <span className="text-xs font-bold text-slate-800">Historial</span>
          </button>
        </div>

        {/* Section Movimientos matching Screenshot 5 */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-900 mb-3 font-heading">
            Movimientos
          </h3>

          <div className="space-y-3">
            {movements.map(m => (
              <div
                key={m.id}
                className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${m.iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
                    {m.isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                    <p className="text-[11px] text-slate-400">{m.date}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold ${
                    m.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {m.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
