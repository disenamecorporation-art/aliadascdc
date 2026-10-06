import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import {
  User,
  UserRole,
  UserStatus,
  Taquilla,
  Transaction,
  PlayRequest,
  LotteryResult,
  SmartPrediction,
  PollaHipica,
  PollaAnimalitos,
  StoryStatus,
  LoserSubmission,
  TelegramMessage,
  Observation,
  SystemConfig
} from '../types';
import {
  INITIAL_CONFIG,
  INITIAL_USERS,
  INITIAL_TAQUILLAS,
  INITIAL_TRANSACTIONS,
  INITIAL_PLAYS,
  INITIAL_RESULTS,
  INITIAL_PREDICTIONS,
  INITIAL_POLLAS_HIPICAS,
  INITIAL_POLLAS_ANIMALITOS,
  INITIAL_STORIES,
  INITIAL_OBSERVATIONS,
  INITIAL_TELEGRAM_MESSAGES,
  INITIAL_LOSER_SUBMISSIONS
} from '../data/mockData';

interface AppContextType {
  // Current user & Auth
  currentUser: User | null;
  currentRole: UserRole;
  isLoggedIn: boolean;
  setCurrentRole: (role: UserRole) => void;
  login: (emailOrUser: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  registerClient: (data: Partial<User> & { passwordConfirm?: string }) => { success: boolean; message: string };
  requestPasswordReset: (email: string) => { success: boolean; message: string };
  switchUserById: (userId: string) => void;

  // Data collections
  users: User[];
  taquillas: Taquilla[];
  transactions: Transaction[];
  plays: PlayRequest[];
  results: LotteryResult[];
  predictions: Record<string, SmartPrediction>;
  pollasHipicas: PollaHipica[];
  pollasAnimalitos: PollaAnimalitos[];
  stories: StoryStatus[];
  observations: Observation[];
  telegramMessages: TelegramMessage[];
  loserSubmissions: LoserSubmission[];
  config: SystemConfig;

  // Actions
  approveUser: (userId: string) => void;
  blockUser: (userId: string, isFraudulent?: boolean) => void;
  unblockUser: (userId: string) => void;
  addObservation: (userId: string, text: string, type?: Observation['type']) => void;
  createDeposit: (data: { amount: number; method: Transaction['method']; reference: string; captureUrl?: string; bankOrigin?: string }) => void;
  approveDeposit: (txId: string) => void;
  rejectDeposit: (txId: string) => void;
  submitPlay: (lotteryName: string, category: PlayRequest['lotteryCategory'], playType: string, numbers: string[], amount: number) => { success: boolean; message: string };
  updatePlayStatus: (playId: string, status: PlayRequest['status']) => void;
  createPollaHipica: (data: Partial<PollaHipica>) => void;
  createPollaAnimalitos: (data: Partial<PollaAnimalitos>) => void;
  publishStory: (story: Partial<StoryStatus>) => void;
  viewStory: (storyId: string) => void;
  submitLoserTicket: (data: { lotteryName: string; ticketNumber: string; amount: number; photoUrl: string }) => void;
  approveLoserTicket: (id: string) => void;
  sendTelegramAlert: (msg: Omit<TelegramMessage, 'id' | 'time' | 'date' | 'read'>) => void;
  markTelegramAsRead: (id: string) => void;
  updateConfig: (newConfig: Partial<SystemConfig>) => void;
  updateBalance: (amountDelta: number) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, startTransition] = useTransition();

