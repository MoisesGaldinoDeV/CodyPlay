import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, AlertCircle, Award, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useProgress();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-slide-up ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100 dark:bg-emerald-950/80'
              : toast.type === 'achievement'
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-950 dark:text-purple-100 dark:bg-purple-950/80'
              : toast.type === 'error'
              ? 'bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-100 dark:bg-red-950/80'
              : 'bg-slate-900/90 border-slate-700 text-white dark:bg-slate-900/90'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {toast.type === 'achievement' && <Award className="w-5 h-5 text-amber-400 animate-bounce" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-400" />}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
            <p className="text-xs opacity-90 mt-1 leading-snug">{toast.description}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-200 transition-colors shrink-0 p-1"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
