import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Olvido de contraseña" onBack={onBack} />

      <div className="p-4 space-y-6 max-w-md mx-auto pt-10">
        {/* Envelope Icon & Title matching Screenshot 16 */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-2xs mx-auto flex items-center justify-center">
            <Mail className="w-8 h-8 text-slate-800 stroke-[1.5]" />
          </div>

          <h2 className="text-base font-extrabold text-slate-900 font-heading">
            Solicita tu clave
          </h2>
        </div>

        {/* Form matching Screenshot 16 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden placeholder:text-slate-400"
          />

          {/* Purple Button: Enviar */}
          <button
            type="submit"
            className="w-full py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
          >
            Enviar
          </button>
        </form>

        {/* Telegram Footer matching Screenshot 16 */}
        <div className="pt-6 flex items-center justify-center gap-2 text-xs">
          <div className="w-6 h-6 rounded-full bg-[#229ED9] text-white flex items-center justify-center shrink-0">
            <Send className="w-3.5 h-3.5 -rotate-12" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Tu solicitud será enviada al taquillero por Telegram.
          </span>
        </div>
      </div>
    </div>
  );
};
