import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { BottomWave } from '../components/BottomWave';
import { useApp } from '../context/AppContext';

interface LoginScreenProps {
  initialIdentifier?: string;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onNavigateRoleSelector: () => void;
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  initialIdentifier = '',
  onNavigateRegister,
  onNavigateForgotPassword,
  onLoginSuccess
}) => {
  const { login } = useApp();
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialIdentifier) {
      setIdentifier(initialIdentifier);
    }
  }, [initialIdentifier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanId = identifier.trim();
    if (!cleanId) {
      setErrorMessage('Por favor ingresa tu correo electrónico o cédula.');
      return;
    }
    if (!password) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    setIsLoading(true);
    const res = await login(cleanId, password);
    setIsLoading(false);

    if (res.success) {
      onLoginSuccess();
    } else {
      setErrorMessage(res.message || 'Correo/Cédula o contraseña incorrectos.');
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 flex flex-col justify-center px-6 pt-10 pb-4 z-10 max-w-sm mx-auto w-full">
        {/* Logo at Top */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 flex justify-center"
        >
          <img
            src="https://i.postimg.cc/gkHbxBYK/logoapp.png"
            alt="ALIADAS CDC"
            className="w-48 object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-5"
        >
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Iniciar Sesión
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ingresa con tu correo electrónico o tu cédula
          </p>
        </motion.div>

        {/* Error message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <span className="font-medium leading-tight">{errorMessage}</span>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Correo o Cédula Input */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700">
              Correo Electrónico o Cédula
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={e => {
                  setIdentifier(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="ejemplo@correo.com o V-12345678"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4E0A7D] placeholder:text-slate-400 text-slate-800"
              />
            </div>
          </div>

          {/* Contraseña Input */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Tu contraseña"
                className="w-full pl-10 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4E0A7D] placeholder:text-slate-400 text-slate-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Ingresar Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#4E0A7D] via-[#5e0d96] to-[#3a065e] hover:opacity-95 text-white font-bold rounded-xl shadow-md active:scale-98 transition-all text-sm disabled:opacity-50"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </motion.form>

        {/* Links */}
        <div className="text-center mt-4 space-y-3">
          <button
            type="button"
            onClick={onNavigateForgotPassword}
            className="text-xs font-semibold text-[#4E0A7D] hover:underline block mx-auto"
          >
            ¿Olvidaste tu contraseña?
          </button>

          <p className="text-xs text-slate-700">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onNavigateRegister}
              className="text-[#4E0A7D] font-bold hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="w-full relative z-0">
        <BottomWave />
      </div>
    </div>
  );
};
