import React, { useState } from 'react';
import { TopHeader } from '../components/TopHeader';

interface ResultsScreenProps {
  onBack: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'Todas' | 'Animalitos' | 'Triples' | 'Terminales' | 'Caballos'>('Todas');

  const filters: ('Todas' | 'Animalitos' | 'Triples' | 'Terminales' | 'Caballos')[] = [
    'Todas',
    'Animalitos',
    'Triples',
    'Terminales',
    'Caballos'
  ];

  const resultsList = [
    {
      id: '1',
      title: 'Lotería Nacional',
      date: '02/10/2025',
      icon: '🏛️',
      balls: ['12', '15', '23', '34', '56'],
      type: 'Triples',
      category: 'Triples'
    },
    {
      id: '2',
      title: 'Táchira',
      date: '02/10/2025',
      icon: '🎯',
      balls: ['03', '08', '16', '27', '44'],
      type: 'Triples',
      category: 'Triples'
    },
    {
      id: '3',
      title: 'Zulia',
      date: '02/10/2025',
      icon: '⚡',
      balls: ['05', '11', '18', '25', '37'],
      type: 'Triples',
      category: 'Triples'
    },
    {
      id: '4',
      title: 'Caracas',
      date: '02/10/2025',
      icon: '🏙️',
      balls: ['07', '14', '21', '33', '48'],
      type: 'Terminales',
      category: 'Terminales'
    },
    {
      id: '5',
      title: 'Animalitos',
      date: '02/10/2025',
      icon: '🐾',
      balls: ['🐯', '🐬', '🦊', '🦁', '🐘'],
      type: 'Animalitos',
      category: 'Animalitos'
    },
    {
      id: '6',
      title: 'Polla Hípica',
      date: '02/10/2025',
      icon: '🏇',
      balls: ['🏇', '🐎', '🏇'],
      type: 'Caballos',
      category: 'Caballos'
    }
  ];

  const filteredResults = filter === 'Todas' 
    ? resultsList 
    : resultsList.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 select-none">
      <TopHeader title="Resultados" onBack={onBack} />

      <div className="p-4 space-y-3.5 max-w-md mx-auto">
        {/* Filter Pills matching Screenshot 11 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {filters.map(item => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`py-1.5 px-3 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                filter === item
                  ? 'bg-[#4E0A7D] text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Results Cards matching Screenshot 11 */}
        <div className="space-y-3">
          {filteredResults.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500">
              No hay resultados disponibles para esta categoría.
            </div>
          ) : (
            filteredResults.map(res => (
              <div
                key={res.id}
                className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg shrink-0">
                    {res.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {res.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {res.date}
                    </p>
                  </div>
                </div>

                {/* Number Balls with circular outline matching screenshot */}
                <div className="flex items-center gap-1">
                  {res.balls.map((b, idx) => (
                    <div
                      key={idx}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        res.type !== 'Animalitos' && res.type !== 'Caballos'
                          ? 'border border-slate-800 text-slate-900 font-mono bg-white'
                          : 'bg-slate-50 text-sm'
                      }`}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
