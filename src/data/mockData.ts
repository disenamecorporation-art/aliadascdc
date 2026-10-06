import { User, Taquilla, Transaction, PlayRequest, LotteryResult, SmartPrediction, PollaHipica, PollaAnimalitos, StoryStatus, LoserSubmission, TelegramMessage, Observation, SystemConfig } from '../types';

export const INITIAL_CONFIG: SystemConfig = {
  welcomeBonusAmount: 50.0,
  referralBonusAmount: 10.0,
  telegramBotToken: '7829104823:AAHXkd09_ALIADAS_DEMO_BOT',
  telegramChatId: '-100293847291',
  isTelegramWebhookActive: true,
  minDepositAmount: 5.0,
  currency: 'Bs.',
  brandName: 'ALIADAS CDC'
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_maria_garcia',
    name: 'María',
    lastName: 'García',
    cedula: '12.345.678',
    phone: '0416-1234567',
    email: 'maria.garcia@gmail.com',
    password: 'password123',
    role: 'cliente',
    status: 'activo',
    taquillaId: 'taq_1',
    taquillaName: 'Taquilla La 1',
    balance: 120.50,
    bonusBalance: 50.00,
    referralCode: 'ALIADAS-4587',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    cedulaFrontUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    cedulaBackUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-09-15 10:30:00',
    isRemembered: true
  },
  {
    id: 'usr_admin',
    name: 'Administrador',
    lastName: 'General',
    cedula: '10.000.001',
    phone: '0412-9998877',
    email: 'admin@aliadascdc.com',
    password: 'admin',
    role: 'administrador',
    status: 'activo',
    taquillaId: 'taq_central',
    taquillaName: 'Sede Central CDC',
    balance: 50000.00,
    bonusBalance: 0,
    referralCode: 'ALIADAS-ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01 00:00:00'
  },
  {
    id: 'usr_taquillero_1',
    name: 'Carlos',
    lastName: 'Mendoza',
    cedula: '18.990.112',
    phone: '0424-5551234',
    email: 'taquilla1@aliadascdc.com',
    password: 'taquilla123',
    role: 'taquillero',
    status: 'activo',
    taquillaId: 'taq_1',
    taquillaName: 'Taquilla La 1',
    balance: 14500.00,
    bonusBalance: 0,
    referralCode: 'TAQ1-ALIADAS',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-03-10 08:00:00'
  },
  {
    id: 'usr_jose_perez',
    name: 'José',
    lastName: 'Pérez',
    cedula: '15.678.901',
    phone: '0414-7778899',
    email: 'jose.perez@yahoo.com',
    password: 'password123',
    role: 'cliente',
    status: 'activo',
    taquillaId: 'taq_1',
    taquillaName: 'Taquilla La 1',
    balance: 45.00,
    bonusBalance: 10.00,
    referralCode: 'ALIADAS-7821',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-09-20 14:15:00'
  },
  {
    id: 'usr_ana_torres',
    name: 'Ana',
    lastName: 'Torres',
    cedula: '22.456.789',
    phone: '0412-3334455',
    email: 'ana.torres@hotmail.com',
    password: 'password123',
    role: 'cliente',
    status: 'activo',
    taquillaId: 'taq_2',
    taquillaName: 'Taquilla Los Ruices',
    balance: 380.00,
    bonusBalance: 120.00,
    referralCode: 'ALIADAS-1109',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01 11:20:00'
  },
  {
    id: 'usr_pending_1',
    name: 'Ricardo',
    lastName: 'Valera',
    cedula: '26.889.331',
    phone: '0426-8889900',
    email: 'ricardo.valera@gmail.com',
    password: 'password123',
    role: 'cliente',
    status: 'pendiente',
    taquillaId: 'taq_1',
    taquillaName: 'Taquilla La 1',
    balance: 0,
    bonusBalance: 0,
    referralCode: 'ALIADAS-9901',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    cedulaFrontUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    cedulaBackUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-10-02 09:10:00'
  },
  {
    id: 'usr_blocked_1',
    name: 'Marcos',
    lastName: 'Suárez',
    cedula: '09.876.543',
    phone: '0414-9990011',
    email: 'marcos.s@fraude.net',
    password: 'password123',
    role: 'cliente',
    status: 'fraudulento',
    taquillaId: 'taq_1',
    taquillaName: 'Taquilla La 1',
    balance: 0,
    bonusBalance: 0,
    referralCode: 'ALIADAS-0000',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-07-10 16:00:00'
  }
];

