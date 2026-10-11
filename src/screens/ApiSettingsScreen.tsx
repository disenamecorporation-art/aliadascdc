import React, { useState } from 'react';
import {
  Key,
  Globe,
  Save,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import {
  getSupabaseConfig,
  setSupabaseInMemoryConfig,
  resetSupabaseClient
} from '../lib/supabase';

interface ApiSettingsScreenProps {
  onBack: () => void;
}

export const ApiSettingsScreen: React.FC<ApiSettingsScreenProps> = ({ onBack }) => {
  const currentConfig = getSupabaseConfig();

  const [supabaseUrl, setSupabaseUrl] = useState<string>(currentConfig.url || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>(currentConfig.anonKey || '');
  const [showAnonKey, setShowAnonKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSupabaseInMemoryConfig(supabaseUrl.trim(), supabaseAnonKey.trim());
    resetSupabaseClient();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Supabase API" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Banner */}
        <div className="bg-[#1b3d2f] text-white p-4 rounded-3xl shadow-md border border-emerald-500/40 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <div>
              <h2 className="text-sm font-black font-heading tracking-wide">
                Configuración de Supabase
              </h2>
              <p className="text-[10px] text-emerald-300">
                URL del Proyecto y Clave Anon
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-400 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Credenciales de Supabase guardadas correctamente.</span>
          </div>
        )}

        {/* Only 2 Inputs: URL and Anon Key + Guardar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3.5">
          {/* 1. Supabase Project URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Project URL</span>
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={e => setSupabaseUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:bg-white focus:border-emerald-500"
            />
          </div>

          {/* 2. Supabase Anon Public Key */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>Anon Key (Public)</span>
            </label>
            <div className="relative">
              <input
                type={showAnonKey ? 'text' : 'password'}
                value={supabaseAnonKey}
                onChange={e => setSupabaseAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:bg-white focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowAnonKey(!showAnonKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showAnonKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Button: Guardar */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
