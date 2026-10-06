import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface PollaAnimalitosScreenProps {
  onBack: () => void;
}

export const PollaAnimalitosScreen: React.FC<PollaAnimalitosScreenProps> = ({ onBack }) => {
  const [date, setDate] = useState('Hoy');
  const [fee, setFee] = useState('Bs. 10,00');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Polla Animalitos" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Safari Animals Banner matching Screenshot 10 */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-white shadow-2xs border border-slate-200 flex items-center justify-center p-3">
          <div className="flex items-center justify-center gap-3 text-4xl">
            <span>🦁</span>
            <span>🐘</span>
            <span>🦒</span>
            <span>🐒</span>
            <span>🐯</span>
            <span>🐬</span>
          </div>
        </div>

        {/* Title matching Screenshot 10 */}
        <div className="text-center">
          <h2 className="text-base font-extrabold text-slate-900 font-heading">
            Crea tu propia polla de animalitos
          </h2>
        </div>

        {/* Form fields matching Screenshot 10 */}
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Selecciona la fecha
            </label>
            <select
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="Hoy">Hoy</option>
              <option value="Mañana">Mañana</option>
              <option value="Fin de Semana">Fin de Semana</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Monto por participación
            </label>
            <select
              value={fee}
              onChange={e => setFee(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="Bs. 10,00">Bs. 10,00</option>
              <option value="Bs. 20,00">Bs. 20,00</option>
              <option value="Bs. 50,00">Bs. 50,00</option>
            </select>
          </div>

          {/* Purple Button: Crear Polla */}
          <button
            onClick={() => {}}
            className="w-full mt-4 py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
          >
            Crear Polla
          </button>
        </div>
      </div>
    </div>
  );
};
