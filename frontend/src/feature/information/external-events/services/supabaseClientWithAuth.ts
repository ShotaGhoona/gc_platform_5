import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Clerk認証付きSupabaseクライアントを作成するフック
export const useSupabaseWithAuth = () => {
  const { getToken } = useAuth();

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: async (url, options = {}) => {
        try {
          const clerkToken = await getToken({ template: 'supabase' });
          
          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`);
          }

          return fetch(url, {
            ...options,
            headers,
          });
        } catch (error) {
          console.error('Clerk token error:', error);
          // フォールバック：通常のfetch
          return fetch(url, options);
        }
      },
    },
  });

  return supabase;
};

// 認証付きSupabaseクライアントを取得する関数
export const getSupabaseWithAuth = async (getToken: (options?: any) => Promise<string | null>) => {
  try {
    const clerkToken = await getToken({ template: 'supabase' });
    
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: async (url, options = {}) => {
          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`);
          }

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    });
  } catch (error) {
    console.error('Clerk token error:', error);
    // フォールバック：通常のSupabaseクライアント
    return createClient(supabaseUrl, supabaseAnonKey);
  }
};

// 簡単なSupabaseクライアント（認証なし）
export const getSimpleSupabase = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
