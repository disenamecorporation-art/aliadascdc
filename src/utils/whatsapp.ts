/**
 * Utilidad oficial para venta directa de tickets y recargas por WhatsApp
 * Número asignado: 04220105509 (+584220105509)
 */

export const WHATSAPP_PHONE = '584220105509';
export const WHATSAPP_PHONE_FORMATTED = '0422-0105509';

export interface WhatsAppTicketPayload {
  tipo: 'Polla Hípica' | 'Polla Animalitos' | 'Tragamonedas 777' | 'Animalitos Safari Slot' | 'Hípica Royale 5y6' | 'Depósito / Recarga' | 'Ticket de Lotería';
  montoBs: number | string;
  detalle?: string;
  clienteNombre?: string;
  cedula?: string;
  taquilla?: string;
}

export function generateWhatsAppLink(payload: WhatsAppTicketPayload): string {
  const lineas: string[] = [
    '👑 *ALIADAS CDC - SOLICITUD DE TICKET / COMPRA*',
    '━━━━━━━━━━━━━━━━━━━━',
    `🎯 *Modalidad:* ${payload.tipo}`,
    `💰 *Monto:* Bs. ${typeof payload.montoBs === 'number' ? payload.montoBs.toFixed(2) : payload.montoBs}`,
  ];

  if (payload.detalle) {
    lineas.push(`📋 *Detalle:* ${payload.detalle}`);
  }

  if (payload.clienteNombre) {
    lineas.push(`👤 *Cliente:* ${payload.clienteNombre}`);
  }

  if (payload.cedula) {
    lineas.push(`🪪 *Cédula:* ${payload.cedula}`);
  }

  if (payload.taquilla) {
    lineas.push(`🏪 *Taquilla:* ${payload.taquilla}`);
  }

  const hora = new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
  lineas.push(`⏰ *Hora:* ${hora}`);
  lineas.push('━━━━━━━━━━━━━━━━━━━━');
  lineas.push('Hola, deseo procesar y validar este ticket/compra de inmediato. Adjunto mis datos para activación.');

  const texto = encodeURIComponent(lineas.join('\n'));
  return `https://wa.me/${WHATSAPP_PHONE}?text=${texto}`;
}
