import React from 'react';
import { Send, FileText, UserPlus, KeyRound, Ban, Image as ImageIcon } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface TelegramFeedScreenProps {
  onBack: () => void;
}

export const TelegramFeedScreen: React.FC<TelegramFeedScreenProps> = ({ onBack }) => {
  const messages = [
    {
      id: '1',
      title: 'Nuevo cliente registrado',
      subtitle: 'María García - Taquilla La 1',
      time: '10:32',
      icon: <UserPlus className="w-4 h-4 text-white" />
    },
    {
      id: '2',
      title: 'Solicitud de jugada',
      subtitle: 'Cliente: María García\nLotería: Caracas - 10:45',
      time: '10:18',
      icon: <Send className="w-4 h-4 text-white -rotate-12" />
    },
    {
      id: '3',
      title: 'Olvido de contraseña',
      subtitle: 'Cliente: José Pérez',
      time: '10:05',
      icon: <KeyRound className="w-4 h-4 text-white" />
    },
    {
      id: '4',
      title: 'Cliente bloqueado',
      subtitle: 'Cédula: 09.876.543',
      time: '09:52',
      icon: <Ban className="w-4 h-4 text-white" />
    },
    {
      id: '5',
      title: 'Imagen del CAP',
      subtitle: 'Cliente: Ana Torres',
      time: '09:20',
      icon: <ImageIcon className="w-4 h-4 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Telegram - Taquilleros" onBack={onBack} />

      <div className="p-4 space-y-3 max-w-md mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {messages.map(msg => (
            <div
              key={msg.id}
              className="p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors"
            >
              {/* Cyan Telegram Icon Circle */}
              <div className="w-9 h-9 rounded-full bg-[#229ED9] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {msg.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {msg.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                    {msg.time}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 whitespace-pre-line mt-0.5 leading-snug">
                  {msg.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