export const INITIAL_TAQUILLAS: Taquilla[] = [
  {
    id: 'taq_1',
    name: 'Taquilla La 1',
    operatorName: 'Carlos Mendoza',
    phone: '0424-5551234',
    telegramChatId: '-100293847291',
    activeClientsCount: 142,
    blockedClientsCount: 3,
    pendingRequestsCount: 5
  },
  {
    id: 'taq_2',
    name: 'Taquilla Los Ruices',
    operatorName: 'Andrea Soler',
    phone: '0412-1112233',
    telegramChatId: '-100293847292',
    activeClientsCount: 98,
    blockedClientsCount: 1,
    pendingRequestsCount: 2
  },
  {
    id: 'taq_3',
    name: 'Taquilla Sabana Grande',
    operatorName: 'Gabriel Rivas',
    phone: '0416-9994433',
    telegramChatId: '-100293847293',
    activeClientsCount: 215,
    blockedClientsCount: 4,
    pendingRequestsCount: 7
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    userId: 'usr_maria_garcia',
    type: 'deposito',
    amount: 50.00,
    date: '02/10/2026 - 10:45',
    status: 'completado',
    method: 'Pago Móvil',
    reference: 'REF-88492019',
    description: 'Depósito Pago Móvil Bancamiga',
    bankOrigin: 'Bancamiga'
  },
  {
    id: 'tx_2',
    userId: 'usr_maria_garcia',
    type: 'apuesta',
    amount: 20.00,
    date: '02/10/2026 - 09:30',
    status: 'completado',
    description: 'Jugada Tripleta Caracas 09:15'
  },
  {
    id: 'tx_3',
    userId: 'usr_maria_garcia',
    type: 'bono_referido',
    amount: 10.00,
    date: '01/10/2026 - 18:20',
    status: 'completado',
    description: 'Bono por registro de referido (José P.)'
  },
  {
    id: 'tx_4',
    userId: 'usr_maria_garcia',
    type: 'bono_bienvenida',
    amount: 50.00,
    date: '15/09/2026 - 10:35',
    status: 'completado',
    description: 'Bono de Bienvenida Aliadas CDC'
  },
  {
    id: 'tx_5',
    userId: 'usr_maria_garcia',
    type: 'deposito',
    amount: 150.00,
    date: '02/10/2026 - 09:15',
    status: 'completado',
    description: 'Premio ganado Lotería Caracas'
  }
];

export const INITIAL_PLAYS: PlayRequest[] = [
  {
    id: 'play_1',
    userId: 'usr_maria_garcia',
    userName: 'María García',
    cedula: '12.345.678',
    lotteryName: 'Lotería Nacional',
    lotteryCategory: 'loterias',
    playType: 'Terminales / Tripletas',
    numbers: ['12', '34', '56'],
    amount: 15.00,
    potentialWin: 120.00,
    status: 'en_proceso',
    timestamp: '02/10/2026 - 10:32',
    taquillaId: 'taq_1',
    ticketCode: 'TK-992014'
  },
  {
    id: 'play_2',
    userId: 'usr_maria_garcia',
    userName: 'María García',
    cedula: '12.345.678',
    lotteryName: 'Caracas',
    lotteryCategory: 'triples',
    playType: 'Tripleta Especial',
    numbers: ['07', '14', '21'],
    amount: 20.00,
    potentialWin: 150.00,
    status: 'ganada',
    timestamp: '02/10/2026 - 09:15',
    taquillaId: 'taq_1',
    ticketCode: 'TK-881920'
  },
  {
    id: 'play_3',
    userId: 'usr_maria_garcia',
    userName: 'María García',
    cedula: '12.345.678',
    lotteryName: 'Animalitos',
    lotteryCategory: 'animalitos',
    playType: 'Lotto Activo (Zorro, León)',
    numbers: ['15 (Zorro)', '05 (León)'],
    amount: 10.00,
    potentialWin: 60.00,
    status: 'perdida',
    timestamp: '01/10/2026 - 20:40',
    taquillaId: 'taq_1',
    ticketCode: 'TK-776152'
  },
  {
    id: 'play_4',
    userId: 'usr_maria_garcia',
    userName: 'María García',
    cedula: '12.345.678',
    lotteryName: 'Tripleta',
    lotteryCategory: 'triples',
    playType: 'Tripleta Clásica',
    numbers: ['03', '16', '29'],
    amount: 10.00,
    potentialWin: 80.00,
    status: 'ganada',
    timestamp: '01/10/2026 - 15:22',
    taquillaId: 'taq_1',
    ticketCode: 'TK-661902'
  }
];

