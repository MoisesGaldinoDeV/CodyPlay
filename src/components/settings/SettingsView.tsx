import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { SUPABASE_SQL_SCHEMA } from '../../lib/supabase';
import { Settings, Sun, Moon, Database, Copy, Check, Shield, AlertTriangle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isSupabaseActive } = useAuth();
  const { showToast } = useProgress();

  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    showToast('SQL Copiado!', 'Script SQL das tabelas do Supabase copiado para a área de transferência.', 'success');
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Configurações do Sistema</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ajustes de preferências visuais, banco de dados e plataforma
        </p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="font-bold text-base text-slate-900 dark:text-white">
          Aparência e Tema Visual
        </h2>
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div>
            <h3 className="font-semibold text-xs text-slate-900 dark:text-white">
              Modo Escuro / Claro
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Alterna entre os esquemas de cores de alta visibilidade e baixo cansaço visual.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Ativar Tema Claro' : 'Ativar Tema Escuro'}</span>
          </button>
        </div>
      </div>

      {/* Supabase Database Status & Migration Schema */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Conexão com Banco de Dados Supabase
            </h2>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isSupabaseActive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
            }`}
          >
            {isSupabaseActive ? '🟢 Conectado ao Supabase' : '🟡 Modo Local de Produção'}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          O CodePlay está configurado com sincronização em tempo real e fallback local. Para conectar seu próprio projeto Supabase, adicione <code className="font-mono text-indigo-600 dark:text-indigo-400">VITE_SUPABASE_URL</code> e <code className="font-mono text-indigo-600 dark:text-indigo-400">VITE_SUPABASE_ANON_KEY</code> no seu arquivo de variáveis de ambiente.
        </p>

        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Esquema SQL das Tabelas (profiles, courses, lessons, certificates, projects)
            </span>
            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copiado!' : 'Copiar Script SQL'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] max-h-48 overflow-y-auto border border-slate-800">
            <code>{SUPABASE_SQL_SCHEMA}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
