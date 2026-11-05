import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { COURSES_DATA } from '../../data/coursesData';
import { ACHIEVEMENTS_LIST } from '../../data/achievementsData';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FolderGit2,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  Code2
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { user } = useAuth();
  const {
    progressList,
    getCourseProgressPercentage,
    userProjects,
    certificates,
    unlockedAchievementIds,
    openLesson,
    setActiveTab,
  } = useProgress();

  // Compute total lessons stats across all courses
  let totalLessonsCount = 0;
  COURSES_DATA.forEach((c) => {
    c.modules.forEach((m) => {
      totalLessonsCount += m.lessons.length;
    });
  });

  const completedCount = progressList.filter((p) => p.completed).length;
  const pendingCount = Math.max(0, totalLessonsCount - completedCount);
  const overallPercentage = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  // Find last accessed or next pending lesson
  const mainCourse = COURSES_DATA[0];
  const allLessons = mainCourse.modules[0].lessons;
  const firstUncompleted = allLessons.find((l) => !progressList.some((p) => p.lessonId === l.id && p.completed)) || allLessons[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Personalized Greeting Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-600/15">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Olá, {user?.name || 'Estudante'}! 👋
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
                  Nível Dev
                </span>
              </div>
              <p className="text-indigo-100 text-sm mt-1 max-w-lg">
                Continue praticando e construindo projetos reais para evoluir sua carreira na programação.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl">
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400 animate-pulse" />
            <div>
              <div className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Sequência</div>
              <div className="text-lg font-black">{user?.streakDays || 1} Dias Seguidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Progresso Geral</span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {overallPercentage}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Aulas Concluídas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {completedCount} <span className="text-xs font-normal text-slate-400">/ {totalLessonsCount}</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
            {completedCount > 0 ? 'Ritmo excelente de aprendizado!' : 'Comece sua primeira aula hoje'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Aulas Pendentes</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {pendingCount}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Disponíveis no seu cronograma
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Projetos no Laboratório</span>
            <FolderGit2 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {userProjects.length}
          </div>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
            Salvos na sua biblioteca
          </p>
        </div>
      </div>

      {/* Continue Learning Banner */}
      <div className="bg-white dark:bg-slate-900 border border-indigo-500/30 dark:border-indigo-500/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Última Aula Recomendada</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {firstUncompleted.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            {firstUncompleted.objectives[0]}
          </p>
        </div>

        <button
          onClick={() => openLesson(mainCourse.id, firstUncompleted.id)}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0"
        >
          <span>Continuar Aprendendo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Overview Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Seus Cursos em Andamento
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Módulos práticos focados em projetos reais do mercado
            </p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Ver Todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES_DATA.map((course) => {
            const pct = getCourseProgressPercentage(course.id);
            return (
              <div
                key={course.id}
                onClick={() => openLesson(course.id, course.modules[0].lessons[0].id)}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${course.badgeColor}`}>
                      {course.level}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {course.estimatedHours}h est.
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Progresso</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Achievements & Certificates Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Conquistas e Medalhas</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              {unlockedAchievementIds.length} / {ACHIEVEMENTS_LIST.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ACHIEVEMENTS_LIST.slice(0, 4).map((ach) => {
              const unlocked = unlockedAchievementIds.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    unlocked
                      ? 'bg-amber-500/5 border-amber-500/30 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <div className="font-bold text-xs truncate">{ach.title}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-1">
                    +{ach.xpValue} XP
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick IDE Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
              <Code2 className="w-4 h-4" />
              <span>Laboratório de Código Integrado</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Experimente seu próprio HTML, CSS e JS em tempo real
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Edite qualquer código e observe o resultado imediato no sandbox seguro sem precisar instalar nada na sua máquina.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('playground')}
            className="mt-6 py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all self-start flex items-center gap-2 shadow-md shadow-indigo-600/30"
          >
            <span>Abrir Laboratório IDE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
