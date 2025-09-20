import { createClient } from '@supabase/supabase-js';

// Important: These variables are expected to be set in the environment.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
        console.warn("Supabase environment variables are not set. Database functionality will be disabled.");
    }
    // In production, you might want to throw an error
    // throw new Error("Supabase environment variables are not set.");
}

// Create a single, shared Supabase client for the server-side
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
