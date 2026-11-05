import React from 'react';
import { COURSES_DATA } from '../../data/coursesData';
import { useProgress } from '../../context/ProgressContext';
import { Compass, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export const LearningPathView: React.FC = () => {
  const { getCourseProgressPercentage, openLesson } = useProgress();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Trilha de Aprendizado Recomendada</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Guia passo a passo para se tornar um desenvolvedor Web Full Stack Front-End
        </p>
      </div>

      <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900/60 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
        {COURSES_DATA.map((course, idx) => {
          const pct = getCourseProgressPercentage(course.id);
          const isCompleted = pct >= 100;
          return (
            <div key={course.id} className="relative group">
              {/* Timeline Node Badge */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white dark:ring-slate-950 shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs hover:border-indigo-500/40 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${course.badgeColor}`}>
                      Passo {idx + 1} • {course.level}
                    </span>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {pct}% Concluído
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {course.title}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {course.description}
                </p>

                {/* Modules breakdown inside path */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Aulas Práticas da Trilha:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.modules[0].lessons.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => openLesson(course.id, l.id)}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer flex items-center justify-between"
                      >
                        <span className="truncate">{l.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openLesson(course.id, course.modules[0].lessons[0].id)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Acessar Trilha do Módulo</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
