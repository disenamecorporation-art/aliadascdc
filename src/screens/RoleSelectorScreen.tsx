import React from 'react';
import { motion } from 'motion/react';
import { User, UserCheck, Store } from 'lucide-react';
import { BottomWave } from '../components/BottomWave';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface RoleSelectorScreenProps {
  onSelectRole: (role: UserRole) => void;
  onBackToLogin: () => void;
}

export const RoleSelectorScreen: React.FC<RoleSelectorScreenProps> = ({
  onSelectRole,
  onBackToLogin
}) => {
  const { setCurrentRole, switchUserById } = useApp();

  const handleRoleChoose = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'cliente') {
      switchUserById('usr_maria_garcia');
    } else if (role === 'administrador') {
      switchUserById('usr_admin');
    } else if (role === 'taquillero') {
      switchUserById('usr_taquillero_1');
    }
    onSelectRole(role);
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 flex flex-col justify-center px-6 pt-10 pb-4 z-10 max-w-sm mx-auto w-full">
        {/* Logo at Top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 flex justify-center"
        >
          <img
            src="https://i.postimg.cc/gkHbxBYK/logoapp.png"
            alt="ALIADAS CDC"
            className="w-44 object-contain"
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
            Selecciona tu perfil
          </h2>
        </motion.div>

        {/* 3 Role Cards matching exact Screenshot 3 */}
        <div className="space-y-4">
          {/* 1. Cliente (Morado Oscuro) */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => handleRoleChoose('cliente')}
            className="w-full text-left p-4 rounded-2xl bg-[#4E0A7D] text-white shadow-md flex items-center gap-4 active:scale-98 transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Cliente
              </h3>
              <p className="text-xs text-purple-200 mt-0.5">
                Juega, consulta resultados y más.
              </p>
            </div>
          </motion.button>

          {/* 2. Administrador (Dorado) */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleRoleChoose('administrador')}
            className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-[#D8AE52] to-[#c79c3a] text-white shadow-md flex items-center gap-4 active:scale-98 transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <UserCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Administrador
              </h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Gestión total del sistema.
              </p>
            </div>
          </motion.button>

          {/* 3. Taquillero (Rosa) */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={() => handleRoleChoose('taquillero')}
            className="w-full text-left p-4 rounded-2xl bg-[#F25AA0] text-white shadow-md flex items-center gap-4 active:scale-98 transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Taquillero
              </h3>
              <p className="text-xs text-pink-100 mt-0.5">
                Procesa jugadas y atiende clientes.
              </p>
            </div>
          </motion.button>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <button
            onClick={onBackToLogin}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
          >
            &larr; Volver al inicio de sesión
          </button>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="w-full relative z-0">
        <BottomWave />
      </div>
    </div>
  );
};
