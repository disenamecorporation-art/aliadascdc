import React from 'react';
import { TopHeader } from '../components/TopHeader';

interface ClientProfileScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateRoleSelector?: () => void;
}

export const ClientProfileScreen: React.FC<ClientProfileScreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Mi Perfil" onBack={onBack} />

      <div className="p-4 space-y-5 max-w-md mx-auto">
        {/* User Avatar & Name matching Screenshot 14 */}
        <div className="text-center pt-2 space-y-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
            alt="María García"
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-heading">
              María García
            </h2>
            <p className="text-xs text-slate-500">
              Cliente #4587
            </p>
          </div>
        </div>

        {/* Info Table Card matching Screenshot 14 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Nombre</span>
            <span className="text-slate-500 font-medium">María García</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Cédula</span>
            <span className="text-slate-500 font-mono font-medium">12.345.678</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Teléfono</span>
            <span className="text-slate-500 font-medium">0416-1234567</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Taquilla</span>
            <span className="text-slate-500 font-medium">La 1</span>
          </div>
        </div>

        {/* Purple Button: Editar datos matching Screenshot 14 */}
        <button
          onClick={() => {}}
          className="w-full py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
        >
          Editar datos
        </button>
      </div>
    </div>
  );
};
