import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface ObservationsBlockScreenProps {
  onBack: () => void;
  targetUserId?: string;
}

export const ObservationsBlockScreen: React.FC<ObservationsBlockScreenProps> = ({ onBack }) => {
  const [tab, setTab] = useState<'observaciones' | 'historial'>('observaciones');
  const [observation, setObservation] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Observaciones" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Client Header Info matching Screenshot 18 */}
        <div className="space-y-0.5 text-xs">
          <p className="font-bold text-slate-900">
            Cliente: María García
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Cédula: 12.345.678</span>
            <span>Estado: <strong className="text-emerald-600 font-bold">Activo</strong></span>
          </div>
        </div>

        {/* 2 Tabs matching Screenshot 18 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('observaciones')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'observaciones'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Observaciones
          </button>
          <button
            onClick={() => setTab('historial')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'historial'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Historial
          </button>
        </div>

        {/* Observation Textarea matching Screenshot 18 */}
        <div className="space-y-3">
          <textarea
            value={observation}
            onChange={e => setObservation(e.target.value)}
            placeholder="Agregar observación..."
            rows={4}
            className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden placeholder:text-slate-400"
          />

          {/* Purple Button: Guardar */}
          <button
            onClick={() => setObservation('')}
            className="w-full py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
          >
            Guardar
          </button>
        </div>

        {/* Section Bloquear cliente matching Screenshot 18 */}
        <div className="pt-4 space-y-2.5">
          <h3 className="text-xs font-bold text-rose-600">
            Bloquear cliente
          </h3>

          <p className="text-[11px] text-rose-500 leading-snug">
            El cliente será bloqueado definitivamente y se notificará a todos los taquilleros.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">
              Bloqueo definitivo
            </span>

            {/* Switch Toggle */}
            <button
              onClick={() => setIsBlocked(!isBlocked)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                isBlocked ? 'bg-[#F25AA0] justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
