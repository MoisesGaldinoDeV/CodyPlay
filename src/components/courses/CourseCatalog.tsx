import React, { useState } from 'react';
import { COURSES_DATA } from '../../data/coursesData';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, Clock, PlayCircle, BookOpen, Layers, Award } from 'lucide-react';

export const CourseCatalog: React.FC = () => {
  const {
    selectedCourseId,
    setSelectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    isLessonCompleted,
    getCourseProgressPercentage,
    openLesson,
  } = useProgress();

  const [activeFilter, setActiveFilter] = useState<'all' | 'Iniciante' | 'Intermediário' | 'Avançado'>('all');

  const selectedCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];

  const filteredCourses = COURSES_DATA.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.level === activeFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title & Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Catálogo de Cursos & Trilha Prática
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Aprenda programação construindo 3 projetos reais completos
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todos os Níveis
          </button>
          <button
            onClick={() => setActiveFilter('Iniciante')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'Iniciante'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Iniciante
          </button>
          <button
            onClick={() => setActiveFilter('Intermediário')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'Intermediário'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Intermediário
          </button>
          <button
            onClick={() => setActiveFilter('Avançado')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'Avançado'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Avançado
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isSelected = course.id === selectedCourseId;
          const pct = getCourseProgressPercentage(course.id);
          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600/20 shadow-lg'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${course.badgeColor}`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {course.estimatedHours}h
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1">
                  {course.title}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Progresso do Curso</span>
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

      {/* Selected Course Modules & Lessons Breakdown */}
      {selectedCourse && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${selectedCourse.badgeColor}`}>
                  {selectedCourse.level}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedCourse.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedCourse.title}
              </h2>
            </div>

            <button
              onClick={() => {
                const firstLesson = selectedCourse.modules[0].lessons[0];
                openLesson(selectedCourse.id, firstLesson.id);
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Iniciar Aulas do Curso</span>
            </button>
          </div>

          {/* Modules timeline */}
          {selectedCourse.modules.map((module) => (
            <div key={module.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-200 dark:border-indigo-800">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {module.objective}
                  </p>
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-2 pl-0 sm:pl-11">
                {module.lessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => openLesson(selectedCourse.id, lesson.id)}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer group ${
                        completed
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-900 dark:text-white'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="shrink-0">
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-indigo-500 transition-colors" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {lesson.objectives[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                          {completed ? 'Revisar Aula' : 'Acessar Aula'} →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Module Result Deliverable */}
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-300 flex items-start gap-3">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Resultado prático deste módulo:</strong> {module.resultDescription}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
