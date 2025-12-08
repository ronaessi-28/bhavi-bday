-- Create birthday wishes table (public guestbook - no auth required)
CREATE TABLE public.birthday_wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.birthday_wishes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view wishes
CREATE POLICY "Anyone can view wishes"
ON public.birthday_wishes
FOR SELECT
USING (true);

-- Allow anyone to insert wishes
CREATE POLICY "Anyone can insert wishes"
ON public.birthday_wishes
FOR INSERT
WITH CHECK (true);

-- Enable realtime for wishes
ALTER PUBLICATION supabase_realtime ADD TABLE public.birthday_wishes;