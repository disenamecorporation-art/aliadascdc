import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Lock, Eye, EyeOff } from 'lucide-react';
import { BottomWave } from '../components/BottomWave';
import { useApp } from '../context/AppContext';

interface LoginScreenProps {
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onNavigateRoleSelector: () => void;
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateRegister,
  onNavigateForgotPassword,
  onLoginSuccess
}) => {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'maria.garcia@gmail.com', password || 'password123');
    onLoginSuccess();
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
          className="text-center mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Iniciar Sesión
          </h2>
        </motion.div>

        {/* Form matching Screenshot 2 */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Usuario Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <UserIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Usuario"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4E0A7D] placeholder:text-slate-400 text-slate-800"
            />
          </div>

          {/* Contraseña Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4E0A7D] placeholder:text-slate-400 text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Ingresar Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#4E0A7D] via-[#5e0d96] to-[#3a065e] hover:opacity-95 text-white font-bold rounded-xl shadow-md active:scale-98 transition-all text-sm"
          >
            Ingresar
          </button>
        </motion.form>

        {/* Links matching Screenshot 2 */}
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
              Regístrate
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
