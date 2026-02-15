import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function bootstrapProfile(user: User) {
  try {
    // Check if profile exists
    const { data: existing } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) return; // profile already exists

    // Check if bootstrap admin is already set
    const { data: settings } = await supabase
      .from('system_settings')
      .select('id, bootstrap_admin_user_id')
      .limit(1)
      .maybeSingle();

    const isFirstUser = !settings?.bootstrap_admin_user_id;
    const roleCode = isFirstUser ? 'system_admin' : 'employee';

    // Find HR department for first user
    let departmentId = null;
    if (isFirstUser) {
      const { data: hrDept } = await supabase
        .from('departments')
        .select('id')
        .ilike('name_en', '%human%')
        .limit(1)
        .maybeSingle();
      departmentId = hrDept?.id ?? null;
    }

    const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || '';

    // Create profile
    await supabase.from('profiles').insert({
      user_id: user.id,
      email: user.email,
      full_name: fullName,
      role_code: roleCode,
      department_id: departmentId,
      is_active: true,
    });

    // Set bootstrap admin
    if (isFirstUser && settings) {
      await supabase
        .from('system_settings')
        .update({ bootstrap_admin_user_id: user.id })
        .eq('id', settings.id ?? 1);
    }
  } catch (err) {
    console.error('Bootstrap profile error:', err);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        // Run bootstrap in background — don't block auth
        setTimeout(() => bootstrapProfile(session.user), 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
