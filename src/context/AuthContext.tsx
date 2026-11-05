import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { getStoredUser, setStoredUser, DEFAULT_STUDENT_USER, DEFAULT_ADMIN_USER } from '../lib/storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  loginWithProvider: (provider: 'google' | 'github') => Promise<{ success: boolean; message?: string }>;
  loginAsDemoStudent: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isSupabaseActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // 1. Escutador de Sessão do Supabase Auth
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Obter sessão atual na inicialização
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
          console.error('Erro ao buscar sessão Supabase:', error.message);
        }
        if (session?.user) {
          const su = session.user;
          const profile: UserProfile = {
            id: su.id,
            email: su.email || '',
            name: su.user_metadata?.full_name || su.user_metadata?.name || su.email?.split('@')[0] || 'Aluno CodePlay',
            avatarUrl: su.user_metadata?.avatar_url || su.user_metadata?.picture,
            role: su.user_metadata?.role === 'admin' ? 'admin' : 'student',
            xp: 350,
            streakDays: 4,
            lastActiveDate: new Date().toISOString().split('T')[0],
            createdAt: su.created_at || new Date().toISOString(),
          };
          setUser(profile);
          setStoredUser(profile);
        }
      });

      // Registrar escutador para login, logout e callbacks OAuth do Supabase
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setIsAuthLoading(false);
        if (session?.user) {
          const su = session.user;
          const profile: UserProfile = {
            id: su.id,
            email: su.email || '',
            name: su.user_metadata?.full_name || su.user_metadata?.name || su.email?.split('@')[0] || 'Aluno CodePlay',
            avatarUrl: su.user_metadata?.avatar_url || su.user_metadata?.picture,
            role: su.user_metadata?.role === 'admin' ? 'admin' : 'student',
            xp: 350,
            streakDays: 4,
            lastActiveDate: new Date().toISOString().split('T')[0],
            createdAt: su.created_at || new Date().toISOString(),
          };
          setUser(profile);
          setStoredUser(profile);
          setIsAuthModalOpen(false);
          setAuthError(null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setStoredUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // 2. Escutador de postMessage de Popups OAuth (para navegação em iFrame)
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        return;
      }

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data.payload) {
        setIsAuthLoading(false);
        const { name, email, avatarUrl, provider } = event.data.payload;
        const profile: UserProfile = {
          id: `usr_${provider}_${Date.now()}`,
          email: email || `usuario.${provider}@codeplay.com`,
          name: name || (provider === 'github' ? 'Dev GitHub' : 'Usuário Google'),
          avatarUrl: avatarUrl || (provider === 'github' ? 'https://github.com/github.png' : undefined),
          role: email?.includes('admin') ? 'admin' : 'student',
          xp: 350,
          streakDays: 4,
          lastActiveDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          bio: `Conta vinculada via ${provider === 'github' ? 'GitHub' : 'Google'} OAuth.`,
        };
        setUser(profile);
        setStoredUser(profile);
        setIsAuthModalOpen(false);
        setAuthError(null);
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setIsAuthLoading(false);
        setAuthError(event.data.error || 'Erro no processo de autenticação OAuth.');
      }
    };

    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  // 3. Login por E-mail e Senha no Supabase
  const loginWithEmail = async (email: string, pass: string) => {
    setIsAuthLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      setIsAuthLoading(false);
      if (error) {
        setAuthError(error.message);
        return { success: false, message: error.message };
      }
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'student',
          xp: 350,
          streakDays: 4,
          lastActiveDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
        };
        setUser(profile);
        setStoredUser(profile);
        closeAuthModal();
        return { success: true, message: 'Autenticado via Supabase Auth!' };
      }
    }

    // Fallback local
    setIsAuthLoading(false);
    const isAd = email.toLowerCase().includes('admin');
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: isAd ? 'admin' : 'student',
      xp: isAd ? 2500 : 350,
      streakDays: 4,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(profile);
    setStoredUser(profile);
    closeAuthModal();
    return { success: true, message: 'Autenticado localmente com sucesso!' };
  };

  // 4. Cadastro por E-mail e Senha no Supabase
  const registerWithEmail = async (name: string, email: string, pass: string) => {
    setIsAuthLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: name, role: 'student' } },
      });
      setIsAuthLoading(false);
      if (error) {
        setAuthError(error.message);
        return { success: false, message: error.message };
      }
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email,
          name,
          role: 'student',
          xp: 100,
          streakDays: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
        };
        setUser(profile);
        setStoredUser(profile);
        closeAuthModal();
        return { success: true, message: 'Conta criada com sucesso no Supabase!' };
      }
    }

    // Fallback local
    setIsAuthLoading(false);
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      name,
      role: 'student',
      xp: 100,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(profile);
    setStoredUser(profile);
    closeAuthModal();
    return { success: true, message: 'Conta criada e autenticada com sucesso!' };
  };

  // 5. Autenticação Externa OAuth via Supabase (signInWithOAuth) com Fallback Popup
  const loginWithProvider = async (provider: 'google' | 'github') => {
    setIsAuthLoading(true);
    setAuthError(null);

    const redirectUrl = `${window.location.origin}/auth/callback`;

    // A) Método Nativo do Supabase Auth (signInWithOAuth)
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectUrl,
            queryParams: provider === 'google' ? { access_type: 'offline', prompt: 'consent' } : undefined,
          },
        });

        if (error) {
          setIsAuthLoading(false);
          setAuthError(`Erro Supabase OAuth (${provider}): ${error.message}`);
          return { success: false, message: error.message };
        } else {
          // O redirecionamento foi disparado com sucesso pelo cliente Supabase
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Falha na chamada supabase.auth.signInWithOAuth:', err);
      }
    }

    // B) Método Popup OAuth Direta Backend (Compatível com iFrame do AI Studio)
    try {
      const res = await fetch(`/api/auth/${provider}/url`);
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.open(data.url, 'oauth_popup', 'width=600,height=700');
          return { success: true };
        }
      }
    } catch (e) {
      console.warn('API Backend OAuth não disponível:', e);
    }

    // C) Fallback Popup Callback para testes em ambiente de demonstração
    const fallbackCallback = `${redirectUrl}?code=demo_oauth_code&state=${provider}`;
    window.open(fallbackCallback, 'oauth_popup', 'width=600,height=700');
    return { success: true };
  };

  const loginAsDemoStudent = () => {
    setUser(DEFAULT_STUDENT_USER);
    setStoredUser(DEFAULT_STUDENT_USER);
    closeAuthModal();
  };

  const loginAsDemoAdmin = () => {
    setUser(DEFAULT_ADMIN_USER);
    setStoredUser(DEFAULT_ADMIN_USER);
    closeAuthModal();
  };

  // 6. Encerrar Sessão no Supabase Auth
  const logout = async () => {
    setIsAuthLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Erro ao fazer logout no Supabase:', e);
      }
    }
    setUser(null);
    setStoredUser(null);
    setIsAuthLoading(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setStoredUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === 'admin',
        isAuthModalOpen,
        isAuthLoading,
        authError,
        setAuthError,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        loginWithEmail,
        registerWithEmail,
        loginWithProvider,
        loginAsDemoStudent,
        loginAsDemoAdmin,
        logout,
        updateProfile,
        isSupabaseActive: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