export const INITIAL_RESULTS: LotteryResult[] = [
  {
    id: 'res_1',
    lotteryName: 'Lotería Nacional',
    date: '02/10/2026',
    time: '12:00 PM',
    category: 'loterias',
    results: ['12', '15', '23', '34', '56'],
    icon: '🏛️'
  },
  {
    id: 'res_2',
    lotteryName: 'Táchira',
    date: '02/10/2026',
    time: '01:00 PM',
    category: 'loterias',
    results: ['03', '08', '16', '27', '44'],
    icon: '🎯'
  },
  {
    id: 'res_3',
    lotteryName: 'Zulia',
    date: '02/10/2026',
    time: '12:45 PM',
    category: 'loterias',
    results: ['05', '11', '18', '25', '37'],
    icon: '⚡'
  },
  {
    id: 'res_4',
    lotteryName: 'Caracas',
    date: '02/10/2026',
    time: '01:15 PM',
    category: 'triples',
    results: ['07', '14', '21', '33', '48'],
    icon: '🏙️'
  },
  {
    id: 'res_5',
    lotteryName: 'Animalitos',
    date: '02/10/2026',
    time: '02:00 PM',
    category: 'animalitos',
    results: ['🐯', '🐬', '🦊', '🦁', '🐘'],
    icon: '🐾'
  },
  {
    id: 'res_6',
    lotteryName: 'Polla Hípica',
    date: '02/10/2026',
    time: '04:30 PM',
    category: 'caballos',
    results: ['🏇 #3 Relámpago', '🐎 #7 El Patriarca', '🏇 #1 Dinamita'],
    icon: '🏆'
  }
];

