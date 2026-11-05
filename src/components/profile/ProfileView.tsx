import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { ACHIEVEMENTS_LIST } from '../../data/achievementsData';
import { User, Sparkles, Flame, Award, BookOpen, Edit2, Check, Shield } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, updateProfile, isAdmin } = useAuth();
  const { unlockedAchievementIds, progressList, userProjects, certificates } = useProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [bioInput, setBioInput] = useState(user?.bio || '');

  const handleSaveProfile = () => {
    updateProfile({ name: nameInput, bio: bioInput });
    setIsEditing(false);
  };

  const AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Meu Perfil de Estudante</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Gerencie seus dados pessoais, avatar e histórico de conquistas
        </p>
      </div>

      {/* User Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-600/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-3xl ring-4 ring-indigo-600/30">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user?.name}
                </h2>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-indigo-600 text-white flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {user?.email}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 italic">
                "{user?.bio || 'Nenhuma biografia adicionada ainda.'}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancelar Edição' : 'Editar Perfil'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nome Exibido no Certificado:
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full max-w-md p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Biografia / Sobre você:
              </label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                rows={2}
                className="w-full max-w-md p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Escolher Foto de Avatar:
              </label>
              <div className="flex gap-3">
                {AVATARS.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Avatar option"
                    onClick={() => updateProfile({ avatarUrl: url })}
                    className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                      user?.avatarUrl === url ? 'border-indigo-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        )}
      </div>

      {/* Gamification Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Pontos XP</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {user?.xp || 0}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4" />
            <span>Sequência</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {user?.streakDays || 1} Dias
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Aulas Feitas</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {progressList.filter((p) => p.completed).length}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Certificados</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {certificates.length}
          </div>
        </div>
      </div>

      {/* Complete Achievements Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Todas as Conquistas da Plataforma</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const unlocked = unlockedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  unlocked
                    ? 'bg-amber-500/5 border-amber-500/30 text-slate-900 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl shrink-0">{ach.icon}</div>
                <div>
                  <h4 className="font-bold text-xs">{ach.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {ach.description}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    +{ach.xpValue} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
