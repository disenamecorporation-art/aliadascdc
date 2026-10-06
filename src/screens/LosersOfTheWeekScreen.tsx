import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Upload, Check, Sparkles, AlertCircle, Scan, Trophy } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { useApp } from '../context/AppContext';

interface LosersOfTheWeekScreenProps {
  onBack: () => void;
}

export const LosersOfTheWeekScreen: React.FC<LosersOfTheWeekScreenProps> = ({ onBack }) => {
  const { loserSubmissions, submitLoserTicket, currentUser } = useApp();

  const [lotteryName, setLotteryName] = useState('Caracas Tripleta');
  const [ticketNumber, setTicketNumber] = useState('');
  const [amount, setAmount] = useState('30.00');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      setIsScanning(true);
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
        setTimeout(() => {
          setIsScanning(false);
          setTicketNumber('TK-' + Math.floor(100000 + Math.random() * 900000));
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber) return;

    submitLoserTicket({
      lotteryName,
      ticketNumber,
      amount: parseFloat(amount) || 20,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1554415707-9e44667014f8?w=500&auto=format&fit=crop&q=80'
    });

    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-800">
      <TopHeader title="Perdedores de la Semana" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#4E0A7D] via-[#61109a] to-[#F25AA0] rounded-3xl p-5 text-white shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-[#D8AE52] text-slate-900 rounded-full">
                Sorteo de Reintegro
              </span>
              <h2 className="text-xl font-extrabold font-heading">
                Tu Ticket No Ganador Vale
              </h2>
              <p className="text-xs text-purple-100 max-w-[220px]">
                Sube tu ticket perdedor y participa por un bono de consuelo del 50% de tu jugada.
              </p>
            </div>
            <div className="text-4xl">🎟️</div>
          </div>
        </motion.div>

        {/* Upload Form */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 font-heading">
            Registrar Ticket No Ganador
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lotería del Ticket
              </label>
              <select
                value={lotteryName}
                onChange={e => setLotteryName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#4E0A7D]"
              >
                <option value="Caracas Tripleta">Caracas Tripleta</option>
                <option value="Lotería Nacional">Lotería Nacional</option>
                <option value="Táchira">Táchira</option>
                <option value="Zulia">Zulia</option>
                <option value="Animalitos Lotto Activo">Animalitos Lotto Activo</option>
              </select>
            </div>

            {/* Photo upload dropzone with OCR scan effect */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Foto del Ticket Físico
              </label>
              <label className="border-2 border-dashed border-purple-200 hover:border-[#4E0A7D] bg-purple-50/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative overflow-hidden">
                {isScanning && (
                  <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs font-bold">
                    <Scan className="w-8 h-8 animate-bounce mb-1" />
                    <span>Escaneando OCR de Aliadas CDC...</span>
                  </div>
                )}

                {photoUrl ? (
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                    <Check className="w-4 h-4" /> Ticket escaneado y verificado
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs flex flex-col items-center gap-1.5">
                    <Upload className="w-6 h-6 text-[#4E0A7D]" />
                    <span className="font-bold">Tomar foto o subir captura</span>
                    <span className="text-[10px] text-slate-400">La IA leerá el código automáticamente</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Número de Ticket
              </label>
              <input
                type="text"
                value={ticketNumber}
                onChange={e => setTicketNumber(e.target.value)}
                placeholder="Ej: TK-881920"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Monto no Ganador (Bs.)
              </label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="30.00"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#4E0A7D] to-[#61109a] text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 active:scale-95 transition-all text-xs"
            >
              Participar en la Dinámica Semanal
            </button>
          </form>
        </div>

        {/* Weekly Leaderboard */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-extrabold text-slate-900 font-heading flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Participantes de la Semana</span>
            </h3>
            <span className="text-xs text-slate-400">{loserSubmissions.length} registrados</span>
          </div>

          <div className="space-y-2.5">
            {loserSubmissions.map((sub, idx) => (
              <div
                key={sub.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#4E0A7D] flex items-center justify-center font-bold text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{sub.userName}</h4>
                    <p className="text-[11px] text-slate-400">{sub.lotteryName} &bull; {sub.ticketNumber}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-rose-600">
                    Bs. {sub.playedAmount.toFixed(2)}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-bold">
                    ✓ {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
              🎉
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              ¡Ticket Registrado!
            </h3>
            <p className="text-xs text-slate-600">
              Tu ticket ha sido verificado por IA y participará en el sorteo de reintegro de este domingo.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
