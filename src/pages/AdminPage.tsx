import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Shield, Trash2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ADMIN_PASSWORD = '102030';

interface Reservation {
  id: string;
  juz_number: number;
  reserved_by: string;
  reserved_at: string;
}

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  const fetchReservations = async () => {
    const { data } = await supabase
      .from('juz_reservations')
      .select('*')
      .order('juz_number');
    if (data) setReservations(data);
  };

  useEffect(() => {
    if (authenticated) fetchReservations();
  }, [authenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast.error('Incorrect password');
    }
  };

  const resetAll = async () => {
    if (!confirm('Are you sure you want to reset all reservations and start a new Khatma?')) return;
    const { error } = await supabase.from('juz_reservations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) {
      toast.error('Failed to reset');
    } else {
      toast.success('All reservations cleared. New Khatma started!');
      setReservations([]);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background geometric-pattern flex items-center justify-center p-4">
        <div className="w-full max-w-sm p-8 rounded-2xl bg-card border border-border space-y-6">
          <div className="text-center space-y-2">
            <Lock className="w-10 h-10 mx-auto text-accent" />
            <h1 className="text-xl font-bold text-foreground">Admin Access</h1>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="bg-background"
            />
            <Button onClick={handleLogin} className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
              ← Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background geometric-pattern p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>← Back</Button>
            <Button variant="destructive" onClick={resetAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary/50">
            <p className="font-semibold text-foreground">{reservations.length} / 30 Juz Reserved</p>
          </div>
          {reservations.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">No reservations yet</p>
          ) : (
            <div className="divide-y divide-border">
              {reservations.map(r => (
                <div key={r.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {r.juz_number}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{r.reserved_by}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.reserved_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
