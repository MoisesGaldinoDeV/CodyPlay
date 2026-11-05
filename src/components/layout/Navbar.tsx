import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';
import { Sun, Moon, Sparkles, User, LogOut, Shield, Code2, Menu } from 'lucide-react';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const { user, isAuthenticated, openAuthModal, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { activeTab, setActiveTab } = useProgress();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span>CodePlay</span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Pro
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('courses')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'courses'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Meus Cursos
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'playground'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Laboratório (IDE)
          </button>
          <button
            onClick={() => setActiveTab('learning-path')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'learning-path'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Trilha de Aprendizado
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'certificates'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Certificados
          </button>
        </nav>

        {/* Zone 3: Actions (Theme toggle, XP badge, Profile / Login) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            aria-label="Alternar Tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Status or Auth Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* XP Pill */}
              <div
                onClick={() => setActiveTab('profile')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold cursor-pointer hover:bg-amber-500/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{user.xp} XP</span>
              </div>

              {/* Admin Badge */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-indigo-700 transition-colors shadow-sm"
                  title="Painel Administrativo"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}

              {/* User Avatar Menu */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-2 text-left group"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-600/30 group-hover:ring-indigo-600 transition-all"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs ring-2 ring-indigo-600/30">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden lg:inline-block font-medium text-xs text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Sair da Conta"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5" />
              <span>Entrar / Cadastrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
