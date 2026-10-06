import React from 'react';
import { Home, BarChart2, Wallet, User } from 'lucide-react';

export type TabType = 'inicio' | 'resultados' | 'wallet' | 'perfil';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'inicio' as TabType, label: 'Inicio', icon: Home },
    { id: 'resultados' as TabType, label: 'Resultados', icon: BarChart2 },
    { id: 'wallet' as TabType, label: 'Wallet', icon: Wallet },
    { id: 'perfil' as TabType, label: 'Perfil', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 max-w-md mx-auto select-none">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                isActive ? 'text-[#4E0A7D] font-bold' : 'text-slate-500'
              }`}
            >
              {isActive ? (
                <div className="w-8 h-8 rounded-full bg-[#4E0A7D] text-white flex items-center justify-center shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center text-slate-500">
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <span className="text-[10px] mt-0.5 font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
