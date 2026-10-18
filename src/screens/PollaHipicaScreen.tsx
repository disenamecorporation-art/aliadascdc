import React, { useState } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { useApp } from '../context/AppContext';
import { generateWhatsAppLink, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface PollaHipicaScreenProps {
  onBack: () => void;
}

export const PollaHipicaScreen: React.FC<PollaHipicaScreenProps> = ({ onBack }) => {
  const { currentUser } = useApp();
  const bcvRate = 45.50; // Tasa BCV actual oficial
  const [date, setDate] = useState('Hoy');
  const [feeUsd, setFeeUsd] = useState<number>(1);
  const [ticketCreated, setTicketCreated] = useState(false);

  const calculatedBs = feeUsd * bcvRate;

  const getNumericFee = () => {
    return Math.round(calculatedBs * 100) / 100;
  };

  const whatsappUrl = generateWhatsAppLink({
    tipo: 'Polla Hípica',
    montoBs: getNumericFee(),
    detalle: `Carreras Fecha: ${date} ($${feeUsd} USD al BCV Bs. ${bcvRate})`,
    clienteNombre: currentUser ? `${currentUser.name} ${currentUser.lastName}` : 'Cliente Aliadas',
    cedula: currentUser?.cedula || 'N/A',
    taquilla: currentUser?.taquillaName || 'Taquilla La 1'
  });

  const handleCrearPolla = () => {
    setTicketCreated(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Polla Hípica" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Horse Banner Image */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-white shadow-2xs border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
            alt="Polla Hípica"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-base font-extrabold text-slate-900 font-heading">
            Crea tu propia polla hípica
          </h2>
          <p className="text-[11px] text-emerald-700 font-bold bg-emerald-50 py-1 px-3 rounded-full inline-block border border-emerald-200">
            Tasa BCV oficial: $1 = Bs. {bcvRate.toFixed(2).replace('.', ',')} (Varía según BCV)
          </p>
        </div>

        {ticketCreated && (
          <div className="bg-emerald-50 border border-emerald-400 p-3 rounded-2xl text-emerald-800 text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Ticket de Polla Hípica Generado!</span>
            </div>
            <p className="text-[11px] text-emerald-700 leading-snug">
              Envía tu ticket al WhatsApp <strong>{WHATSAPP_PHONE_FORMATTED}</strong> para validarlo y sellarlo al instante con el taquillero.
            </p>
          </div>
        )}

        {/* Form fields */}
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
              <option value="Domingo (5y6)">Domingo (5y6)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Monto por participación ($ USD convertido a BCV)
            </label>
            <select
              value={feeUsd}
              onChange={e => {
                setFeeUsd(Number(e.target.value));
                setTicketCreated(false);
              }}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value={1}>$1 USD (Bs. {(1 * bcvRate).toFixed(2).replace('.', ',')})</option>
              <option value={2}>$2 USD (Bs. {(2 * bcvRate).toFixed(2).replace('.', ',')})</option>
              <option value={5}>$5 USD (Bs. {(5 * bcvRate).toFixed(2).replace('.', ',')})</option>
              <option value={10}>$10 USD (Bs. {(10 * bcvRate).toFixed(2).replace('.', ',')})</option>
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
