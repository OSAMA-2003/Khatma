
-- Create juz_reservations table
CREATE TABLE public.juz_reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  juz_number INTEGER NOT NULL CHECK (juz_number >= 1 AND juz_number <= 30) UNIQUE,
  reserved_by TEXT NOT NULL,
  reserved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.juz_reservations ENABLE ROW LEVEL SECURITY;

-- Everyone can view reservations
CREATE POLICY "Anyone can view reservations" ON public.juz_reservations
  FOR SELECT USING (true);

-- Anyone can insert (reserve a juz)
CREATE POLICY "Anyone can reserve a juz" ON public.juz_reservations
  FOR INSERT WITH CHECK (true);

-- Anyone can delete reservations (for admin reset)
CREATE POLICY "Anyone can delete reservations" ON public.juz_reservations
  FOR DELETE USING (true);
