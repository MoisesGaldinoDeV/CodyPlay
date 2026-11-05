import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Code2,
  FolderGit2,
  Award,
  User,
  Settings,
  ShieldAlert,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { activeTab, setActiveTab } = useProgress();
  const { isAdmin, logout, isAuthenticated, openAuthModal } = useAuth();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; requiresAdmin?: boolean }[] = [
    { id: 'overview', label: 'Visão Geral', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'courses', label: 'Meus Cursos', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'learning-path', label: 'Trilha de Aprendizado', icon: <Compass className="w-4 h-4" /> },
    { id: 'playground', label: 'Meu Laboratório (IDE)', icon: <Code2 className="w-4 h-4" /> },
    { id: 'projects', label: 'Meus Projetos', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'certificates', label: 'Certificados', icon: <Award className="w-4 h-4" /> },
    { id: 'profile', label: 'Meu Perfil', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" /> },
    { id: 'admin', label: 'Painel Admin', icon: <ShieldAlert className="w-4 h-4" />, requiresAdmin: true },
  ];

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-30 h-full md:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white">Menu CodePlay</span>
            <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-2">
              Navegação Principal
            </p>
            {navItems.map((item) => {
              if (item.requiresAdmin && !isAdmin) return null;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer / Account status */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Encerrar Sessão</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Entrar / Criar Conta
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
