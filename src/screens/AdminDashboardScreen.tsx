import React from 'react';
import {
  Users,
  UserCheck,
  User,
  Store,
  FileEdit,
  ShieldAlert,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { TopHeader } from '../components/TopHeader';

interface AdminDashboardScreenProps {
  onBack: () => void;
  onNavigateObservations: (userId?: string) => void;
  onNavigateTelegramFeed?: () => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onBack,
  onNavigateObservations
}) => {
  const menuItems = [
    { id: 'usuarios', title: 'Gestión de Usuarios', icon: Users },
    { id: 'aprobar', title: 'Aprobar Accesos', icon: UserCheck },
    { id: 'clientes', title: 'Clientes', icon: User },
    { id: 'taquilleros', title: 'Taquilleros', icon: Store },
    { id: 'observaciones', title: 'Observaciones', icon: FileEdit },
    { id: 'bloquear', title: 'Bloquear Cliente', icon: ShieldAlert, isRed: true },
    { id: 'reportes', title: 'Reportes', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Administración" onBack={onBack} />

      <div className="p-4 space-y-3 max-w-md mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'observaciones' || item.id === 'bloquear') {
                    onNavigateObservations();
                  }
                }}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 ${
                      item.isRed ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      item.isRed ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
