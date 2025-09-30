-- Add this function to your Supabase database via the SQL editor
-- This creates a simple ping function that returns the current timestamp

CREATE OR REPLACE FUNCTION ping_database()
RETURNS TABLE(status text, ts timestamptz)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    'alive'::text as status,
    now() as ts;
$$;
