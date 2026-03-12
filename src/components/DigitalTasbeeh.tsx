import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RotateCcw, Plus } from 'lucide-react';

const defaultAdhkar = [
  { arabic: 'سُبْحَانَ اللَّهِ', target: 33 },
  { arabic: 'الْحَمْدُ لِلَّهِ', target: 33 },
  { arabic: 'اللَّهُ أَكْبَرُ', target: 34 },
  { arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', target: 100 },
  { arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100 },
];

const DigitalTasbeeh = () => {
  const [adhkar, setAdhkar] = useState(defaultAdhkar);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [pressing, setPressing] = useState(false);

  const [newDhikr, setNewDhikr] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const selected = adhkar[selectedIndex];

  const increment = useCallback(() => {
    setCount(c => c + 1);
    setPressing(true);
    setTimeout(() => setPressing(false), 150);
  }, []);

  const reset = () => setCount(0);

  const addDhikr = () => {
    if (!newDhikr.trim()) return;

    const target = parseInt(newTarget) || 100;

    setAdhkar([...adhkar, { arabic: newDhikr.trim(), target }]);
    setNewDhikr('');
    setNewTarget('');
  };

  const progress = Math.min((count / selected.target) * 100, 100);

  return (
    <div className="flex flex-col items-center space-y-8 max-w-sm mx-auto" dir="rtl">

      {/* اختيار الذكر */}
      <div className="flex flex-wrap justify-center gap-2">
        {adhkar.map((dhikr, i) => (
          <button
            key={i}
            onClick={() => { setSelectedIndex(i); setCount(0); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${i === selectedIndex
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
          >
            {dhikr.arabic}
          </button>
        ))}
      </div>

      {/* إضافة تسبيحة جديدة */}
      <div className="flex flex-col gap-2 w-full">
        <Input
          placeholder="اكتب الذكر الذي تريد إضافته"
          value={newDhikr}
          onChange={(e) => setNewDhikr(e.target.value)}
        />

        <Input
          type="number"
          placeholder="العدد المطلوب (اختياري)"
          value={newTarget}
          onChange={(e) => setNewTarget(e.target.value)}
        />

        <Button onClick={addDhikr} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة ذكر
        </Button>
      </div>

      {/* دائرة العداد */}
      <button
        onClick={increment}
        className={`relative w-52 h-52 rounded-full emerald-gradient flex flex-col items-center justify-center
          shadow-2xl cursor-pointer select-none transition-transform
          ${pressing ? 'tasbeeh-press' : ''}`}
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(var(--gold) / 0.2)" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 46}`}
            strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>

        <span className="text-5xl font-bold text-primary-foreground z-10">{count}</span>
        <span className="text-primary-foreground/70 text-sm z-10">/ {selected.target}</span>
      </button>

      {/* نص الذكر */}
      <p className="text-3xl font-arabic text-foreground text-center">
        {selected.arabic}
      </p>

      {/* إعادة العداد */}
      <Button variant="outline" size="sm" onClick={reset} className="gap-2">
        <RotateCcw className="w-4 h-4" />
        إعادة العداد
      </Button>

    </div>
  );
};

export default DigitalTasbeeh;