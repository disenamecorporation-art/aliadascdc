import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface RegisterScreenProps {
  onBack: () => void;
  onRegistered: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack, onRegistered }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cedula, setCedula] = useState('');
  const [phone, setPhone] = useState('');
  const [taquilla, setTaquilla] = useState('Taquilla La 1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegistered();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Registro" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Nombre * */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Nombre <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            />
          </div>

          {/* Apellido * */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Apellido <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            />
          </div>

          {/* Cédula * */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Cédula <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={cedula}
              onChange={e => setCedula(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            />
          </div>

          {/* Teléfono * */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Teléfono <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            />
          </div>

          {/* Selecciona tu taquilla */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Selecciona tu taquilla
            </label>
            <select
              value={taquilla}
              onChange={e => setTaquilla(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="Taquilla La 1">Taquilla La 1</option>
              <option value="Taquilla Los Ruices">Taquilla Los Ruices</option>
              <option value="Taquilla Sabana Grande">Taquilla Sabana Grande</option>
            </select>
          </div>

          {/* Purple Button: Registrarse */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
          >
            Registrarse
          </button>
        </form>

        {/* Footer text matching Screenshot 15 */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-2">
          Solo puedes registrarte una vez.<br />
          Tu taquilla se verá reflejada en todas las taquillas.
        </p>
      </div>
    </div>
  );
};
