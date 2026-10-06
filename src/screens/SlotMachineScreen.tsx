import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Coins,
  Flame,
  Plus,
  Zap,
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  Trophy,
  Star,
  ChevronLeft,
  ShoppingBag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopHeader } from '../components/TopHeader';

interface SymbolDef {
  id: string;
  char: string;
  name: string;
  payout3: number; // multiplier for 3 matching
  payout2: number; // multiplier for 2 matching
  isScatter?: boolean;
}

const SYMBOLS: SymbolDef[] = [
  { id: 'seven', char: '7️⃣', name: 'Triple 7', payout3: 100, payout2: 10 },
  { id: 'diamond', char: '💎', name: 'Diamante', payout3: 50, payout2: 5 },
  { id: 'crown', char: '👑', name: 'Corona Aliadas', payout3: 30, payout2: 3 },
  { id: 'star', char: '⭐', name: 'Free Spin Scatter', payout3: 25, payout2: 2, isScatter: true },
  { id: 'bell', char: '🔔', name: 'Campana de Oro', payout3: 20, payout2: 2 },
  { id: 'clover', char: '🍀', name: 'Trébol', payout3: 15, payout2: 1 },
  { id: 'grapes', char: '🍇', name: 'Uvas', payout3: 10, payout2: 1 },
  { id: 'cherry', char: '🍒', name: 'Cerezas', payout3: 8, payout2: 2 }
];

// Weighted random pool for fair casino excitement
const SYMBOL_POOL = [
  'cherry', 'cherry', 'cherry', 'cherry',
  'grapes', 'grapes', 'grapes',
  'clover', 'clover', 'clover',
  'bell', 'bell',
  'star', 'star',
  'crown', 'crown',
  'diamond',
  'seven'
];

interface SlotMachineScreenProps {
  onBack: () => void;
  onNavigateDeposit: () => void;
}

