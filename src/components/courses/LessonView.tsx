import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { COURSES_DATA } from '../../data/coursesData';
import { ExerciseCard } from './ExerciseCard';
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Play
} from 'lucide-react';

export const LessonView: React.FC = () => {
  const {
    selectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    isLessonCompleted,
    markLessonComplete,
    openPlaygroundWithCode,
    setSelectedCourseId,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'content' | 'demo' | 'exercises' | 'summary'>('content');

  const course = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === selectedLessonId);
  const lesson = currentLessonIndex >= 0 ? allLessons[currentLessonIndex] : allLessons[0];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCompleted = isLessonCompleted(lesson.id);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id, course.id);
  };

  const handleOpenInPlayground = () => {
    if (lesson.starterCode) {
      openPlaygroundWithCode(
        lesson.starterCode.html,
        lesson.starterCode.css,
        lesson.starterCode.js,
        `Exemplo: ${lesson.title}`
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Navigation Back to Course */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setSelectedLessonId(null)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Catálogo de Cursos</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Módulo: {course.title}
        </span>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Aula {lesson.order} de {allLessons.length}
              </span>
              {isCompleted && (
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {lesson.title}
            </h1>
          </div>

          <div className="flex gap-3">
            {lesson.starterCode && (
              <button
                onClick={handleOpenInPlayground}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 font-semibold text-xs hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Testar no IDE</span>
              </button>
            )}

            <button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'content'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Conteúdo Didático</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'demo'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Exemplos & Linha por Linha</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'exercises'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Exercícios ({lesson.exercises.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Resumo da Aula</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Conteúdo Didático */}
      {activeTab === 'content' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Objectives Card */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              🎯 Objetivos desta Aula
            </h3>
            <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
              {lesson.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Introduction */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {lesson.introduction}
            </p>
          </div>

          {/* Markdown Didactic Explanation */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {lesson.contentMarkdown.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={idx} className="font-bold text-lg text-slate-900 dark:text-white mt-6 mb-2">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeLines = paragraph.replace(/```[a-z]*/g, '').trim();
                return (
                  <pre key={idx} className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                    <code>{codeLines}</code>
                  </pre>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Exemplos & Linha por Linha */}
      {activeTab === 'demo' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Explicação Linha por Linha dos Códigos Principais
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Entenda exatamente o que cada comando faz antes de testar no laboratório
              </p>
            </div>

            {lesson.starterCode && (
              <button
                onClick={handleOpenInPlayground}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Carregar no Laboratório</span>
              </button>
            )}
          </div>

          {/* Line by line breakdown */}
          {lesson.lineByLineExplanation && lesson.lineByLineExplanation.length > 0 ? (
            <div className="space-y-3">
              {lesson.lineByLineExplanation.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                >
                  <div className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                    {item.line}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-1 leading-relaxed">
                    💡 <strong>Explicação:</strong> {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Esta aula possui código didático integrado. Clique no botão acima para carregar o modelo completo no Laboratório IDE.
            </p>
          )}
        </div>
      )}

      {/* Tab 3: Exercícios & Desafios */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Exercícios da Aula
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Testes práticos para fixar o conhecimento e acumular pontos de experiência (XP).
            </p>
          </div>

          {lesson.exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      )}

      {/* Tab 4: Resumo & Conclusão */}
      {activeTab === 'summary' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-2xl text-slate-900 dark:text-white">
              Resumo da Aula
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lesson.summary}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20"
            >
              {isCompleted ? 'Aula Concluída ✔' : 'Concluir Aula Agora (+50 XP)'}
            </button>

            {nextLesson && (
              <button
                onClick={() => setSelectedLessonId(nextLesson.id)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
              >
                <span>Próxima Aula</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer Navigation: Prev & Next */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
        {prevLesson ? (
          <button
            onClick={() => setSelectedLessonId(prevLesson.id)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Aula Anterior</span>
          </button>
        ) : <div />}

        {nextLesson && (
          <button
            onClick={() => setSelectedLessonId(nextLesson.id)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <span>Próxima Aula</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
