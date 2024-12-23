// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to set the Supabase JWT for the client
export const setSupabaseAccessToken = (token) => {
  supabase.auth.setAuth(token); // This method will set the token in the client
};

export default supabase;