export const INITIAL_PREDICTIONS: Record<string, SmartPrediction> = {
  'Caracas': {
    lotteryName: 'Caracas',
    date: '02/10/2026',
    combinations: [
      { numbers: '12 - 34 - 56', probability: 'Alta probabilidad', rate: 94, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      { numbers: '07 - 18 - 27', probability: 'Media probabilidad', rate: 76, color: 'bg-amber-100 text-amber-700 border-amber-300' },
      { numbers: '03 - 16 - 29', probability: 'Media probabilidad', rate: 68, color: 'bg-amber-100 text-amber-700 border-amber-300' },
      { numbers: '45 - 88 - 91', probability: 'Baja probabilidad', rate: 45, color: 'bg-rose-100 text-rose-700 border-rose-300' }
    ],
    frequentNumbers: ['12', '34', '56', '07', '21', '88'],
    hotTerminals: ['56', '27', '29', '14', '03'],
    recommendedTriplets: ['12-34-56', '07-18-27', '03-16-29']
  },
  'Lotería Nacional': {
    lotteryName: 'Lotería Nacional',
    date: '02/10/2026',
    combinations: [
      { numbers: '23 - 45 - 78', probability: 'Alta probabilidad', rate: 91, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      { numbers: '11 - 22 - 33', probability: 'Media probabilidad', rate: 72, color: 'bg-amber-100 text-amber-700 border-amber-300' },
      { numbers: '09 - 19 - 89', probability: 'Media probabilidad', rate: 64, color: 'bg-amber-100 text-amber-700 border-amber-300' }
    ],
    frequentNumbers: ['23', '45', '78', '11', '89'],
    hotTerminals: ['78', '33', '89', '45'],
    recommendedTriplets: ['23-45-78', '11-22-33']
  },
  'Táchira': {
    lotteryName: 'Táchira',
    date: '02/10/2026',
    combinations: [
      { numbers: '03 - 08 - 16', probability: 'Alta probabilidad', rate: 89, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      { numbers: '27 - 44 - 61', probability: 'Media probabilidad', rate: 70, color: 'bg-amber-100 text-amber-700 border-amber-300' }
    ],
    frequentNumbers: ['03', '08', '16', '27'],
    hotTerminals: ['16', '44', '61'],
    recommendedTriplets: ['03-08-16', '27-44-61']
  },
  'Zulia': {
    lotteryName: 'Zulia',
    date: '02/10/2026',
    combinations: [
      { numbers: '05 - 11 - 18', probability: 'Alta probabilidad', rate: 93, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      { numbers: '25 - 37 - 99', probability: 'Media probabilidad', rate: 75, color: 'bg-amber-100 text-amber-700 border-amber-300' }
    ],
    frequentNumbers: ['05', '11', '18', '25', '37'],
    hotTerminals: ['18', '37', '99'],
    recommendedTriplets: ['05-11-18', '25-37-99']
  }
};

export const INITIAL_POLLAS_HIPICAS: PollaHipica[] = [
  {
    id: 'polla_hip_1',
    title: 'Clásico La Rinconada 5y6',
    creatorId: 'usr_admin',
    creatorName: 'Aliadas CDC Oficial',
    date: 'Hoy (02/10/2026)',
    entryFee: 10.00,
    totalPot: 1450.00,
    participantsCount: 145,
    rules: 'El ganador que acierte las 6 válidas se lleva el 80% del pote acumulado. Segundo lugar 20%.',
    racesCount: 6,
    status: 'abierta',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'polla_hip_2',
    title: 'Polla Especial Rancho Grande',
    creatorId: 'usr_maria_garcia',
    creatorName: 'María García',
    date: 'Mañana (03/10/2026)',
    entryFee: 15.00,
    totalPot: 450.00,
    participantsCount: 30,
    rules: 'Polla privada entre amigos. Puntos por orden de llegada del 1ro al 3ro.',
    racesCount: 4,
    status: 'abierta',
    bannerUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_POLLAS_ANIMALITOS: PollaAnimalitos[] = [
  {
    id: 'polla_anim_1',
    title: 'Polla Selvática Ruleta Activa',
    creatorId: 'usr_admin',
    creatorName: 'Aliadas CDC',
    date: 'Hoy (02/10/2026)',
    entryFee: 10.00,
    totalPot: 920.00,
    participantsCount: 92,
    rules: 'Elige 5 animales del día. Quien sume más aciertos en la jornada de 10 sorteos gana.',
    selectedAnimals: ['🐯 Tigre', '🐬 Delfín', '🦊 Zorro', '🦁 León', '🐘 Elefante'],
    status: 'abierta',
    bannerUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&auto=format&fit=crop&q=80'
  }
];

export const TOP_REFERRERS = [
  { rank: 1, name: 'Ana Torres', referralsCount: 12, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', reward: 'Bs. 120,00' },
  { rank: 2, name: 'María López', referralsCount: 10, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', reward: 'Bs. 100,00' },
  { rank: 3, name: 'Carlos Pérez', referralsCount: 8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', reward: 'Bs. 80,00' },
  { rank: 4, name: 'Gabriela Silva', referralsCount: 6, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', reward: 'Bs. 60,00' },
  { rank: 5, name: 'Fernando Gómez', referralsCount: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', reward: 'Bs. 50,00' }
];

export const INITIAL_STORIES: StoryStatus[] = [
  {
    id: 'st_1',
    title: 'Super Bono Fin de Semana',
    category: 'Promoción',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80',
    date: '02/10/2026',
    time: '08:00 AM',
    views: 482,
    author: 'Administrador CDC',
    expiresIn: '18 horas',
    description: 'Recarga más de Bs. 100 y llévate un 20% adicional en saldo jugable!'
  },
  {
    id: 'st_2',
    title: 'Gran Polla Hípica Acumulada',
    category: 'Polla',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    date: '02/10/2026',
    time: '09:30 AM',
    views: 310,
    author: 'Taquilla Sabana Grande',
    expiresIn: '12 horas',
    description: 'Ya abrieron las inscripciones para el Clásico dominical. Pote garantizado Bs. 5.000!'
  },
  {
    id: 'st_3',
    title: 'Resultados Oficiales de la Mañana',
    category: 'Resultado',
    imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop&q=80',
    date: '02/10/2026',
    time: '11:00 AM',
    views: 650,
    author: 'Aliadas CDC',
    expiresIn: '22 horas',
    description: 'Consulta los terminales y triples premiados en el menú de resultados.'
  }
];

export const INITIAL_OBSERVATIONS: Observation[] = [
  {
    id: 'obs_1',
    userId: 'usr_maria_garcia',
    text: 'Cliente frecuente, excelente puntualidad en pagos y participación activa.',
    author: 'Carlos Mendoza',
    authorRole: 'taquillero',
    date: '02/10/2026 - 10:00',
    type: 'general'
  },
  {
    id: 'obs_2',
    userId: 'usr_blocked_1',
    text: 'Intento de comprobante de pago móvil adulterado en dos oportunidades.',
    author: 'Administrador General',
    authorRole: 'administrador',
    date: '01/10/2026 - 16:40',
    type: 'alerta'
  }
];

export const INITIAL_TELEGRAM_MESSAGES: TelegramMessage[] = [
  {
    id: 'tg_1',
    title: 'Nuevo cliente registrado',
    subtitle: 'María García - Taquilla La 1',
    body: 'Nuevo usuario registrado con CI: 12.345.678. Verificación de cédula adjunta.',
    time: '10:32',
    date: '02/10/2026',
    type: 'nuevo_registro',
    clientName: 'María García',
    cedula: '12.345.678',
    taquillaId: 'taq_1',
    read: false
  },
  {
    id: 'tg_2',
    title: 'Solicitud de jugada',
    subtitle: 'Cliente: María García - Lotería: Caracas',
    body: 'Monto: Bs. 20,00 | Tipo: Tripleta Especial | Números: 07-14-21',
    time: '10:18',
    date: '02/10/2026',
    type: 'solicitud_jugada',
    clientName: 'María García',
    cedula: '12.345.678',
    taquillaId: 'taq_1',
    read: false
  },
  {
    id: 'tg_3',
    title: 'Olvido de contraseña',
    subtitle: 'Cliente: José Pérez',
    body: 'El usuario solicita recuperación de clave. Correo: jose.perez@yahoo.com',
    time: '10:05',
    date: '02/10/2026',
    type: 'recuperacion_clave',
    clientName: 'José Pérez',
    cedula: '15.678.901',
    taquillaId: 'taq_1',
    read: true
  },
  {
    id: 'tg_4',
    title: 'Cliente bloqueado',
    subtitle: 'Cédula: 09.876.543',
    body: 'ALERTA GENERAL: Usuario Marcos Suárez bloqueado definitivamente por intento de fraude.',
    time: '09:52',
    date: '02/10/2026',
    type: 'cliente_bloqueado',
    clientName: 'Marcos Suárez',
    cedula: '09.876.543',
    read: true
  },
  {
    id: 'tg_5',
    title: 'Imagen del CAP',
    subtitle: 'Cliente: Ana Torres',
    body: 'Comprobante de depósito Pago Móvil por Bs. 50,00 adjunto para validación.',
    time: '09:20',
    date: '02/10/2026',
    type: 'foto_cap',
    clientName: 'Ana Torres',
    cedula: '22.456.789',
    taquillaId: 'taq_2',
    read: true
  }
];

export const INITIAL_LOSER_SUBMISSIONS: LoserSubmission[] = [
  {
    id: 'loser_1',
    userId: 'usr_maria_garcia',
    userName: 'María García',
    cedula: '12.345.678',
    date: '01/10/2026',
    lotteryName: 'Animalitos Lotto Activo',
    ticketNumber: 'TK-776152',
    playedAmount: 35.00,
    ticketPhotoUrl: 'https://images.unsplash.com/photo-1554415707-9e44667014f8?w=500&auto=format&fit=crop&q=80',
    status: 'verificado',
    ocrDetectedNumbers: 'TICKET #776152 - NO GANADOR - MONTO: 35.00 BS',
    notes: 'Ticket no premiado verificado con la banca.'
  },
  {
    id: 'loser_2',
    userId: 'usr_jose_perez',
    userName: 'José Pérez',
    cedula: '15.678.901',
    date: '01/10/2026',
    lotteryName: 'Caracas Tripleta',
    ticketNumber: 'TK-443901',
    playedAmount: 50.00,
    ticketPhotoUrl: 'https://images.unsplash.com/photo-1554415707-9e44667014f8?w=500&auto=format&fit=crop&q=80',
    status: 'verificado',
    ocrDetectedNumbers: 'TICKET #443901 - NO GANADOR - MONTO: 50.00 BS',
    notes: 'Participa por el bono de reintegro semanal.'
  }
];
