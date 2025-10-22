import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgpqvepqyywlpgzbxdig.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncHF2ZXBxeXl3bHBnemJ4ZGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNTU5MzUsImV4cCI6MjA3NDkzMTkzNX0.cMPErrOdSYyxtuznRU0XWNcj2AQN7UrI8UnI3TFBl5k'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
