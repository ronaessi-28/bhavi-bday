-- Create table for view counts
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view
CREATE POLICY "Anyone can view page views" 
ON public.page_views 
FOR SELECT 
USING (true);

-- Allow anyone to update view count
CREATE POLICY "Anyone can update view count" 
ON public.page_views 
FOR UPDATE 
USING (true);

-- Insert initial row
INSERT INTO public.page_views (view_count) VALUES (0);