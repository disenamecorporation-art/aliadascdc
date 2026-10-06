import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface PollaHipicaScreenProps {
  onBack: () => void;
}

export const PollaHipicaScreen: React.FC<PollaHipicaScreenProps> = ({ onBack }) => {
  const [date, setDate] = useState('Hoy');
  const [fee, setFee] = useState('Bs. 10,00');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Polla Hípica" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Horse Banner Image matching Screenshot 9 */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-white shadow-2xs border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
            alt="Polla Hípica"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Title matching Screenshot 9 */}
        <div className="text-center">
          <h2 className="text-base font-extrabold text-slate-900 font-heading">
            Crea tu propia polla hípica
          </h2>
        </div>

        {/* Form fields matching Screenshot 9 */}
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
              <option value="Domingo (5y6)">Domingo (5y6)</option>
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
