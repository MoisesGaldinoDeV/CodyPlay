import React, { useState } from 'react';
import { Exercise } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { saveExerciseAttempt } from '../../lib/storage';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, XCircle, Lightbulb, Check, ArrowRight, Code2 } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onCompleted?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onCompleted }) => {
  const { user } = useAuth();
  const { showToast } = useProgress();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [codeAnswer, setCodeAnswer] = useState<string>(exercise.starterCode || '');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleVerify = () => {
    if (exercise.type === 'multiple_choice') {
      if (!selectedOptionId) {
        showToast('Atenção', 'Selecione uma opção antes de verificar a resposta.', 'info');
        return;
      }
      const chosen = exercise.options?.find((o) => o.id === selectedOptionId);
      const correct = Boolean(chosen?.isCorrect);
      setIsCorrect(correct);
      setIsSubmitted(true);
      
      saveExerciseAttempt({
        id: `att_${Date.now()}`,
        userId: user?.id || 'usr_student_01',
        exerciseId: exercise.id,
        isCorrect: correct,
        submittedAnswer: chosen?.text || '',
        attemptedAt: new Date().toISOString(),
      });

      if (correct) {
        showToast('Resposta Correta! 🎯', `+${exercise.points} pontos acumulados!`, 'success');
        if (onCompleted) onCompleted();
      } else {
        showToast('Resposta Incorreta', 'Revise a dica e tente novamente!', 'error');
      }
    } else {
      // Code completion or functional verification
      const userClean = codeAnswer.trim().toLowerCase();
      const expectedClean = (exercise.correctAnswer || '').trim().toLowerCase();
      
      const correct = expectedClean ? userClean.includes(expectedClean) : userClean.length > 5;
      setIsCorrect(correct);
      setIsSubmitted(true);

      saveExerciseAttempt({
        id: `att_${Date.now()}`,
        userId: user?.id || 'usr_student_01',
        exerciseId: exercise.id,
        isCorrect: correct,
        submittedAnswer: codeAnswer,
        attemptedAt: new Date().toISOString(),
      });

      if (correct) {
        showToast('Desafio Concluído! 💻', `+${exercise.points} pontos de experiência!`, 'success');
        if (onCompleted) onCompleted();
      } else {
        showToast('Código incorreto', 'Veja a correção comentada abaixo.', 'error');
      }
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setSelectedOptionId(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
      <div className="flex justify-between items-start">
        <div>
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            {exercise.type === 'multiple_choice' ? 'Múltipla Escolha' : 'Desafio Prático de Código'}
          </span>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-2">
            {exercise.title}
          </h3>
        </div>
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
          +{exercise.points} XP
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        {exercise.question}
      </p>

      {/* Multiple Choice Options */}
      {exercise.type === 'multiple_choice' && exercise.options && (
        <div className="space-y-2.5">
          {exercise.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let optionStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50';
            
            if (isSubmitted) {
              if (option.isCorrect) {
                optionStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-emerald-200';
              } else if (isSelected && !option.isCorrect) {
                optionStyle = 'bg-red-500/10 border-red-500 text-red-950 dark:text-red-200';
              }
            } else if (isSelected) {
              optionStyle = 'bg-indigo-500/10 border-indigo-600 text-indigo-950 dark:text-indigo-200 font-semibold';
            }

            return (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
              >
                <span>{option.text}</span>
                {isSubmitted && option.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                {isSubmitted && isSelected && !option.isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
              </div>
            );
          })}
        </div>
      )}

      {/* Code Challenge Input */}
      {exercise.type !== 'multiple_choice' && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5" /> Editor do Exercício</span>
          </div>
          <textarea
            value={codeAnswer}
            onChange={(e) => setCodeAnswer(e.target.value)}
            disabled={isSubmitted && isCorrect}
            rows={5}
            className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
            placeholder="Digite ou edite o código aqui..."
          />
        </div>
      )}

      {/* Action Buttons: Hint, Verify, Retry */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5"
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>{showHint ? 'Ocultar Dica' : 'Ver Dica Didática'}</span>
        </button>

        <div className="flex gap-2">
          {isSubmitted && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Tentar Novamente
            </button>
          )}

          {!isSubmitted && (
            <button
              onClick={handleVerify}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Verificar Resposta</span>
            </button>
          )}
        </div>
      </div>

      {/* Hint box */}
      {showHint && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs">
          <strong>Dica do Instrutor:</strong> {exercise.hint}
        </div>
      )}

      {/* Commented Solution after attempt */}
      {isSubmitted && (
        <div className={`p-4 rounded-xl border text-xs space-y-2 ${
          isCorrect
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
            : 'bg-indigo-500/10 border-indigo-500/30 text-slate-900 dark:text-slate-100'
        }`}>
          <div className="font-bold flex items-center gap-1.5">
            {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lightbulb className="w-4 h-4 text-indigo-500" />}
            <span>Solução Comentada pelo Professor</span>
          </div>
          <p className="leading-relaxed opacity-95">
            {exercise.commentedSolution}
          </p>
        </div>
      )}
    </div>
  );
};
