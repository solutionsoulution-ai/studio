
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Cette erreur est normale côté serveur car les variables d'environnement publiques ne sont pas disponibles ici.
  // Elle ne devrait pas causer de problème tant que les variables sont bien définies pour le client.
  console.log('Supabase client-side config not found. This is expected on the server.');
}

// Client pour le navigateur (côté client)
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
