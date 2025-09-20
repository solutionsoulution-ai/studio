
import { createClient } from '@supabase/supabase-js';

// Important: These variables are expected to be set in the environment.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn("Supabase environment variables are not set. Database functionality will be disabled in production. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.");
}


// Create a single, shared Supabase client for the server-side
export const supabase = supabaseInstance;
