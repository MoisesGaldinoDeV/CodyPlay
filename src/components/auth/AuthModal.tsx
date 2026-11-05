import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, User, Github, Shield, AlertCircle, Info, Copy, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    loginWithEmail,
    registerWithEmail,
    loginWithProvider,
    loginAsDemoStudent,
    loginAsDemoAdmin,
    isSupabaseActive,
    isAuthLoading,
    authError,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOAuthInfo, setShowOAuthInfo] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isAuthModalOpen) return null;

  const DEV_CALLBACK_URL = `${window.location.origin}/auth/callback`;

  const handleCopyCallback = () => {
    navigator.clipboard.writeText(DEV_CALLBACK_URL);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'forgot') {
        setTimeout(() => {
          setLoading(false);
          setSuccessMsg('Se o e-mail estiver cadastrado, enviamos um link de redefinição de senha!');
        }, 800);
        return;
      }

      if (mode === 'login') {
        const res = await loginWithEmail(email, password);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.message);
        }
      } else {
        if (!name.trim()) {
          setErrorMsg('Por favor, informe seu nome completo.');
          setLoading(false);
          return;
        }
        const res = await registerWithEmail(name, email, password);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.message);
        }
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Ocorreu um erro ao processar. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-all my-8">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/30">
              CP
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-none">
                {mode === 'login' && 'Entrar no CodePlay'}
                {mode === 'register' && 'Criar Conta no CodePlay'}
                {mode === 'forgot' && 'Recuperar Senha'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Aprenda programação criando projetos reais
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {(errorMsg || authError) && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg || authError}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
              {successMsg}
            </div>
          )}

          {/* Social OAuth Providers */}
          {mode !== 'forgot' && (
            <div className="space-y-2 mb-4">
              <button
                type="button"
                disabled={isAuthLoading}
                onClick={() => loginWithProvider('google')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-750 font-semibold text-xs transition-all shadow-xs disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.24 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 10.02 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.24 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>{isAuthLoading ? 'Redirecionando para Google...' : 'Entrar / Cadastrar com Google'}</span>
              </button>

              <button
                type="button"
                disabled={isAuthLoading}
                onClick={() => loginWithProvider('github')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs transition-all shadow-xs disabled:opacity-50"
              >
                <Github className="w-4 h-4" />
                <span>{isAuthLoading ? 'Redirecionando para GitHub...' : 'Entrar / Cadastrar com GitHub'}</span>
              </button>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowOAuthInfo(!showOAuthInfo)}
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{showOAuthInfo ? 'Ocultar URLs de Callback OAuth' : 'Ver URLs de Callback OAuth'}</span>
                </button>
              </div>

              {/* OAuth Configuration Info Box */}
              {showOAuthInfo && (
                <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs space-y-2">
                  <div className="font-bold text-indigo-950 dark:text-indigo-200">
                    📋 Configuração do Provider OAuth:
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    No seu painel do GitHub (<code className="font-mono">github.com/settings/developers</code>) ou Google Cloud Console, adicione esta URL de Callback autorizada:
                  </p>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                    <span className="truncate">{DEV_CALLBACK_URL}</span>
                    <button onClick={handleCopyCallback} className="p-1 hover:text-indigo-800">
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-semibold text-[10px]">
                    ou com e-mail e senha
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Endereço de E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aluno@exemplo.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Senha
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' && 'Entrar na Conta'}
                  {mode === 'register' && 'Criar Conta Grátis'}
                  {mode === 'forgot' && 'Enviar E-mail de Recuperação'}
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Student/Admin Login */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 mb-2 font-semibold uppercase tracking-wider">
              Acesso Rápido de Teste:
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={loginAsDemoStudent}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors"
              >
                Entrar como Aluno
              </button>
              <button
                onClick={loginAsDemoAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Entrar como Admin
              </button>
            </div>
          </div>

          {/* Toggle login / register */}
          <div className="mt-4 text-center">
            {mode === 'login' && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ainda não tem uma conta?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Cadastre-se grátis
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Já possui uma conta?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Fazer login
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Voltar para o login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
