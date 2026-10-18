import React, { useState } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { useApp } from '../context/AppContext';
import { generateWhatsAppLink, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface PollaAnimalitosScreenProps {
  onBack: () => void;
}

export const PollaAnimalitosScreen: React.FC<PollaAnimalitosScreenProps> = ({ onBack }) => {
  const { currentUser } = useApp();
  const [date, setDate] = useState('Hoy');
  const [fee, setFee] = useState('Bs. 100,00');
  const [ticketCreated, setTicketCreated] = useState(false);

  const getNumericFee = () => {
    if (fee.includes('100')) return 100;
    if (fee.includes('200')) return 200;
    if (fee.includes('500')) return 500;
    return 100;
  };

  const whatsappUrl = generateWhatsAppLink({
    tipo: 'Polla Animalitos',
    montoBs: getNumericFee(),
    detalle: `Ruleta Animalitos Fecha: ${date}`,
    clienteNombre: currentUser ? `${currentUser.name} ${currentUser.lastName}` : 'Cliente Aliadas',
    cedula: currentUser?.cedula || 'N/A',
    taquilla: currentUser?.taquillaName || 'Taquilla La 1'
  });

  const handleCrearPolla = () => {
    setTicketCreated(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Polla Animalitos" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Safari Animals Banner matching Screenshot 10 */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-white shadow-2xs border border-slate-200 flex items-center justify-center p-3">
          <div className="flex items-center justify-center gap-3 text-4xl">
            <span>🦁</span>
            <span>🐘</span>
            <span>🦒</span>
            <span>🐒</span>
            <span>🐯</span>
            <span>🐬</span>
          </div>
        </div>

        {/* Title matching Screenshot 10 */}
        <div className="text-center">
          <h2 className="text-base font-extrabold text-slate-900 font-heading">
            Crea tu propia polla de animalitos
          </h2>
        </div>

        {ticketCreated && (
          <div className="bg-emerald-50 border border-emerald-400 p-3 rounded-2xl text-emerald-800 text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Ticket de Animalitos Generado!</span>
            </div>
            <p className="text-[11px] text-emerald-700 leading-snug">
              Envía tu ticket al WhatsApp <strong>{WHATSAPP_PHONE_FORMATTED}</strong> para validarlo y sellarlo al instante con el taquillero.
            </p>
          </div>
        )}

        {/* Form fields matching Screenshot 10 */}
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Selecciona la fecha
            </label>
            <select
              value={date}
              onChange={e => {
                setDate(e.target.value);
                setTicketCreated(false);
              }}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="Hoy">Hoy</option>
              <option value="Mañana">Mañana</option>
              <option value="Fin de Semana">Fin de Semana</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Monto por participación
            </label>
            <select
              value={fee}
              onChange={e => {
                setFee(e.target.value);
                setTicketCreated(false);
              }}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="Bs. 100,00">Bs. 100,00</option>
              <option value="Bs. 200,00">Bs. 200,00</option>
              <option value="Bs. 500,00">Bs. 500,00</option>
            </select>
          </div>

          {/* Venta Directa por WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all text-center no-underline"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>Comprar Ticket por WhatsApp ({WHATSAPP_PHONE_FORMATTED})</span>
          </a>

          {/* Purple Button: Crear Polla */}
          <button
            onClick={handleCrearPolla}
            className="w-full py-3 bg-[#4E0A7D] hover:bg-[#600f99] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
          >
            Crear Polla
          </button>
        </div>
      </div>
    </div>
  );
};
