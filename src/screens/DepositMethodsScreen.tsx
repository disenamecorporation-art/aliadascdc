import React, { useState } from 'react';
import { Building2, Smartphone, Clock } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface DepositMethodsScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const DepositMethodsScreen: React.FC<DepositMethodsScreenProps> = ({
  onBack,
  onSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const methods = [
    {
      id: 'transferencia',
      title: 'Transferencia Bancaria',
      icon: <Building2 className="w-5 h-5 text-slate-800" />
    },
    {
      id: 'pagomovil',
      title: 'Pago Móvil',
      icon: <Smartphone className="w-5 h-5 text-slate-800" />
    },
    {
      id: 'zelle',
      title: 'Zelle',
      icon: <span className="font-extrabold text-sm text-slate-800">Ż</span>
    },
    {
      id: 'binance',
      title: 'Binance USDT',
      icon: (
        <div className="w-5 h-5 rounded-full bg-[#D8AE52] flex items-center justify-center text-white font-bold text-[10px]">
          🔶
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Depositar Dinero" onBack={onBack} />

      <div className="p-4 space-y-3.5 max-w-md mx-auto">
        {/* 4 Cards matching Screenshot 6 */}
        {methods.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedMethod(item.title);
              setTimeout(() => {
                onSuccess();
              }, 400);
            }}
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs hover:bg-slate-50 active:scale-98 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <span className="text-xs font-bold text-slate-800">
              {item.title}
            </span>
          </button>
        ))}

        {/* Bottom Purple Box matching Screenshot 6 */}
        <div className="bg-[#4E0A7D] text-white rounded-2xl p-4 shadow-sm flex items-start gap-3 mt-6">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-white block">Recuerda:</span>
            <p className="text-purple-100 text-[11px] leading-snug">
              Tu saldo se actualiza de forma inmediata.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
