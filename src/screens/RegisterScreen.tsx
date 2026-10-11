import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
  onRegistered: (registeredIdentifier?: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onRegistered
}) => {
  const { registerClient, taquillas } = useApp();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taquillaId, setTaquillaId] = useState(taquillas[0]?.id || 'taq_1');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre.');
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage('Por favor ingresa tu apellido.');
      return;
    }
    if (!cedula.trim()) {
      setErrorMessage('La cédula de identidad es obligatoria.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('El correo electrónico es obligatorio.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Por favor ingresa tu número de teléfono.');
      return;
    }
    if (!password) {
      setErrorMessage('Por favor ingresa una contraseña.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedTaquilla = taquillas.find(t => t.id === taquillaId) || taquillas[0];
      const res = await registerClient({
        name: name.trim(),
        lastName: lastName.trim(),
        cedula: cedula.trim(),
        email: email.trim(),
        phone: phone.trim(),
        taquillaId: selectedTaquilla?.id || 'taq_1',
        taquillaName: selectedTaquilla?.name || 'Taquilla La 1',
        password,
        passwordConfirm
      });

      if (res.success) {
        onRegistered(email.trim());
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage('Ocurrió un error al procesar el registro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Registro" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Nombre <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nombre"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Apellido <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Apellido"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
              />
            </div>
          </div>

          {/* Cédula */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Cédula <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={cedula}
              onChange={e => setCedula(e.target.value)}
              placeholder="Cédula"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Correo Electrónico <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Teléfono <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Teléfono"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
              />
            </div>
          </div>

          {/* Taquilla */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Taquilla
            </label>
            <select
              value={taquillaId}
              onChange={e => setTaquillaId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
            >
              {taquillas.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contraseña */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Contraseña <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Confirmar Contraseña <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="Repetir contraseña"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:bg-white focus:border-[#4E0A7D]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-2">
          Solo puedes registrarte una vez.<br />
          Tu cuenta se verá reflejada en el sistema.
        </p>
      </div>
    </div>
  );
};
