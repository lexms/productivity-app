import { createBrowserClient } from "@supabase/ssr";

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

export const createClient = () =>
  createBrowserClient(supabaseUrl || "", supabaseAnonKey || "");
