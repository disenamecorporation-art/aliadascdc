import React from 'react';
import { TopHeader } from '../components/TopHeader';
import { useApp } from '../context/AppContext';

interface ClientProfileScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateRoleSelector?: () => void;
}

export const ClientProfileScreen: React.FC<ClientProfileScreenProps> = ({
  onBack,
  onNavigateRoleSelector
}) => {
  const { currentUser } = useApp();

  const user = currentUser || {
    name: 'María',
    lastName: 'García',
    cedula: '12.345.678',
    phone: '0416-1234567',
    taquillaName: 'La 1',
    referralCode: 'ALIADAS-4587',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Mi Perfil" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* User Avatar & Name */}
        <div className="text-center pt-2 space-y-2">
          <img
            src={user.avatarUrl}
            alt={`${user.name} ${user.lastName || ''}`}
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-heading">
              {user.name} {user.lastName || ''}
            </h2>
            <p className="text-xs text-slate-500">
              Cliente #{user.referralCode?.split('-')[1] || '4587'}
            </p>
          </div>
        </div>

        {/* Info Table Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Nombre</span>
            <span className="text-slate-500 font-medium">{user.name} {user.lastName || ''}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Cédula</span>
            <span className="text-slate-500 font-mono font-medium">{user.cedula}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Teléfono</span>
            <span className="text-slate-500 font-medium">{user.phone}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-700">Taquilla</span>
            <span className="text-slate-500 font-medium">{user.taquillaName || 'La 1'}</span>
          </div>
        </div>

        {/* Purple Button: Editar datos */}
        <button
          onClick={() => {}}
          className="w-full py-3 bg-[#4E0A7D] hover:bg-[#600f99] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
        >
          Editar datos
        </button>

        {/* Link to Role Selector / Admin */}
        {onNavigateRoleSelector && (
          <div className="pt-2 text-center">
            <button
              onClick={onNavigateRoleSelector}
              className="text-xs font-bold text-[#D8AE52] hover:underline"
            >
              Cambiar Perfil (Cliente / Administrador / Taquillero)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
