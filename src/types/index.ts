export type UserRole = 'cliente' | 'administrador' | 'taquillero';

export type UserStatus = 'activo' | 'pendiente' | 'bloqueado' | 'fraudulento';

export interface Observation {
  id: string;
  userId: string;
  text: string;
  author: string;
  authorRole: 'administrador' | 'taquillero';
  date: string;
  type: 'general' | 'alerta' | 'moroso' | 'sospechoso' | 'conflictivo';
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  cedula: string;
  phone: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  taquillaId: string;
  taquillaName: string;
  balance: number;
  bonusBalance: number;
  referralCode: string;
  referredBy?: string;
  cedulaFrontUrl?: string;
  cedulaBackUrl?: string;
  avatarUrl: string;
  createdAt: string;
  isRemembered?: boolean;
}

export interface Taquilla {
  id: string;
  name: string;
  operatorName: string;
  phone: string;
  telegramChatId: string;
  activeClientsCount: number;
  blockedClientsCount: number;
  pendingRequestsCount: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposito' | 'apuesta' | 'bono_referido' | 'bono_bienvenida' | 'retiro' | 'ajuste';
  amount: number;
  date: string;
  status: 'completado' | 'pendiente' | 'rechazado';
  method?: 'Transferencia Bancaria' | 'Pago Móvil' | 'Zelle' | 'Binance USDT' | 'Sistema';
  reference?: string;
  captureUrl?: string;
  description: string;
  bankOrigin?: string;
  taquillaId?: string;
}

export interface PlayRequest {
  id: string;
  userId: string;
  userName: string;
  cedula: string;
  lotteryName: string;
  lotteryCategory: 'loterias' | 'animalitos' | 'triples' | 'terminales' | 'caballos';
  playType: string;
  numbers: string[];
  amount: number;
  potentialWin: number;
  status: 'en_proceso' | 'ganada' | 'perdida' | 'cancelada';
  timestamp: string;
  taquillaId: string;
  ticketCode: string;
}

export interface LotteryResult {
  id: string;
  lotteryName: string;
  date: string;
  time: string;
  category: 'loterias' | 'animalitos' | 'triples' | 'terminales' | 'caballos';
  results: string[]; // e.g. ["12", "15", "23", "34", "56"] or ["🐯", "🐬"] or ["Caballo #3", "Caballo #7"]
  icon?: string;
  multiplier?: string;
}

export interface SmartPrediction {
  lotteryName: string;
  date: string;
  combinations: {
    numbers: string;
    probability: 'Alta probabilidad' | 'Media probabilidad' | 'Baja probabilidad';
    rate: number;
    color: string;
  }[];
  frequentNumbers: string[];
  hotTerminals: string[];
  recommendedTriplets: string[];
}

export interface HorseRaceSelection {
  raceNumber: number;
  horses: {
    id: string;
    name: string;
    number: number;
    jockey: string;
    odds: string;
  }[];
}

export interface PollaHipica {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  date: string;
  entryFee: number;
  totalPot: number;
  participantsCount: number;
  rules: string;
  racesCount: number;
  status: 'abierta' | 'en_progreso' | 'finalizada';
  bannerUrl: string;
}

export interface PollaAnimalitos {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  date: string;
  entryFee: number;
  totalPot: number;
  participantsCount: number;
  rules: string;
  selectedAnimals: string[];
  status: 'abierta' | 'en_progreso' | 'finalizada';
  bannerUrl: string;
}

export interface StoryStatus {
  id: string;
  title: string;
  category: 'Promoción' | 'Noticia' | 'Resultado' | 'Bono' | 'Polla';
  imageUrl: string;
  date: string;
  time: string;
  views: number;
  author: string;
  expiresIn: string;
  description?: string;
}

export interface LoserSubmission {
  id: string;
  userId: string;
  userName: string;
  cedula: string;
  date: string;
  lotteryName: string;
  ticketNumber: string;
  playedAmount: number;
  ticketPhotoUrl: string;
  status: 'verificado' | 'pendiente' | 'rechazado';
  ocrDetectedNumbers: string;
  notes?: string;
}

export interface TelegramMessage {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  time: string;
  date: string;
  type: 'nuevo_registro' | 'solicitud_jugada' | 'recuperacion_clave' | 'cliente_bloqueado' | 'deposito_pendiente' | 'foto_cap' | 'observacion_nueva';
  clientName?: string;
  cedula?: string;
  taquillaId?: string;
  read: boolean;
}

export interface SystemConfig {
  welcomeBonusAmount: number;
  referralBonusAmount: number;
  telegramBotToken: string;
  telegramChatId: string;
  isTelegramWebhookActive: boolean;
  minDepositAmount: number;
  currency: string;
  brandName: string;
}
