import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Flame,
  Plus,
  Zap,
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  Trophy,
  ChevronLeft,
  CheckCircle2,
  Trees,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateWhatsAppLink, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface AnimalSymbolDef {
  id: string;
  char: string;
  name: string;
  payout3: number;
  payout2: number;
  isScatter?: boolean;
  isWild?: boolean;
}

const ANIMAL_SYMBOLS: AnimalSymbolDef[] = [
  { id: 'lion', char: '🦁', name: 'León Rey', payout3: 120, payout2: 12 },
  { id: 'tiger', char: '🐯', name: 'Tigre Salvaje', payout3: 60, payout2: 8, isWild: true },
  { id: 'elephant', char: '🐘', name: 'Elefante Real', payout3: 40, payout2: 5 },
  { id: 'paw', char: '🐾', name: 'Huella Dorada', payout3: 30, payout2: 3, isScatter: true },
  { id: 'dolphin', char: '🐬', name: 'Delfín Suerte', payout3: 25, payout2: 3 },
  { id: 'eagle', char: '🦅', name: 'Águila Imperial', payout3: 18, payout2: 2 },
  { id: 'monkey', char: '🐒', name: 'Mono Jugador', payout3: 12, payout2: 1 },
  { id: 'palm', char: '🌴', name: 'Palmera Selva', payout3: 8, payout2: 1 }
];

const ANIMAL_POOL = [
  'palm', 'palm', 'palm', 'palm',
  'monkey', 'monkey', 'monkey',
  'eagle', 'eagle', 'eagle',
  'dolphin', 'dolphin',
  'paw', 'paw',
  'elephant', 'elephant',
  'tiger',
  'lion'
];

interface AnimalitosSlotScreenProps {
  onBack: () => void;
  onNavigateDeposit: () => void;
}