export const SlotMachineScreen: React.FC<SlotMachineScreenProps> = ({
  onBack,
  onNavigateDeposit
}) => {
  const { currentUser, updateBalance } = useApp();

  // Local Slot Coins Economy (Linked with local storage or state)
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('aliadas_slot_coins');
    return saved ? parseInt(saved, 10) : 250;
  });

  const [freeSpins, setFreeSpins] = useState<number>(() => {
    const saved = localStorage.getItem('aliadas_free_spins');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [freeSpinMultiplier, setFreeSpinMultiplier] = useState<number>(2);
  const [totalFreeSpinWins, setTotalFreeSpinWins] = useState<number>(0);
  const [inFreeSpinsMode, setInFreeSpinsMode] = useState<boolean>(false);

  // Bet settings
  const betOptions = [5, 10, 25, 50, 100];
  const [bet, setBet] = useState<number>(10);

  // Reels state (3 reels)
  const [reel1, setReel1] = useState<SymbolDef>(SYMBOLS[0]);
  const [reel2, setReel2] = useState<SymbolDef>(SYMBOLS[0]);
  const [reel3, setReel3] = useState<SymbolDef>(SYMBOLS[0]);

  // Spinning states
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinningReel1, setSpinningReel1] = useState<boolean>(false);
  const [spinningReel2, setSpinningReel2] = useState<boolean>(false);
  const [spinningReel3, setSpinningReel3] = useState<boolean>(false);

  // Win & Effects state
  const [winAmount, setWinAmount] = useState<number>(0);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [isBigWin, setIsBigWin] = useState<boolean>(false);
  const [isJackpot, setIsJackpot] = useState<boolean>(false);
  const [showPaytable, setShowPaytable] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);
  const [autoSpinCount, setAutoSpinCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const autoSpinRef = useRef<number>(0);
  autoSpinRef.current = autoSpinCount;

  // Persist coins and free spins
  useEffect(() => {
    localStorage.setItem('aliadas_slot_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('aliadas_free_spins', freeSpins.toString());
  }, [freeSpins]);

  // Play audio synthetic beep / win
  const playSoundEffect = (type: 'spin' | 'win' | 'jackpot' | 'scatter' | 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'spin') {
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'jackpot' || type === 'scatter') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24);
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.36);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch {
      // Audio context might be restricted before first click
    }
  };

  const getRandomSymbol = (): SymbolDef => {
    const randomId = SYMBOL_POOL[Math.floor(Math.random() * SYMBOL_POOL.length)];
    return SYMBOLS.find(s => s.id === randomId) || SYMBOLS[0];
  };

  // Main Spin Logic
  const handleSpin = () => {
    if (isSpinning) return;

    // Check if player has free spins or enough coins
    const usingFreeSpin = freeSpins > 0;

    if (!usingFreeSpin && coins < bet) {
      setShowBuyModal(true);
      return;
    }

    // Deduct coins or free spin
    if (usingFreeSpin) {
      setFreeSpins(prev => prev - 1);
      setInFreeSpinsMode(true);
    } else {
      setCoins(prev => prev - bet);
      setInFreeSpinsMode(false);
    }

    setWinAmount(0);
    setWinMessage(null);
    setIsBigWin(false);
    setIsJackpot(false);
    setIsSpinning(true);
    setSpinningReel1(true);
    setSpinningReel2(true);
    setSpinningReel3(true);

    playSoundEffect('spin');

    // Pre-calculate target outcomes
    const final1 = getRandomSymbol();
    const final2 = getRandomSymbol();
    const final3 = getRandomSymbol();

    // Sequence stop Reel 1 -> Reel 2 -> Reel 3
    setTimeout(() => {
      setReel1(final1);
      setSpinningReel1(false);
      playSoundEffect('spin');
    }, 600);

    setTimeout(() => {
      setReel2(final2);
      setSpinningReel2(false);
      playSoundEffect('spin');
    }, 1100);

    setTimeout(() => {
      setReel3(final3);
      setSpinningReel3(false);
      setIsSpinning(false);

      // Evaluate Win
      evaluateOutcome(final1, final2, final3, usingFreeSpin);
    }, 1600);
  };

  const evaluateOutcome = (s1: SymbolDef, s2: SymbolDef, s3: SymbolDef, wasFreeSpin: boolean) => {
    const multiplier = wasFreeSpin ? freeSpinMultiplier : 1;
    let payout = 0;
    let message = '';
    let isJackpotWin = false;
    let isMegaWin = false;

    // 1. Check for 3 Scatters (Free Spins Bonus Trigger!)
    const scatterCount = [s1, s2, s3].filter(s => s.isScatter).length;

    if (scatterCount === 3) {
      const awardedSpins = 8;
      setFreeSpins(prev => prev + awardedSpins);
      setFreeSpinMultiplier(3);
      setWinMessage('¡3 ESTRELLAS! 🌟 8 GIROS GRATIS X3');
      setIsBigWin(true);
      playSoundEffect('scatter');
      payout = bet * s1.payout3 * multiplier;
    } else if (scatterCount === 2) {
      const awardedSpins = 3;
      setFreeSpins(prev => prev + awardedSpins);
      setWinMessage('¡2 ESTRELLAS! ⭐ +3 Giros Gratis');
      playSoundEffect('scatter');
      payout = bet * 2 * multiplier;
    } else if (s1.id === s2.id && s2.id === s3.id) {
      // 3 of a kind
      const sym = s1;
      payout = bet * sym.payout3 * multiplier;

      if (sym.id === 'seven') {
        message = '👑 ¡JACKPOT 777! ¡PREMIO MAYOR! 👑';
        isJackpotWin = true;
        isMegaWin = true;
      } else if (sym.id === 'diamond') {
        message = '💎 ¡SUPER MEGA WIN DE DIAMANTES! 💎';
        isMegaWin = true;
      } else if (sym.id === 'crown') {
        message = '👑 ¡GRAN VICTORIA CORONA! 👑';
        isMegaWin = true;
      } else {
        message = `¡TRIPLE ${sym.name.toUpperCase()}! Ganaste ${payout} monedas`;
      }
    } else if (s1.id === s2.id || s2.id === s3.id || s1.id === s3.id) {
      // 2 of a kind
      const matchingSym = s1.id === s2.id ? s1 : (s2.id === s3.id ? s2 : s1);
      payout = bet * matchingSym.payout2 * multiplier;
      message = `¡Par de ${matchingSym.name}! +${payout} monedas`;
    } else if (s1.id === 'cherry' || s2.id === 'cherry' || s3.id === 'cherry') {
      // Any cherry
      payout = Math.floor(bet * 1.5 * multiplier);
      message = `🍒 ¡Cereza de la suerte! +${payout} monedas`;
    }

    if (payout > 0) {
      setCoins(prev => prev + payout);
      setWinAmount(payout);
      setWinMessage(message);
      setIsJackpot(isJackpotWin);
      setIsBigWin(isMegaWin || payout >= bet * 10);

      if (wasFreeSpin) {
        setTotalFreeSpinWins(prev => prev + payout);
      }

      if (isJackpotWin) {
        playSoundEffect('jackpot');
      } else {
        playSoundEffect('win');
      }
    }

    // Auto-spin next trigger
    if (autoSpinRef.current > 0) {
      setTimeout(() => {
        setAutoSpinCount(prev => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
        handleSpin();
      }, 1200);
    }
  };

  // Buy Coin/Spin Pack Logic (Deducts from app balance)
  const handleBuyPack = (pack: { name: string; coins: number; spins: number; priceBs: number }) => {
    if (!currentUser) return;

    if (currentUser.balance < pack.priceBs) {
      setPurchaseSuccess(`Saldo insuficiente en Billetera (Bs. ${currentUser.balance.toFixed(2)}). Recarga tu cuenta.`);
      return;
    }

    // Deduct from wallet balance
    updateBalance(-pack.priceBs);

    // Credit coins & free spins
    setCoins(prev => prev + pack.coins);
    setFreeSpins(prev => prev + pack.spins);

    setPurchaseSuccess(`¡Compraste ${pack.name}! +${pack.coins} Monedas ${pack.spins > 0 ? `y +${pack.spins} Giros Gratis` : ''}`);

    setTimeout(() => {
      setPurchaseSuccess(null);
      setShowBuyModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none relative overflow-x-hidden font-sans">
      {/* Dynamic Casino Neon Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#2c0547] via-[#4E0A7D] to-[#2c0547] border-b border-[#D8AE52]/40 px-3.5 py-2.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">👑</span>
            <div>
              <h1 className="text-xs font-black text-[#D8AE52] tracking-wider uppercase font-heading">
                ALIADAS 777 GOLD
              </h1>
              <p className="text-[9px] text-purple-200">Tragamonedas Clásica</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white text-xs"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
          </button>

          <button
            onClick={() => setShowPaytable(true)}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#D8AE52] hover:text-white text-xs font-bold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Economy Bar: Player Coins + Free Spins + Buy Button */}
      <div className="bg-slate-900/90 border-b border-purple-900/60 px-3.5 py-2 flex items-center justify-between gap-2 z-10">
        {/* Coins Balance */}
        <div className="flex items-center gap-2 bg-black/50 border border-amber-500/40 px-3 py-1.5 rounded-xl shadow-inner">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-[10px] shadow-sm">
            🪙
          </div>
          <div>
            <span className="text-[9px] text-amber-200/80 block leading-tight font-medium">Mis Monedas</span>
            <span className="text-xs font-black text-amber-300 font-mono tracking-tight">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Free Spins Indicator */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
          freeSpins > 0
            ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30 border-pink-400 shadow-md shadow-pink-900/30 animate-pulse'
            : 'bg-black/30 border-slate-700 text-slate-400'
        }`}>
          <Star className={`w-4 h-4 ${freeSpins > 0 ? 'text-yellow-300 fill-yellow-300 animate-spin' : 'text-slate-500'}`} />
          <div>
            <span className="text-[9px] text-pink-200 block leading-tight font-bold">Giros Gratis</span>
            <span className="text-xs font-black text-white font-mono">
              {freeSpins} SPINS
            </span>
          </div>
        </div>

        {/* Buy Coins/Spins Button */}
        <button
          onClick={() => setShowBuyModal(true)}
          className="px-2.5 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-[11px] rounded-xl flex items-center gap-1 shadow-lg shadow-emerald-900/40 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Comprar</span>
        </button>
      </div>

      {/* Main Game Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-3 z-10 max-w-sm mx-auto w-full">
        {/* Jackpot / Free Spins Header Banner */}
        <div className="w-full text-center mb-3">
          <AnimatePresence mode="wait">
            {freeSpins > 0 ? (
              <motion.div
                key="free-spins-mode"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 border-2 border-yellow-300 p-2 rounded-2xl shadow-xl shadow-pink-900/50 flex items-center justify-between px-3"
              >
                <div className="flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-yellow-300 animate-bounce" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    MODO FREE SPINS ACTIVO
                  </span>
                </div>
                <span className="text-xs font-black bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full font-mono">
                  MULTIPLICADOR x{freeSpinMultiplier}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="jackpot-banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-[#4E0A7D]/80 via-[#6911a3]/90 to-[#4E0A7D]/80 border border-[#D8AE52]/50 py-1.5 px-3 rounded-2xl flex items-center justify-between shadow-md"
              >
                <span className="text-[10px] font-bold text-[#D8AE52] flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" /> GRAN JACKPOT 777
                </span>
                <span className="text-xs font-black text-yellow-300 font-mono tracking-wider animate-pulse">
                  {(bet * 100).toLocaleString()} MONEDAS
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Casino Slot Machine Frame (Classic Vegas Gold Bevel) */}
        <div className="w-full bg-gradient-to-b from-[#4E0A7D] via-[#2c0547] to-[#170224] p-3 rounded-3xl border-4 border-[#D8AE52] shadow-2xl shadow-purple-950/80 relative">
          {/* Top Marquee Bulb Lights */}
          <div className="flex justify-between items-center px-4 pb-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  isSpinning
                    ? (i % 2 === 0 ? 'bg-yellow-300 shadow-md shadow-yellow-300 animate-ping' : 'bg-pink-400 shadow-md shadow-pink-400')
                    : 'bg-yellow-400/80 shadow-xs shadow-yellow-300'
                }`}
              />
            ))}
          </div>

          {/* 3 Reels Glass Window */}
          <div className="bg-slate-950 rounded-2xl p-2.5 border-2 border-slate-700 shadow-inner grid grid-cols-3 gap-2 relative overflow-hidden">
            {/* Center Payline Red Laser Line Indicator */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-red-500/40 z-20 pointer-events-none shadow-xs shadow-red-500" />
            <div className="absolute top-1/2 left-1 -translate-y-1/2 text-[10px] font-black text-red-500 z-20 pointer-events-none">▶</div>
            <div className="absolute top-1/2 right-1 -translate-y-1/2 text-[10px] font-black text-red-500 z-20 pointer-events-none">◀</div>

            {/* Reel 1 */}
            <ReelCell symbol={reel1} isSpinning={spinningReel1} />

            {/* Reel 2 */}
            <ReelCell symbol={reel2} isSpinning={spinningReel2} />

            {/* Reel 3 */}
            <ReelCell symbol={reel3} isSpinning={spinningReel3} />
          </div>

          {/* Win / Notification Screen Display */}
          <div className="mt-3 bg-black/80 border border-purple-500/50 rounded-xl p-2 min-h-[44px] flex items-center justify-center text-center">
            {winMessage ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-0.5"
              >
                <p className={`text-xs font-black tracking-tight ${
                  isJackpot ? 'text-yellow-300 text-sm animate-bounce' : 'text-emerald-300'
                }`}>
                  {winMessage}
                </p>
                {winAmount > 0 && (
                  <p className="text-[11px] font-black text-yellow-400 font-mono">
                    + {winAmount} MONEDAS
                  </p>
                )}
              </motion.div>
            ) : isSpinning ? (
              <p className="text-xs font-bold text-purple-300 animate-pulse tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                GIRANDO LOS CARRETES...
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 font-medium">
                {freeSpins > 0 ? '¡Tienes Giros Gratis disponibles! Toca GIRAR' : 'Selecciona tu apuesta y pulsa GIRAR'}
              </p>
            )}
          </div>
        </div>

        {/* Bet Selector Bar */}
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
                      ? 'bg-[#D8AE52] text-slate-950 shadow-md scale-105'
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
            className="px-2.5 py-1 bg-purple-700/60 hover:bg-purple-600 text-purple-200 border border-purple-400/40 rounded-lg text-[10px] font-black uppercase tracking-wider"
          >
            Max
          </button>
        </div>

        {/* Action Controls: Auto Spin & Big Spin Button */}
        <div className="w-full mt-3 grid grid-cols-4 gap-2">
          {/* Auto Spin Toggle Button */}
          <button
            disabled={isSpinning}
            onClick={() => {
              if (autoSpinCount > 0) {
                setAutoSpinCount(0);
              } else {
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

          {/* Large Neon SPIN / GIRAR Button */}
          <button
            disabled={isSpinning}
            onClick={handleSpin}
            className={`col-span-3 py-3.5 px-4 rounded-2xl font-black text-base tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 border-2 ${
              freeSpins > 0
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 border-yellow-300 text-white shadow-pink-900/60 animate-pulse'
                : isSpinning
                ? 'bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#D8AE52] via-[#f7d383] to-[#c79c3a] border-yellow-100 text-slate-950 shadow-amber-950/60 hover:brightness-110'
            }`}
          >
            <Zap className={`w-5 h-5 ${freeSpins > 0 ? 'text-yellow-300 fill-yellow-300' : 'text-slate-950'}`} />
            <span>
              {isSpinning
                ? 'GIRANDO...'
                : freeSpins > 0
                ? `GIRO GRATIS (${freeSpins})`
                : `GIRAR (${bet} 🪙)`}
            </span>
          </button>
        </div>
      </div>

      {/* Buy Coins & Free Spins Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs p-3">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="w-full max-w-sm bg-slate-900 border-2 border-[#D8AE52] rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                  🪙
                </div>
                <div>
                  <h3 className="text-sm font-black text-white font-heading">
                    Tienda de Monedas y Giros
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

            {/* Packs List */}
            <div className="space-y-2.5">
              {[
                {
                  id: 'pack_1',
                  name: 'Pack Básico',
                  coins: 50,
                  spins: 0,
                  priceBs: 10.00,
                  badge: null,
                  color: 'border-slate-700 bg-slate-800/60'
                },
                {
                  id: 'pack_2',
                  name: 'Pack Popular 777',
                  coins: 150,
                  spins: 2,
                  priceBs: 25.00,
                  badge: 'MÁS POPULAR',
                  color: 'border-[#D8AE52] bg-amber-950/30'
                },
                {
                  id: 'pack_3',
                  name: 'Pack Super Giros',
                  coins: 400,
                  spins: 8,
                  priceBs: 60.00,
                  badge: 'MEJOR VALOR',
                  color: 'border-pink-500 bg-pink-950/30'
                },
                {
                  id: 'pack_4',
                  name: 'Pack VIP Jackpot',
                  coins: 1200,
                  spins: 20,
                  priceBs: 150.00,
                  badge: 'VIP CASINO',
                  color: 'border-purple-400 bg-purple-950/40'
                }
              ].map(pack => (
                <div
                  key={pack.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${pack.color} relative shadow-sm`}
                >
                  {pack.badge && (
                    <span className="absolute -top-2 right-3 px-2 py-0.2 bg-[#D8AE52] text-slate-950 font-black text-[9px] rounded-full uppercase">
                      {pack.badge}
                    </span>
                  )}

                  <div>
                    <h4 className="text-xs font-black text-white">{pack.name}</h4>
                    <p className="text-xs font-bold text-amber-300 font-mono">
                      +{pack.coins} 🪙 Monedas
                    </p>
                    {pack.spins > 0 && (
                      <p className="text-[11px] font-bold text-pink-300 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-pink-300" /> +{pack.spins} Free Spins
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleBuyPack(pack)}
                    className="px-3 py-2 bg-[#4E0A7D] hover:bg-[#6813a3] border border-purple-400/50 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all text-right"
                  >
                    <span className="block text-[9px] text-purple-200">Comprar</span>
                    <span>Bs. {pack.priceBs.toFixed(2)}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Direct Wallet Deposit Link */}
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  onNavigateDeposit();
                }}
                className="text-xs text-[#D8AE52] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>¿No tienes saldo en Billetera? Recargar ahora</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Paytable & Rules Modal */}
      {showPaytable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-slate-900 border-2 border-[#D8AE52] rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-black text-[#D8AE52] font-heading uppercase flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-400" /> Tabla de Premios (Pagos)
              </h3>
              <button
                onClick={() => setShowPaytable(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {SYMBOLS.map(sym => (
                <div
                  key={sym.id}
                  className="bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between border border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sym.char}</span>
                    <div>
                      <span className="font-bold text-white block">{sym.name}</span>
                      {sym.isScatter && (
                        <span className="text-[10px] text-pink-300 font-semibold">
                          ¡Activa Modo Free Spins!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs font-black text-amber-300 block">
                      3x = x{sym.payout3}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      2x = x{sym.payout2}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPaytable(false)}
              className="w-full py-2.5 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Reel Column Cell with blur animation
const ReelCell: React.FC<{ symbol: SymbolDef; isSpinning: boolean }> = ({
  symbol,
  isSpinning
}) => {
  return (
    <div className="h-28 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden shadow-inner">
      {/* Top and Bottom Shadow overlay for 3D cylinder illusion */}
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {isSpinning ? (
        <motion.div
          animate={{ y: [-180, 180] }}
          transition={{ repeat: Infinity, duration: 0.15, ease: 'linear' }}
          className="flex flex-col items-center gap-4 filter blur-[1.5px] opacity-80"
        >
          <span className="text-4xl">7️⃣</span>
          <span className="text-4xl">⭐</span>
          <span className="text-4xl">💎</span>
          <span className="text-4xl">👑</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.5, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="flex flex-col items-center"
        >
          <span className="text-4xl filter drop-shadow-md">{symbol.char}</span>
          <span className="text-[9px] font-bold text-slate-300 mt-1 uppercase tracking-tighter">
            {symbol.name}
          </span>
        </motion.div>
      )}
    </div>
  );
};
