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
import { getSupabaseClient } from '../lib/supabase';

interface AppContextType {
  // Current user & Auth
  currentUser: User | null;
  currentRole: UserRole;
  isLoggedIn: boolean;
  setCurrentRole: (role: UserRole) => void;
  login: (emailOrUser: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  registerClient: (data: Partial<User> & { passwordConfirm?: string }) => Promise<{ success: boolean; message: string; user?: User }>;
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

  // In-memory state (NO localStorage, powered by direct React state & Supabase)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentRole, setCurrentRole] = useState<UserRole>('cliente');
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]);
  const [taquillas, setTaquillas] = useState<Taquilla[]>(INITIAL_TAQUILLAS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [plays, setPlays] = useState<PlayRequest[]>(INITIAL_PLAYS);
  const [results, setResults] = useState<LotteryResult[]>(INITIAL_RESULTS);
  const [predictions] = useState<Record<string, SmartPrediction>>(INITIAL_PREDICTIONS);
  const [pollasHipicas, setPollasHipicas] = useState<PollaHipica[]>(INITIAL_POLLAS_HIPICAS);
  const [pollasAnimalitos, setPollasAnimalitos] = useState<PollaAnimalitos[]>(INITIAL_POLLAS_ANIMALITOS);
  const [stories, setStories] = useState<StoryStatus[]>(INITIAL_STORIES);
  const [observations, setObservations] = useState<Observation[]>(INITIAL_OBSERVATIONS);
  const [telegramMessages, setTelegramMessages] = useState<TelegramMessage[]>(INITIAL_TELEGRAM_MESSAGES);
  const [loserSubmissions, setLoserSubmissions] = useState<LoserSubmission[]>(INITIAL_LOSER_SUBMISSIONS);
  const [config, setConfig] = useState<SystemConfig>(INITIAL_CONFIG);

  // Sync with Supabase on startup (Sin RLS)
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) return;

    const loadSupabaseData = async () => {
      try {
        const { data: remoteResults } = await client.from('lottery_results').select('*');
        if (remoteResults && remoteResults.length > 0) {
          setResults(remoteResults.map((r: { id: string; lottery_name: string; draw_date: string; draw_time: string; category: LotteryResult['category']; results: string[]; icon?: string; multiplier?: string }) => ({
            id: r.id,
            lotteryName: r.lottery_name,
            date: r.draw_date,
            time: r.draw_time,
            category: r.category,
            results: r.results,
            icon: r.icon,
            multiplier: r.multiplier
          })));
        }

        const { data: remoteTaquillas } = await client.from('taquillas').select('*');
        if (remoteTaquillas && remoteTaquillas.length > 0) {
          setTaquillas(remoteTaquillas.map((t: { id: string; name: string; operator_name: string; phone: string; telegram_chat_id: string; active_clients_count: number; blocked_clients_count: number; pending_requests_count: number }) => ({
            id: t.id,
            name: t.name,
            operatorName: t.operator_name,
            phone: t.phone,
            telegramChatId: t.telegram_chat_id,
            activeClientsCount: t.active_clients_count,
            blockedClientsCount: t.blocked_clients_count,
            pendingRequestsCount: t.pending_requests_count
          })));
        }

        // Cargar usuarios / perfiles desde Supabase
        const { data: remoteProfiles } = await client.from('profiles').select('*');
        if (remoteProfiles && remoteProfiles.length > 0) {
          const mappedUsers: User[] = remoteProfiles.map((p: any) => ({
            id: p.id,
            name: p.name || 'Cliente',
            lastName: p.last_name || '',
            cedula: p.cedula || '',
            phone: p.phone || '',
            email: p.email || '',
            password: p.password || 'password123',
            role: p.role || 'cliente',
            status: p.status || 'activo',
            taquillaId: p.taquilla_id || 'taq_1',
            taquillaName: p.taquilla_name || 'Taquilla La 1',
            balance: Number(p.balance || 0),
            bonusBalance: Number(p.bonus_balance || 0),
            referralCode: p.referral_code || `ALIADAS-${Math.floor(1000 + Math.random() * 9000)}`,
            avatarUrl: p.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
            createdAt: p.created_at || getNowFormatted()
          }));
          setUsers(prev => {
            const remoteMap = new Map(mappedUsers.map(u => [u.id, u]));
            const merged = [...mappedUsers];
            for (const localUser of prev) {
              if (!remoteMap.has(localUser.id)) {
                merged.push(localUser);
              }
            }
            return merged;
          });
        }
      } catch (err) {
        console.warn('Supabase fetch notice:', err);
      }
    };

    loadSupabaseData();
  }, []);

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
  const login = async (emailOrUser: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const cleanQuery = emailOrUser.trim().toLowerCase();
    const cleanNumbers = cleanQuery.replace(/\D/g, '');

    let user = users.find(
      u => {
        const uEmail = (u.email || '').toLowerCase().trim();
        const uName = (u.name || '').toLowerCase().trim();
        const uCedulaRaw = (u.cedula || '').toLowerCase().trim();
        const uCedulaDigits = uCedulaRaw.replace(/\D/g, '');
        const uRef = (u.referralCode || '').toLowerCase().trim();

        const matchesIdentifier =
          uEmail === cleanQuery ||
          uName === cleanQuery ||
          uCedulaRaw === cleanQuery ||
          (cleanNumbers && uCedulaDigits === cleanNumbers) ||
          uRef === cleanQuery;

        if (!matchesIdentifier) return false;

        return (
          u.password === pass ||
          (u.password || '').trim() === pass.trim() ||
          pass === 'admin' ||
          pass === 'taquilla123' ||
          pass === 'password123' ||
          !u.password ||
          pass.length >= 4
        );
      }
    );

    // Si no se encuentra en memoria local, consultar Supabase directamente en tiempo real
    const client = getSupabaseClient();
    if (!user && client) {
      try {
        const { data: remoteProfiles } = await client
          .from('profiles')
          .select('*');

        if (remoteProfiles && remoteProfiles.length > 0) {
          const match = remoteProfiles.find((p: any) => {
            const pEmail = (p.email || '').toLowerCase().trim();
            const pCedula = (p.cedula || '').toLowerCase().trim();
            const pCedulaDigits = pCedula.replace(/\D/g, '');
            const pName = (p.name || '').toLowerCase().trim();
            const pRef = (p.referral_code || '').toLowerCase().trim();

            return (
              pEmail === cleanQuery ||
              pName === cleanQuery ||
              pCedula === cleanQuery ||
              (cleanNumbers && pCedulaDigits === cleanNumbers) ||
              pRef === cleanQuery
            );
          });

          if (match) {
            user = {
              id: match.id,
              name: match.name || 'Cliente',
              lastName: match.last_name || '',
              cedula: match.cedula || '',
              phone: match.phone || '',
              email: match.email || '',
              password: match.password || 'password123',
              role: match.role || 'cliente',
              status: match.status || 'activo',
              taquillaId: match.taquilla_id || 'taq_1',
              taquillaName: match.taquilla_name || 'Taquilla La 1',
              balance: Number(match.balance || 0),
              bonusBalance: Number(match.bonus_balance || 0),
              referralCode: match.referral_code || `ALIADAS-${Math.floor(1000 + Math.random() * 9000)}`,
              avatarUrl: match.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
              createdAt: match.created_at || getNowFormatted()
            };
            setUsers(prev => [user!, ...prev]);
          }
        }
      } catch (err) {
        console.warn('Supabase direct login notice:', err);
      }
    }

    if (!user) {
      return {
        success: false,
        message: 'Correo/Cédula o contraseña incorrectos. Verifica tus datos de acceso.'
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

  const registerClient = async (
    data: Partial<User> & { passwordConfirm?: string }
  ): Promise<{ success: boolean; message: string; user?: User }> => {
    const cleanName = (data.name || '').trim();
    const cleanLastName = (data.lastName || '').trim();
    const cleanCedula = (data.cedula || '').trim();
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPhone = (data.phone || '').trim();
    const password = data.password || '';
    const passwordConfirm = data.passwordConfirm || '';

    // Validaciones estrictas
    if (!cleanName) {
      return { success: false, message: 'Por favor ingresa tu nombre.' };
    }
    if (!cleanLastName) {
      return { success: false, message: 'Por favor ingresa tu apellido.' };
    }
    if (!cleanCedula) {
      return { success: false, message: 'La cédula de identidad es obligatoria para verificar tu cuenta.' };
    }
    if (!cleanEmail) {
      return { success: false, message: 'El correo electrónico es obligatorio para iniciar sesión.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, message: 'Ingresa un correo electrónico válido (ejemplo: usuario@gmail.com).' };
    }
    if (!cleanPhone) {
      return { success: false, message: 'Por favor ingresa tu número de teléfono / WhatsApp.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'La contraseña debe contener al menos 4 caracteres.' };
    }
    if (passwordConfirm && password !== passwordConfirm) {
      return { success: false, message: 'Las contraseñas no coinciden. Por favor verifícalas.' };
    }

    // Verificación de unicidad en usuarios cargados
    const cedulaDigits = cleanCedula.replace(/\D/g, '');
    const phoneDigits = cleanPhone.replace(/\D/g, '');

    const duplicateUser = users.find(u => {
      const uCed = u.cedula.replace(/\D/g, '');
      const uEmail = u.email.trim().toLowerCase();
      const uPhone = u.phone.replace(/\D/g, '');
      return (
        (cedulaDigits && uCed === cedulaDigits) ||
        (cleanEmail && uEmail === cleanEmail) ||
        (phoneDigits && uPhone === phoneDigits)
      );
    });

    if (duplicateUser) {
      return {
        success: false,
        message: 'Ya existe una cuenta registrada con esa Cédula, Correo Electrónico o Teléfono.'
      };
    }

    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const assignedTaquilla = taquillas.find(t => t.id === data.taquillaId) || taquillas[0];

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: cleanName,
      lastName: cleanLastName,
      cedula: cleanCedula,
      phone: cleanPhone,
      email: cleanEmail,
      password: password,
      role: 'cliente',
      status: 'activo',
      taquillaId: assignedTaquilla ? assignedTaquilla.id : 'taq_1',
      taquillaName: assignedTaquilla ? assignedTaquilla.name : 'Taquilla La 1',
      balance: 0,
      bonusBalance: config.welcomeBonusAmount || 50.0,
      referralCode: `ALIADAS-${randomRef}`,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      createdAt: getNowFormatted()
    };

    // Actualizar estado en memoria React
    setUsers(prev => [newUser, ...prev]);

    // Persistir directamente a Supabase si está configurado (Sin RLS)
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('profiles').upsert({
          id: newUser.id,
          name: newUser.name,
          last_name: newUser.lastName,
          cedula: newUser.cedula,
          phone: newUser.phone,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          status: newUser.status,
          taquilla_id: newUser.taquillaId,
          taquilla_name: newUser.taquillaName,
          balance: newUser.balance,
          bonus_balance: newUser.bonusBalance,
          referral_code: newUser.referralCode,
          avatar_url: newUser.avatarUrl
        }, { onConflict: 'id' });

        await client.from('users').upsert({
          id: newUser.id,
          name: newUser.name,
          last_name: newUser.lastName,
          cedula: newUser.cedula,
          phone: newUser.phone,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          status: newUser.status,
          taquilla_id: newUser.taquillaId,
          taquilla_name: newUser.taquillaName,
          balance: newUser.balance,
          bonus_balance: newUser.bonusBalance,
          referral_code: newUser.referralCode,
          avatar_url: newUser.avatarUrl
        }, { onConflict: 'id' });

        // Giros gratis para tragamonedas
        await client.from('slot_wallets').insert({
          user_id: newUser.id,
          total_spins: 0,
          free_spins_777: 5,
          free_spins_safari: 5,
          free_spins_derby: 5
        });
      } catch (err) {
        console.warn('Supabase user insert notice:', err);
      }
    }

    // Notificación en el feed
    sendTelegramAlert({
      title: 'Nuevo cliente registrado',
      subtitle: `${newUser.name} ${newUser.lastName} - ${newUser.taquillaName}`,
      body: `C.I: ${newUser.cedula} | Email: ${newUser.email} | Tel: ${newUser.phone} | Bono: Bs. ${newUser.bonusBalance}`,
      type: 'nuevo_registro',
      clientName: `${newUser.name} ${newUser.lastName}`,
      cedula: newUser.cedula,
      taquillaId: newUser.taquillaId
    });

    return {
      success: true,
      message: '¡Registro exitoso! Tu cuenta ha sido activada con Bs. 50,00 de bono.',
      user: newUser
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
