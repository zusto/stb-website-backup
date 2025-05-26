
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing. Personalized features will be disabled. " +
    "Please check your .env file or environment variables if you want to enable them. " +
    "If you haven't connected Supabase yet, you can do so by clicking the Supabase button in the Lovable interface."
  );
} else {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
    // supabaseInstance remains null
  }
}

export const supabase = supabaseInstance;

