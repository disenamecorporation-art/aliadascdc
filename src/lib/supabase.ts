import { createClient, SupabaseClient } from '@supabase/supabase-js';

// In-memory configuration store (NO localStorage)
let memorySupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
let memorySupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const setSupabaseInMemoryConfig = (url: string, anonKey: string) => {
  memorySupabaseUrl = url;
  memorySupabaseAnonKey = anonKey;
  cachedClient = null;
};

export const getSupabaseConfig = () => {
  return {
    url: memorySupabaseUrl,
    anonKey: memorySupabaseAnonKey
  };
};

let cachedClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient(url, anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
    } catch (err) {
      console.warn('Error initializing Supabase client:', err);
      return null;
    }
  }

  return cachedClient;
};

export const resetSupabaseClient = () => {
  cachedClient = null;
  return getSupabaseClient();
};