export const AnimalitosSlotScreen: React.FC<AnimalitosSlotScreenProps> = ({
  onBack,
  onNavigateDeposit
}) => {
  const { currentUser, updateBalance } = useApp();

  const [coins, setCoins] = useState<number>(300);
  const [freeSpins, setFreeSpins] = useState<number>(4);

  const [freeSpinMultiplier, setFreeSpinMultiplier] = useState<number>(4);
  const betOptions = [5, 10, 25, 50, 100];
  const [bet, setBet] = useState<number>(10);

  const [reel1, setReel1] = useState<AnimalSymbolDef>(ANIMAL_SYMBOLS[0]);
  const [reel2, setReel2] = useState<AnimalSymbolDef>(ANIMAL_SYMBOLS[1]);
  const [reel3, setReel3] = useState<AnimalSymbolDef>(ANIMAL_SYMBOLS[2]);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinningReel1, setSpinningReel1] = useState<boolean>(false);
  const [spinningReel2, setSpinningReel2] = useState<boolean>(false);
  const [spinningReel3, setSpinningReel3] = useState<boolean>(false);

  const [winAmount, setWinAmount] = useState<number>(0);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [isJackpot, setIsJackpot] = useState<boolean>(false);
  const [showPaytable, setShowPaytable] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);
  const [autoSpinCount, setAutoSpinCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const autoSpinRef = useRef<number>(0);
  autoSpinRef.current = autoSpinCount;

  const playSound = (type: 'spin' | 'win' | 'jackpot' | 'scatter') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'spin') {
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(780, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'jackpot' || type === 'scatter') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(587, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio context catch
    }
  };

  const getRandomSymbol = (): AnimalSymbolDef => {
    const randomId = ANIMAL_POOL[Math.floor(Math.random() * ANIMAL_POOL.length)];
    return ANIMAL_SYMBOLS.find(s => s.id === randomId) || ANIMAL_SYMBOLS[0];
  };

  const handleSpin = () => {
    if (isSpinning) return;

    const usingFreeSpin = freeSpins > 0;
    if (!usingFreeSpin && coins < bet) {
      setShowBuyModal(true);
      return;
    }

    if (usingFreeSpin) {
      setFreeSpins(prev => prev - 1);
    } else {
      setCoins(prev => prev - bet);
    }

    setWinAmount(0);
    setWinMessage(null);
    setIsJackpot(false);
    setIsSpinning(true);
    setSpinningReel1(true);
    setSpinningReel2(true);
    setSpinningReel3(true);

    playSound('spin');

    const final1 = getRandomSymbol();
    const final2 = getRandomSymbol();
    const final3 = getRandomSymbol();

    setTimeout(() => {
      setReel1(final1);
      setSpinningReel1(false);
      playSound('spin');
    }, 600);

    setTimeout(() => {
      setReel2(final2);
      setSpinningReel2(false);
      playSound('spin');
    }, 1100);

    setTimeout(() => {
      setReel3(final3);
      setSpinningReel3(false);
      setIsSpinning(false);
      evaluateOutcome(final1, final2, final3, usingFreeSpin);
    }, 1600);
  };

  const evaluateOutcome = (s1: AnimalSymbolDef, s2: AnimalSymbolDef, s3: AnimalSymbolDef, wasFreeSpin: boolean) => {
    const multiplier = wasFreeSpin ? freeSpinMultiplier : 1;
    let payout = 0;
    let message = '';
    let isJackpotWin = false;

    const scatterCount = [s1, s2, s3].filter(s => s.isScatter).length;

    if (scatterCount === 3) {
      setFreeSpins(prev => prev + 10);
      setFreeSpinMultiplier(4);
      setWinMessage('¡3 HUELLAS! 🐾 10 GIROS GRATIS X4');
      playSound('scatter');
      payout = bet * s1.payout3 * multiplier;
    } else if (scatterCount === 2) {
      setFreeSpins(prev => prev + 4);
      setWinMessage('¡2 HUELLAS! 🐾 +4 Giros Safari');
      playSound('scatter');
      payout = bet * 3 * multiplier;
    } else if (s1.id === s2.id && s2.id === s3.id) {
      payout = bet * s1.payout3 * multiplier;
      if (s1.id === 'lion') {
        message = '🦁 ¡RUGIDO DE JACKPOT! ¡REY DE LA SELVA! 🦁';
        isJackpotWin = true;
      } else if (s1.id === 'tiger') {
        message = '🐯 ¡SUPER PREMIO TIGRE SALVAJE! 🐯';
      } else {
        message = `¡TRIPLE ${s1.name.toUpperCase()}! +${payout} Monedas`;
      }
    } else if (s1.id === s2.id || s2.id === s3.id || s1.id === s3.id) {
      const matchingSym = s1.id === s2.id ? s1 : (s2.id === s3.id ? s2 : s1);
      payout = bet * matchingSym.payout2 * multiplier;
      message = `¡Par de ${matchingSym.name}! +${payout} Monedas`;
    } else if (s1.isWild || s2.isWild || s3.isWild) {
      payout = Math.floor(bet * 2 * multiplier);
      message = `🐯 ¡Comodín Tigre Activo! +${payout} Monedas`;
    }

    if (payout > 0) {
      setCoins(prev => prev + payout);
      setWinAmount(payout);
      setWinMessage(message);
      setIsJackpot(isJackpotWin);

      if (isJackpotWin) playSound('jackpot');
      else playSound('win');
    }

    if (autoSpinRef.current > 0) {
      setTimeout(() => {
        setAutoSpinCount(prev => (prev <= 1 ? 0 : prev - 1));
        handleSpin();
      }, 1200);
    }
  };

  const handleBuyPack = (pack: { name: string; coins: number; spins: number; priceBs: number }) => {
    if (!currentUser) return;
    if (currentUser.balance < pack.priceBs) {
      setPurchaseSuccess(`Saldo insuficiente en Billetera (Bs. ${currentUser.balance.toFixed(2)}).`);
      return;
    }

    updateBalance(-pack.priceBs);
    setCoins(prev => prev + pack.coins);
    setFreeSpins(prev => prev + pack.spins);
    setPurchaseSuccess(`¡Compraste ${pack.name}! +${pack.coins} Monedas ${pack.spins > 0 ? `y +${pack.spins} Giros Safari` : ''}`);

    setTimeout(() => {
      setPurchaseSuccess(null);
      setShowBuyModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none relative overflow-x-hidden font-sans">
      {/* Jungle Green Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#06331a] via-[#0d592e] to-[#06331a] border-b border-emerald-400/40 px-3.5 py-2.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🦁</span>
            <div>
              <h1 className="text-xs font-black text-emerald-300 tracking-wider uppercase font-heading">
                ANIMALITOS SAFARI SLOT
              </h1>
              <p className="text-[9px] text-emerald-200">Selva & Multiplicador Salvaje</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={generateWhatsAppLink({
              tipo: 'Animalitos Safari Slot',
              montoBs: 30,
              detalle: 'Recarga rápida de monedas para Animalitos Safari Slot',
              clienteNombre: currentUser ? `${currentUser.name} ${currentUser.lastName}` : 'Cliente Aliadas',
              cedula: currentUser?.cedula || 'N/A',
              taquilla: currentUser?.taquillaName || 'Taquilla La 1'
            })}
            target="_blank"
            rel="noopener noreferrer"
            title={`Atención WhatsApp ${WHATSAPP_PHONE_FORMATTED}`}
            className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xs shadow-md active:scale-95 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
          </a>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white text-xs"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
          </button>

          <button
            onClick={() => setShowPaytable(true)}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 hover:text-white text-xs font-bold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Economy Bar */}
      <div className="bg-slate-900/90 border-b border-emerald-900/60 px-3.5 py-2 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2 bg-black/50 border border-emerald-500/40 px-3 py-1.5 rounded-xl shadow-inner">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
            🪙
          </div>
          <div>
            <span className="text-[9px] text-emerald-200/80 block leading-tight font-medium">Mis Monedas</span>
            <span className="text-xs font-black text-emerald-300 font-mono tracking-tight">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
          freeSpins > 0
            ? 'bg-gradient-to-r from-emerald-600/40 to-amber-600/40 border-emerald-400 shadow-md shadow-emerald-900/30 animate-pulse'
            : 'bg-black/30 border-slate-700 text-slate-400'
        }`}>
          <span className="text-sm">🐾</span>
          <div>
            <span className="text-[9px] text-emerald-200 block leading-tight font-bold">Giros Safari</span>
            <span className="text-xs font-black text-white font-mono">
              {freeSpins} SPINS
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowBuyModal(true)}
          className="px-2.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-[11px] rounded-xl flex items-center gap-1 shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Comprar</span>
        </button>
      </div>

      {/* Main Reels Area */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-3 z-10 max-w-sm mx-auto w-full">
        <div className="w-full text-center mb-3">
          <AnimatePresence mode="wait">
            {freeSpins > 0 ? (
              <motion.div
                key="safari-free-mode"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 border-2 border-amber-300 p-2 rounded-2xl shadow-xl flex items-center justify-between px-3"
              >
                <div className="flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    SAFARI FREE SPINS
                  </span>
                </div>
                <span className="text-xs font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono">
                  MULTIPLICADOR x{freeSpinMultiplier}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="safari-jackpot-banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-[#0d592e]/80 via-[#157a41]/90 to-[#0d592e]/80 border border-emerald-400/50 py-1.5 px-3 rounded-2xl flex items-center justify-between shadow-md"
              >
                <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> JACKPOT LEÓN REY
                </span>
                <span className="text-xs font-black text-amber-300 font-mono tracking-wider animate-pulse">
                  {(bet * 120).toLocaleString()} MONEDAS
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Safari Frame */}
        <div className="w-full bg-gradient-to-b from-[#0d592e] via-[#06331a] to-[#031c0e] p-3 rounded-3xl border-4 border-emerald-400 shadow-2xl relative">
          <div className="bg-slate-950 rounded-2xl p-2.5 border-2 border-emerald-800 shadow-inner grid grid-cols-3 gap-2 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-emerald-400/40 z-20 pointer-events-none" />

            <SafariReelCell symbol={reel1} isSpinning={spinningReel1} />
            <SafariReelCell symbol={reel2} isSpinning={spinningReel2} />
            <SafariReelCell symbol={reel3} isSpinning={spinningReel3} />
          </div>

          <div className="mt-3 bg-black/80 border border-emerald-500/50 rounded-xl p-2 min-h-[44px] flex items-center justify-center text-center">
            {winMessage ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-0.5">
                <p className={`text-xs font-black ${isJackpot ? 'text-amber-300 text-sm animate-bounce' : 'text-emerald-300'}`}>
                  {winMessage}
                </p>
                {winAmount > 0 && (
                  <p className="text-[11px] font-black text-amber-400 font-mono">
                    + {winAmount} MONEDAS
                  </p>
                )}
              </motion.div>
            ) : isSpinning ? (
              <p className="text-xs font-bold text-emerald-300 animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                GIRANDO LA SELVA...
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 font-medium">
                {freeSpins > 0 ? '¡Tienes Giros Safari! Toca GIRAR' : 'Elige tu apuesta y gira la selva'}
              </p>
            )}
          </div>
        </div>

        {/* Bet Selector */}
        <div className="w-full mt-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold pl-1">Apuesta:</span>
            <div className="flex items-center gap-1">
              {betOptions.map(opt => (
                <button
                  key={opt}
                  disabled={isSpinning || freeSpins > 0}
                  onClick={() => setBet(opt)}
                  className={`px-2 py-1 rounded-lg text-xs font-black font-mono transition-all ${
                    bet === opt
                      ? 'bg-emerald-400 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={isSpinning || freeSpins > 0}
            onClick={() => setBet(100)}
            className="px-2.5 py-1 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 border border-emerald-400/40 rounded-lg text-[10px] font-black uppercase"
          >
            Max
          </button>
        </div>

        {/* Controls */}
        <div className="w-full mt-3 grid grid-cols-4 gap-2">
          <button
            disabled={isSpinning}
            onClick={() => {
              if (autoSpinCount > 0) setAutoSpinCount(0);
              else {
                setAutoSpinCount(10);
                handleSpin();
              }
            }}
            className={`rounded-2xl p-2 flex flex-col items-center justify-center text-center border transition-all ${
              autoSpinCount > 0
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">
              {autoSpinCount > 0 ? `Auto (${autoSpinCount})` : 'Auto Spin'}
            </span>
          </button>

          <button
            disabled={isSpinning}
            onClick={handleSpin}
            className={`col-span-3 py-3.5 px-4 rounded-2xl font-black text-base tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 border-2 ${
              freeSpins > 0
                ? 'bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 border-yellow-300 text-slate-950 shadow-emerald-900/60 animate-pulse'
                : isSpinning
                ? 'bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 border-emerald-100 text-slate-950 shadow-emerald-950/60 hover:brightness-110'
            }`}
          >
            <Zap className="w-5 h-5 text-slate-950" />
            <span>
              {isSpinning
                ? 'GIRANDO...'
                : freeSpins > 0
                ? `GIRO SAFARI (${freeSpins})`
                : `GIRAR (${bet} 🪙)`}
            </span>
          </button>
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs p-3">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-sm bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🦁</span>
                <div>
                  <h3 className="text-sm font-black text-white font-heading">
                    Tienda Safari Animalitos
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Saldo en Billetera: Bs. {currentUser?.balance.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBuyModal(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {purchaseSuccess && (
              <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{purchaseSuccess}</span>
              </div>
            )}

            {/* Direct WhatsApp Purchase Banner */}
            <div className="bg-[#25D366]/15 border border-[#25D366]/40 p-2.5 rounded-2xl flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-black text-[#25D366] block leading-tight">Venta Directa por WhatsApp</span>
                  <span className="text-[10px] text-slate-300 truncate block">Atención y activación: {WHATSAPP_PHONE_FORMATTED}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'p1', name: 'Pack Explorador', coins: 60, spins: 1, priceBs: 12.00, color: 'border-slate-700 bg-slate-800/60' },
                { id: 'p2', name: 'Pack Safari Salvaje', coins: 180, spins: 4, priceBs: 30.00, color: 'border-emerald-400 bg-emerald-950/30' },
                { id: 'p3', name: 'Pack Rey León', coins: 500, spins: 12, priceBs: 75.00, color: 'border-amber-400 bg-amber-950/30' }
              ].map(pack => (
                <div key={pack.id} className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${pack.color}`}>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-white">{pack.name}</h4>
                    <p className="text-xs font-bold text-emerald-300 font-mono">+{pack.coins} 🪙 Monedas</p>
                    <p className="text-[11px] font-bold text-amber-300">+{pack.spins} Giros Safari</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => handleBuyPack(pack)}
                      className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-[10px] rounded-xl shadow-md text-center"
                    >
                      Billetera (Bs. {pack.priceBs.toFixed(2)})
                    </button>
                    <a
                      href={generateWhatsAppLink({
                        tipo: 'Animalitos Safari Slot',
                        montoBs: pack.priceBs,
                        detalle: `${pack.name} - ${pack.coins} Monedas + ${pack.spins} Giros Safari`,
                        clienteNombre: currentUser ? `${currentUser.name} ${currentUser.lastName}` : 'Cliente Aliadas',
                        cedula: currentUser?.cedula || 'N/A',
                        taquilla: currentUser?.taquillaName || 'Taquilla La 1'
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-[10px] rounded-xl flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-center no-underline"
                    >
                      <MessageCircle className="w-3 h-3 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  onNavigateDeposit();
                }}
                className="text-xs text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Recargar saldo en Billetera</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Paytable Modal */}
      {showPaytable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-black text-emerald-300 font-heading uppercase flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-400" /> Tabla de Premios Safari
              </h3>
              <button
                onClick={() => setShowPaytable(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {ANIMAL_SYMBOLS.map(sym => (
                <div
                  key={sym.id}
                  className="bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between border border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sym.char}</span>
                    <span className="font-bold text-white">{sym.name}</span>
                  </div>
                  <span className="text-xs font-black text-emerald-300 font-mono">
                    3x = x{sym.payout3} | 2x = x{sym.payout2}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPaytable(false)}
              className="w-full py-2.5 bg-emerald-700 text-white font-bold rounded-xl text-xs active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SafariReelCell: React.FC<{ symbol: AnimalSymbolDef; isSpinning: boolean }> = ({ symbol, isSpinning }) => {
  return (
    <div className="h-28 bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900 rounded-xl border border-emerald-900 flex items-center justify-center relative overflow-hidden shadow-inner">
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {isSpinning ? (
        <motion.div
          animate={{ y: [-180, 180] }}
          transition={{ repeat: Infinity, duration: 0.14, ease: 'linear' }}
          className="flex flex-col items-center gap-4 filter blur-[1.5px] opacity-80"
        >
          <span className="text-4xl">🦁</span>
          <span className="text-4xl">🐯</span>
          <span className="text-4xl">🐾</span>
          <span className="text-4xl">🐘</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.5, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="flex flex-col items-center"
        >
          <span className="text-4xl filter drop-shadow-md">{symbol.char}</span>
          <span className="text-[9px] font-bold text-emerald-200 mt-1 uppercase tracking-tighter">
            {symbol.name}
          </span>
        </motion.div>
      )}
    </div>
  );
};