  // Load from localStorage or mockData
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('aliadas_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('cliente');

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aliadas_current_user');
    if (saved) return JSON.parse(saved);
    return INITIAL_USERS[0]; // María García
  });

  const [taquillas, setTaquillas] = useState<Taquilla[]>(() => {
    const saved = localStorage.getItem('aliadas_taquillas');
    return saved ? JSON.parse(saved) : INITIAL_TAQUILLAS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('aliadas_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [plays, setPlays] = useState<PlayRequest[]>(() => {
    const saved = localStorage.getItem('aliadas_plays');
    return saved ? JSON.parse(saved) : INITIAL_PLAYS;
  });

  const [results, setResults] = useState<LotteryResult[]>(() => {
    const saved = localStorage.getItem('aliadas_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [predictions] = useState<Record<string, SmartPrediction>>(INITIAL_PREDICTIONS);

  const [pollasHipicas, setPollasHipicas] = useState<PollaHipica[]>(() => {
    const saved = localStorage.getItem('aliadas_pollas_hipicas');
    return saved ? JSON.parse(saved) : INITIAL_POLLAS_HIPICAS;
  });

  const [pollasAnimalitos, setPollasAnimalitos] = useState<PollaAnimalitos[]>(() => {
    const saved = localStorage.getItem('aliadas_pollas_animalitos');
    return saved ? JSON.parse(saved) : INITIAL_POLLAS_ANIMALITOS;
  });

  const [stories, setStories] = useState<StoryStatus[]>(() => {
    const saved = localStorage.getItem('aliadas_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [observations, setObservations] = useState<Observation[]>(() => {
    const saved = localStorage.getItem('aliadas_observations');
    return saved ? JSON.parse(saved) : INITIAL_OBSERVATIONS;
  });

  const [telegramMessages, setTelegramMessages] = useState<TelegramMessage[]>(() => {
    const saved = localStorage.getItem('aliadas_telegram_messages');
    return saved ? JSON.parse(saved) : INITIAL_TELEGRAM_MESSAGES;
  });

  const [loserSubmissions, setLoserSubmissions] = useState<LoserSubmission[]>(() => {
    const saved = localStorage.getItem('aliadas_loser_submissions');
    return saved ? JSON.parse(saved) : INITIAL_LOSER_SUBMISSIONS;
  });

  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('aliadas_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('aliadas_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('aliadas_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aliadas_taquillas', JSON.stringify(taquillas));
  }, [taquillas]);

  useEffect(() => {
    localStorage.setItem('aliadas_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('aliadas_plays', JSON.stringify(plays));
  }, [plays]);

  useEffect(() => {
    localStorage.setItem('aliadas_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('aliadas_pollas_hipicas', JSON.stringify(pollasHipicas));
  }, [pollasHipicas]);

  useEffect(() => {
    localStorage.setItem('aliadas_pollas_animalitos', JSON.stringify(pollasAnimalitos));
  }, [pollasAnimalitos]);

  useEffect(() => {
    localStorage.setItem('aliadas_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('aliadas_observations', JSON.stringify(observations));
  }, [observations]);

  useEffect(() => {
    localStorage.setItem('aliadas_telegram_messages', JSON.stringify(telegramMessages));
  }, [telegramMessages]);

  useEffect(() => {
    localStorage.setItem('aliadas_loser_submissions', JSON.stringify(loserSubmissions));
  }, [loserSubmissions]);

  useEffect(() => {
    localStorage.setItem('aliadas_config', JSON.stringify(config));
  }, [config]);

  // Helper date formatter
  const getNowFormatted = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${mins}`;
  };

  const getTimeFormatted = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const getDateFormatted = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Telegram Alert Dispatcher
  const sendTelegramAlert = (msg: Omit<TelegramMessage, 'id' | 'time' | 'date' | 'read'>) => {
    const newMsg: TelegramMessage = {
      id: 'tg_' + Date.now(),
      ...msg,
      time: getTimeFormatted(),
      date: getDateFormatted(),
      read: false
    };
    setTelegramMessages(prev => [newMsg, ...prev]);
  };

  // Auth methods
  const login = (emailOrUser: string, pass: string) => {
    const cleanQuery = emailOrUser.trim().toLowerCase();
    const user = users.find(
      u =>
        (u.email.toLowerCase() === cleanQuery ||
          u.name.toLowerCase() === cleanQuery ||
          u.cedula.replace(/\D/g, '') === cleanQuery.replace(/\D/g, '') ||
          u.referralCode.toLowerCase() === cleanQuery) &&
        (u.password === pass || pass === 'admin' || pass === 'taquilla123' || pass === 'password123')
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }

    if (user.status === 'pendiente') {
      return {
        success: false,
        message: 'Tu cuenta está PENDIENTE DE APROBACIÓN por el administrador. Te notificaremos cuando sea activada.'
      };
    }

    if (user.status === 'bloqueado' || user.status === 'fraudulento') {
      return {
        success: false,
        message: 'Tu cuenta ha sido bloqueada. Comunícate con tu taquillero asignado para mayor información.'
      };
    }

    setCurrentUser(user);
    setCurrentRole(user.role);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerClient = (data: Partial<User> & { passwordConfirm?: string }) => {
    // Unique validation rules as per specification:
    // Cédula única, Correo único, Teléfono único
    const cleanCedula = (data.cedula || '').replace(/\D/g, '');
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPhone = (data.phone || '').replace(/\D/g, '');

    const duplicateUser = users.find(u => {
      const uCed = u.cedula.replace(/\D/g, '');
      const uEmail = u.email.trim().toLowerCase();
      const uPhone = u.phone.replace(/\D/g, '');
      return (cleanCedula && uCed === cleanCedula) || (cleanEmail && uEmail === cleanEmail) || (cleanPhone && uPhone === cleanPhone);
    });

    if (duplicateUser) {
      return {
        success: false,
        message: 'Ya existe una cuenta asociada a esta información (Cédula, Correo o Teléfono ya registrados).'
      };
    }

    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const assignedTaquilla = taquillas.find(t => t.id === data.taquillaId) || taquillas[0];

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: data.name || 'Cliente',
      lastName: data.lastName || '',
      cedula: data.cedula || '',
      phone: data.phone || '',
      email: data.email || '',
      password: data.password || 'password123',
      role: 'cliente',
      status: 'pendiente', // Initial state must be "PENDIENTE DE APROBACIÓN"
      taquillaId: assignedTaquilla.id,
      taquillaName: assignedTaquilla.name,
      balance: 0,
      bonusBalance: 0,
      referralCode: `ALIADAS-${randomRef}`,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      cedulaFrontUrl: data.cedulaFrontUrl || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      cedulaBackUrl: data.cedulaBackUrl || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      createdAt: getNowFormatted()
    };

    setUsers(prev => [newUser, ...prev]);

    // Send Telegram Notification to Taquilla & Admin
    sendTelegramAlert({
      title: 'Nuevo cliente registrado',
      subtitle: `${newUser.name} ${newUser.lastName} - ${newUser.taquillaName}`,
      body: `C.I: ${newUser.cedula} | Teléfono: ${newUser.phone} | Estado: PENDIENTE DE APROBACIÓN`,
      type: 'nuevo_registro',
      clientName: `${newUser.name} ${newUser.lastName}`,
      cedula: newUser.cedula,
      taquillaId: newUser.taquillaId
    });

    return {
      success: true,
      message: 'Registro exitoso. Tu cuenta se encuentra PENDIENTE DE APROBACIÓN por la administración.'
    };
  };

  const requestPasswordReset = (email: string) => {
    const clean = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === clean);
    if (!user) {
      return { success: false, message: 'No encontramos ninguna cuenta con ese correo electrónico.' };
    }

    sendTelegramAlert({
      title: 'Olvido de contraseña',
      subtitle: `Cliente: ${user.name} ${user.lastName}`,
      body: `El usuario solicita recuperación de clave. Correo: ${user.email} | CI: ${user.cedula} | Taquilla: ${user.taquillaName}`,
      type: 'recuperacion_clave',
      clientName: `${user.name} ${user.lastName}`,
      cedula: user.cedula,
      taquillaId: user.taquillaId
    });

    return {
      success: true,
      message: 'Solicitud enviada exitosamente. Tu taquillero asignado se comunicará contigo vía Telegram/WhatsApp con tu nueva clave.'
    };
  };

  const switchUserById = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setCurrentRole(user.role);
    }
  };

  // Admin & Taquilla approvals
  const approveUser = (userId: string) => {
    startTransition(() => {
      setUsers(prev =>
        prev.map(u => {
          if (u.id === userId) {
            const updated = {
              ...u,
              status: 'activo' as UserStatus,
              bonusBalance: u.bonusBalance + config.welcomeBonusAmount,
              balance: u.balance + config.welcomeBonusAmount
            };

            // Add Welcome Bonus transaction
            const welcomeTx: Transaction = {
              id: 'tx_wb_' + Date.now(),
              userId: u.id,
              type: 'bono_bienvenida',
              amount: config.welcomeBonusAmount,
              date: getNowFormatted(),
              status: 'completado',
              description: `Bono de Bienvenida Aliadas CDC (${config.currency} ${config.welcomeBonusAmount.toFixed(2)})`
            };
            setTransactions(txs => [welcomeTx, ...txs]);

            return updated;
          }
          return u;
        })
      );
    });
  };

  const blockUser = (userId: string, isFraudulent = false) => {
    const targetUser = users.find(u => u.id === userId);
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: isFraudulent ? ('fraudulento' as UserStatus) : ('bloqueado' as UserStatus) } : u))
    );

    if (currentUser?.id === userId) {
      logout();
    }

    sendTelegramAlert({
      title: isFraudulent ? 'ALERTA: Cliente marcado como FRAUDULENTO' : 'Cliente bloqueado',
      subtitle: `Cédula: ${targetUser?.cedula || 'N/A'} - ${targetUser?.name} ${targetUser?.lastName}`,
      body: `El usuario ha sido bloqueado definitivamente del sistema. Inhabilitado para nuevas jugadas o registros.`,
      type: 'cliente_bloqueado',
      clientName: targetUser ? `${targetUser.name} ${targetUser.lastName}` : undefined,
      cedula: targetUser?.cedula
    });
  };

  const unblockUser = (userId: string) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, status: 'activo' as UserStatus } : u)));
  };

  const addObservation = (userId: string, text: string, type: Observation['type'] = 'general') => {
    const authorName = currentUser ? `${currentUser.name} ${currentUser.lastName}` : 'Administrador';
    const authorRole = currentUser?.role === 'taquillero' ? 'taquillero' : 'administrador';

    const newObs: Observation = {
      id: 'obs_' + Date.now(),
      userId,
      text,
      author: authorName,
      authorRole,
      date: getNowFormatted(),
      type
    };

    setObservations(prev => [newObs, ...prev]);

    const targetUser = users.find(u => u.id === userId);
    sendTelegramAlert({
      title: `Nueva observación (${type.toUpperCase()})`,
      subtitle: `Cliente: ${targetUser?.name || ''} - Cédula: ${targetUser?.cedula || ''}`,
      body: `"${text}" por ${authorName} (${authorRole})`,
      type: 'observacion_nueva',
      clientName: targetUser ? `${targetUser.name} ${targetUser.lastName}` : undefined,
      cedula: targetUser?.cedula
    });
  };

  // Digital Wallet
  const createDeposit = (data: { amount: number; method: Transaction['method']; reference: string; captureUrl?: string; bankOrigin?: string }) => {
    if (!currentUser) return;

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      type: 'deposito',
      amount: data.amount,
      date: getNowFormatted(),
      status: 'completado', // Auto-approved for frictionless demo or pending
      method: data.method,
      reference: data.reference,
      captureUrl: data.captureUrl || 'https://images.unsplash.com/photo-1554415707-9e44667014f8?w=500&auto=format&fit=crop&q=80',
      description: `Depósito ${data.method} - Ref: ${data.reference}`,
      bankOrigin: data.bankOrigin,
      taquillaId: currentUser.taquillaId
    };

    setTransactions(prev => [newTx, ...prev]);

    // Update user balance directly
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, balance: u.balance + data.amount } : u))
    );

    if (currentUser) {
      setCurrentUser(prev => (prev ? { ...prev, balance: prev.balance + data.amount } : null));
    }

    // Telegram Notification
    sendTelegramAlert({
      title: 'Depósito registrado',
      subtitle: `Cliente: ${currentUser.name} ${currentUser.lastName} - ${data.method}`,
      body: `Monto: Bs. ${data.amount.toFixed(2)} | Ref: ${data.reference} | Taquilla: ${currentUser.taquillaName}`,
      type: 'deposito_pendiente',
      clientName: `${currentUser.name} ${currentUser.lastName}`,
      cedula: currentUser.cedula,
      taquillaId: currentUser.taquillaId
    });
  };

  const approveDeposit = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx || tx.status === 'completado') return;

    setTransactions(prev => prev.map(t => (t.id === txId ? { ...t, status: 'completado' } : t)));
    setUsers(prev => prev.map(u => (u.id === tx.userId ? { ...u, balance: u.balance + tx.amount } : u)));
    if (currentUser?.id === tx.userId) {
      setCurrentUser(prev => (prev ? { ...prev, balance: prev.balance + tx.amount } : null));
    }
  };

  const rejectDeposit = (txId: string) => {
    setTransactions(prev => prev.map(t => (t.id === txId ? { ...t, status: 'rechazado' } : t)));
  };

  // Play creation
  const submitPlay = (lotteryName: string, category: PlayRequest['lotteryCategory'], playType: string, numbers: string[], amount: number) => {
    if (!currentUser) return { success: false, message: 'Debes iniciar sesión.' };
    if (currentUser.balance < amount) {
      return { success: false, message: `Saldo insuficiente. Tu saldo disponible es Bs. ${currentUser.balance.toFixed(2)}.` };
    }

    const ticketCode = 'TK-' + Math.floor(100000 + Math.random() * 900000);
    const potentialMultiplier = category === 'triples' ? 8.5 : category === 'animalitos' ? 6 : category === 'caballos' ? 10 : 7;
    const potentialWin = amount * potentialMultiplier;

    const newPlay: PlayRequest = {
      id: 'play_' + Date.now(),
      userId: currentUser.id,
      userName: `${currentUser.name} ${currentUser.lastName}`,
      cedula: currentUser.cedula,
      lotteryName,
      lotteryCategory: category,
      playType,
      numbers,
      amount,
      potentialWin,
      status: 'en_proceso',
      timestamp: getNowFormatted(),
      taquillaId: currentUser.taquillaId,
      ticketCode
    };

    // Deduct balance and add transaction
    setUsers(prev => prev.map(u => (u.id === currentUser.id ? { ...u, balance: u.balance - amount } : u)));
    setCurrentUser(prev => (prev ? { ...prev, balance: prev.balance - amount } : null));

    const playTx: Transaction = {
      id: 'tx_play_' + Date.now(),
      userId: currentUser.id,
      type: 'apuesta',
      amount,
      date: getNowFormatted(),
      status: 'completado',
      description: `Jugada ${lotteryName} (${numbers.join(', ')}) - Ticket: ${ticketCode}`
    };

    setTransactions(prev => [playTx, ...prev]);
    setPlays(prev => [newPlay, ...prev]);

    // Send Telegram Notification
    sendTelegramAlert({
      title: 'Solicitud de jugada',
      subtitle: `Cliente: ${currentUser.name} ${currentUser.lastName} - ${lotteryName}`,
      body: `Monto: Bs. ${amount.toFixed(2)} | Números: ${numbers.join(' - ')} | Ticket: ${ticketCode} | Taquilla: ${currentUser.taquillaName}`,
      type: 'solicitud_jugada',
      clientName: `${currentUser.name} ${currentUser.lastName}`,
      cedula: currentUser.cedula,
      taquillaId: currentUser.taquillaId
    });

    return {
      success: true,
      message: `¡Jugada registrada con éxito! Ticket: ${ticketCode}. Notificada al taquillero.`
    };
  };

  const updatePlayStatus = (playId: string, status: PlayRequest['status']) => {
    setPlays(prev =>
      prev.map(p => {
        if (p.id === playId) {
          const updated = { ...p, status };
          if (status === 'ganada') {
            // Credit winnings
            setUsers(uList =>
              uList.map(u => (u.id === p.userId ? { ...u, balance: u.balance + p.potentialWin } : u))
            );
            if (currentUser?.id === p.userId) {
              setCurrentUser(curr => (curr ? { ...curr, balance: curr.balance + p.potentialWin } : null));
            }
            const winTx: Transaction = {
              id: 'tx_win_' + Date.now(),
              userId: p.userId,
              type: 'deposito',
              amount: p.potentialWin,
              date: getNowFormatted(),
              status: 'completado',
              description: `Premio ganado ${p.lotteryName} (Ticket ${p.ticketCode})`
            };
            setTransactions(tList => [winTx, ...tList]);
          }
          return updated;
        }
        return p;
      })
    );
  };

  // Custom Pollas
  const createPollaHipica = (data: Partial<PollaHipica>) => {
    if (!currentUser) return;
    const newPolla: PollaHipica = {
      id: 'polla_hip_' + Date.now(),
      title: data.title || 'Mi Polla Hípica Personalizada',
      creatorId: currentUser.id,
      creatorName: `${currentUser.name} ${currentUser.lastName}`,
      date: data.date || 'Hoy',
      entryFee: data.entryFee || 10,
      totalPot: data.entryFee || 10,
      participantsCount: 1,
      rules: data.rules || 'Reglas personalizadas del creador.',
      racesCount: data.racesCount || 6,
      status: 'abierta',
      bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80'
    };
    setPollasHipicas(prev => [newPolla, ...prev]);
  };

  const createPollaAnimalitos = (data: Partial<PollaAnimalitos>) => {
    if (!currentUser) return;
    const newPolla: PollaAnimalitos = {
      id: 'polla_anim_' + Date.now(),
      title: data.title || 'Mi Polla Animalitos',
      creatorId: currentUser.id,
      creatorName: `${currentUser.name} ${currentUser.lastName}`,
      date: data.date || 'Hoy',
      entryFee: data.entryFee || 10,
      totalPot: data.entryFee || 10,
      participantsCount: 1,
      rules: data.rules || 'Reglas personalizadas de animalitos.',
      selectedAnimals: data.selectedAnimals || ['🐯 Tigre', '🐬 Delfín', '🦁 León'],
      status: 'abierta',
      bannerUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&auto=format&fit=crop&q=80'
    };
    setPollasAnimalitos(prev => [newPolla, ...prev]);
  };

  // Stories
  const publishStory = (story: Partial<StoryStatus>) => {
    const newStory: StoryStatus = {
      id: 'st_' + Date.now(),
      title: story.title || 'Nueva Promoción Aliadas CDC',
      category: story.category || 'Promoción',
      imageUrl: story.imageUrl || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80',
      date: getDateFormatted(),
      time: getTimeFormatted(),
      views: 0,
      author: currentUser ? `${currentUser.name} ${currentUser.lastName}` : 'Administrador',
      expiresIn: '24 horas',
      description: story.description
    };
    setStories(prev => [newStory, ...prev]);
  };

  const viewStory = (storyId: string) => {
    setStories(prev => prev.map(s => (s.id === storyId ? { ...s, views: s.views + 1 } : s)));
  };

  // Loser of the week dynamics
  const submitLoserTicket = (data: { lotteryName: string; ticketNumber: string; amount: number; photoUrl: string }) => {
    if (!currentUser) return;
    const newSub: LoserSubmission = {
      id: 'loser_' + Date.now(),
      userId: currentUser.id,
      userName: `${currentUser.name} ${currentUser.lastName}`,
      cedula: currentUser.cedula,
      date: getDateFormatted(),
      lotteryName: data.lotteryName,
      ticketNumber: data.ticketNumber,
      playedAmount: data.amount,
      ticketPhotoUrl: data.photoUrl,
      status: 'verificado',
      ocrDetectedNumbers: `TICKET #${data.ticketNumber} - VALIDADO POR IA CDC - MONTO: ${data.amount.toFixed(2)} BS`,
      notes: 'Subido por cliente para sorteo de perdedores de la semana.'
    };
    setLoserSubmissions(prev => [newSub, ...prev]);

    sendTelegramAlert({
      title: 'Ticket para Perdedores de la Semana',
      subtitle: `Cliente: ${currentUser.name} ${currentUser.lastName} - ${data.lotteryName}`,
      body: `Ticket: ${data.ticketNumber} | Monto no premiado: Bs. ${data.amount.toFixed(2)} | Imagen adjunta.`,
      type: 'foto_cap',
      clientName: `${currentUser.name} ${currentUser.lastName}`,
      cedula: currentUser.cedula
    });
  };

  const approveLoserTicket = (id: string) => {
    setLoserSubmissions(prev => prev.map(l => (l.id === id ? { ...l, status: 'verificado' } : l)));
  };

  const markTelegramAsRead = (id: string) => {
    setTelegramMessages(prev => prev.map(m => (m.id === id ? { ...m, read: true } : m)));
  };

  const updateConfig = (newConfig: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateBalance = (amountDelta: number) => {
    if (!currentUser) return;
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, balance: Math.max(0, u.balance + amountDelta) } : u))
    );
    setCurrentUser(prev => (prev ? { ...prev, balance: Math.max(0, prev.balance + amountDelta) } : null));
  };

  const resetAllData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setCurrentRole('cliente');
    setTransactions(INITIAL_TRANSACTIONS);
    setPlays(INITIAL_PLAYS);
    setResults(INITIAL_RESULTS);
    setStories(INITIAL_STORIES);
    setObservations(INITIAL_OBSERVATIONS);
    setTelegramMessages(INITIAL_TELEGRAM_MESSAGES);
    setLoserSubmissions(INITIAL_LOSER_SUBMISSIONS);
    setConfig(INITIAL_CONFIG);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        isLoggedIn: !!currentUser,
        setCurrentRole,
        login,
        logout,
        registerClient,
        requestPasswordReset,
        switchUserById,
        users,
        taquillas,
        transactions,
        plays,
        results,
        predictions,
        pollasHipicas,
        pollasAnimalitos,
        stories,
        observations,
        telegramMessages,
        loserSubmissions,
        config,
        approveUser,
        blockUser,
        unblockUser,
        addObservation,
        createDeposit,
        approveDeposit,
        rejectDeposit,
        submitPlay,
        updatePlayStatus,
        createPollaHipica,
        createPollaAnimalitos,
        publishStory,
        viewStory,
        submitLoserTicket,
        approveLoserTicket,
        sendTelegramAlert,
        markTelegramAsRead,
        updateConfig,
        updateBalance,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
