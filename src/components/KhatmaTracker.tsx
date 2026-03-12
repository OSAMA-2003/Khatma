import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { BookOpen, Check } from 'lucide-react';

interface Reservation {
  juz_number: number;
  reserved_by: string;
}

const KhatmaTracker = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    const { data } = await supabase
      .from('juz_reservations')
      .select('juz_number, reserved_by');
    if (data) setReservations(data);
  };

  useEffect(() => {
    fetchReservations();

    const channel = supabase
      .channel('juz-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'juz_reservations' },
        () => {
          fetchReservations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const reserveJuz = async () => {
    if (!selectedJuz || !name.trim()) {
      toast.error('من فضلك اكتب اسمك');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('juz_reservations')
      .insert({ juz_number: selectedJuz, reserved_by: name.trim() });

    if (error) {
      if (error.code === '23505') {
        toast.error('هذا الجزء تم حجزه بالفعل');
      } else {
        toast.error('حدث خطأ أثناء الحجز');
      }
    } else {
      toast.success(`تم حجز الجزء ${selectedJuz}`);
      setSelectedJuz(null); // يقفل الـ modal
      setName('');
      fetchReservations();
    }

    setLoading(false);
  };

  const getReservation = (juz: number) => reservations.find((r) => r.juz_number === juz);
  const completedCount = reservations.length;

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl py-3 font-bold font-arabic text-foreground">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </h2>
        <p className="text-muted-foreground text-lg" dir="rtl">
          {completedCount} / 30 جزء تم حجزه
        </p>
        <div className="w-full max-w-md mx-auto h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full gold-gradient rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
          const reservation = getReservation(juz);
          const isReserved = !!reservation;
          const isSelected = selectedJuz === juz;

          return (
            <button
              key={juz}
              onClick={() => !isReserved && setSelectedJuz(isSelected ? null : juz)}
              disabled={isReserved}
              className={`
                relative aspect-square rounded-xl flex flex-col items-center justify-center
                text-sm font-semibold transition-all duration-300 border-2
                ${isReserved
                  ? 'bg-primary border-primary text-primary-foreground cursor-default'
                  : isSelected
                  ? 'border-accent bg-accent/20 text-accent-foreground scale-105 shadow-lg'
                  : 'border-border bg-card text-card-foreground hover:border-accent hover:shadow-md hover:scale-105 cursor-pointer'}
              `}
              title={isReserved ? 'هذا الجزء محجوز' : `الجزء ${juz}`}
            >
              {isReserved && <Check className="w-3 h-3 absolute top-1 right-1 opacity-70" />}
              <span className="text-lg font-bold">{juz}</span>
            </button>
          );
        })}
      </div>

      {/* Reserve modal */}
      {selectedJuz && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedJuz(null)} // click outside closes modal
        >
          <div
            className="bg-card rounded-2xl p-6 w-[90%] max-w-sm space-y-4 border shadow-xl"
            onClick={(e) => e.stopPropagation()} // منع إغلاق عند الضغط داخل المودال
          >
            <div className="flex items-center gap-2 text-lg font-semibold">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>حجز الجزء {selectedJuz}</span>
            </div>

            <Input
              placeholder="اكتب اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && reserveJuz()}
            />

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedJuz(null);
                  setName('');
                }}
              >
                إلغاء
              </Button>

              <Button onClick={reserveJuz} disabled={loading}>
                تأكيد الحجز
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhatmaTracker;