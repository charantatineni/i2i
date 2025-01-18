import { AuthError, Provider } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface AuthResponse {
  error: AuthError | null;
}

export const signInWithOAuth = async (provider: Provider): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: false,
      },
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('OAuth error:', error);
    return { error: error as AuthError };
  }
};

export const handleAuthCallback = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!data.session) throw new Error('No session found');
    
    return { error: null };
  } catch (error) {
    console.error('Auth callback error:', error);
    return { error: error as AuthError };
  }
};