import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface SmartPredictionsScreenProps {
  onBack: () => void;
  onPlaySuggestedNumbers?: (numbers: string[]) => void;
}

export const SmartPredictionsScreen: React.FC<SmartPredictionsScreenProps> = ({ onBack }) => {
  const [tab, setTab] = useState<'Loteria' | 'Tripleta'>('Loteria');
  const [selectedLottery, setSelectedLottery] = useState('Caracas');
  const [selectedNums, setSelectedNums] = useState<number[]>([1, 2, 3]);

  const predictions = [
    { numbers: '12 - 34 - 56', level: 'Alta probabilidad', color: 'text-emerald-700 bg-emerald-50' },
    { numbers: '07 - 18 - 27', level: 'Media probabilidad', color: 'text-amber-700 bg-amber-50' },
    { numbers: '03 - 16 - 29', level: 'Media probabilidad', color: 'text-amber-700 bg-amber-50' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Pronósticos" onBack={onBack} />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* 2 Tabs matching Screenshot 8 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('Loteria')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'Loteria'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Lotería
          </button>
          <button
            onClick={() => setTab('Tripleta')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'Tripleta'
                ? 'bg-[#4E0A7D] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Tripleta
          </button>
        </div>

        {/* Dropdown Section */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-800">
            Selecciona la lotería
          </label>
          <select
            value={selectedLottery}
            onChange={e => setSelectedLottery(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
          >
            <option value="Caracas">Caracas</option>
            <option value="Lotería Nacional">Lotería Nacional</option>
            <option value="Táchira">Táchira</option>
            <option value="Zulia">Zulia</option>
          </select>
        </div>

        {/* Number Keypad matching Screenshot 8 */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Tus números
          </label>

          <div className="space-y-1.5">
            {/* Row 1: 1, 2, 3, 4, 5, 6 */}
            <div className="grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <button
                  key={n}
                  onClick={() => {
                    if (selectedNums.includes(n)) setSelectedNums(selectedNums.filter(x => x !== n));
                    else setSelectedNums([...selectedNums, n]);
                  }}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    selectedNums.includes(n)
                      ? 'bg-purple-100 border-[#4E0A7D] text-[#4E0A7D]'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Row 2: 7, 8, 9, 0 */}
            <div className="grid grid-cols-4 gap-1.5 max-w-[240px] mx-auto">
              {[7, 8, 9, 0].map(n => (
                <button
                  key={n}
                  onClick={() => {
                    if (selectedNums.includes(n)) setSelectedNums(selectedNums.filter(x => x !== n));
                    else setSelectedNums([...selectedNums, n]);
                  }}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    selectedNums.includes(n)
                      ? 'bg-purple-100 border-[#4E0A7D] text-[#4E0A7D]'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Purple Button: Generar Pronósticos */}
        <button
          onClick={() => {}}
          className="w-full py-3 bg-[#4E0A7D] text-white font-bold rounded-xl text-xs active:scale-98 transition-all"
        >
          Generar Pronósticos
        </button>

        {/* Section: Pronósticos para hoy */}
        <div className="pt-2 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 font-heading">
            Pronósticos para hoy
          </h3>

          <div className="space-y-2">
            {predictions.map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-2xs"
              >
                <span className="text-xs font-bold text-slate-900 font-mono tracking-wider">
                  {p.numbers}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${p.color}`}>
                  {p.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
