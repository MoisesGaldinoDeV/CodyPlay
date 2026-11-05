import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ActiveTab, LessonProgress, Certificate, CodeProject } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { ACHIEVEMENTS_LIST } from '../data/achievementsData';
import {
  getStoredProgress,
  setStoredProgress,
  getStoredCertificates,
  saveCertificate,
  getStoredProjects,
  saveStoredProject,
  deleteStoredProject,
  getUnlockedAchievements,
  unlockAchievement
} from '../lib/storage';
import { useAuth } from './AuthContext';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'achievement' | 'error';
  title: string;
  description: string;
}

interface ProgressContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  
  progressList: LessonProgress[];
  isLessonCompleted: (lessonId: string) => boolean;
  markLessonComplete: (lessonId: string, courseId: string) => void;
  getCourseProgressPercentage: (courseId: string) => number;
  
  certificates: Certificate[];
  generateCertificate: (courseId: string) => Certificate | null;
  
  userProjects: CodeProject[];
  saveProject: (project: Omit<CodeProject, 'id' | 'createdAt' | 'updatedAt' | 'userId'> & { id?: string }) => void;
  deleteProject: (id: string) => void;
  
  unlockedAchievementIds: string[];
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  showToast: (title: string, description: string, type?: ToastMessage['type']) => void;
  
  // Quick navigation helper
  openLesson: (courseId: string, lessonId: string) => void;
  openPlaygroundWithCode: (html: string, css: string, js: string, title?: string) => void;
  playgroundInitialCode: { html: string; css: string; js: string; title: string } | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('modulo_01_todo');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  
  const [progressList, setProgressList] = useState<LessonProgress[]>(() => getStoredProgress());
  const [certificates, setCertificates] = useState<Certificate[]>(() => getStoredCertificates());
  const [userProjects, setUserProjects] = useState<CodeProject[]>(() => getStoredProjects());
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<string[]>(() => getUnlockedAchievements());
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [playgroundInitialCode, setPlaygroundInitialCode] = useState<{ html: string; css: string; js: string; title: string } | null>(null);

  useEffect(() => {
    setStoredProgress(progressList);
  }, [progressList]);

  const showToast = (title: string, description: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    
    // Auto remove toast after 5s
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progressList.some((p) => p.lessonId === lessonId && p.completed);
  };

  const getCourseProgressPercentage = (courseId: string): number => {
    const course = COURSES_DATA.find((c) => c.id === courseId);
    if (!course) return 0;
    
    let totalLessons = 0;
    course.modules.forEach((m) => {
      totalLessons += m.lessons.length;
    });
    
    if (totalLessons === 0) return 0;
    
    const completedCount = progressList.filter(
      (p) => p.courseId === courseId && p.completed
    ).length;
    
    return Math.round((completedCount / totalLessons) * 100);
  };

  const markLessonComplete = (lessonId: string, courseId: string) => {
    const now = new Date().toISOString();
    let isNewCompletion = false;

    setProgressList((prev) => {
      const idx = prev.findIndex((p) => p.lessonId === lessonId);
      if (idx >= 0) {
        if (!prev[idx].completed) {
          isNewCompletion = true;
          const updated = [...prev];
          updated[idx] = { ...updated[idx], completed: true, completedAt: now, lastAccessedAt: now };
          return updated;
        }
        return prev;
      } else {
        isNewCompletion = true;
        return [
          ...prev,
          {
            userId: user?.id || 'anon',
            lessonId,
            courseId,
            completed: true,
            completedAt: now,
            lastAccessedAt: now,
          },
        ];
      }
    });

    if (isNewCompletion) {
      // Award XP
      const addedXp = 50;
      if (user) {
        updateProfile({ xp: user.xp + addedXp });
      }

      showToast('Aula Concluída! 🎉', `+${addedXp} XP adicionados ao seu perfil.`, 'success');
      triggerConfetti();

      // Check for first lesson achievement
      if (unlockAchievement('ach_first_step')) {
        setUnlockedAchievementIds(getUnlockedAchievements());
        showToast('Nova Conquista Desbloqueada!', '🚀 Primeiro Passo: Concluiu a primeira aula no CodePlay!', 'achievement');
      }

      // Check if course is 100% complete
      const pct = getCourseProgressPercentage(courseId);
      if (pct >= 100) {
        generateCertificate(courseId);
      }
    }
  };

  const generateCertificate = (courseId: string): Certificate | null => {
    const course = COURSES_DATA.find((c) => c.id === courseId);
    if (!course) return null;

    const existing = certificates.find((c) => c.courseId === courseId);
    if (existing) return existing;

    const uuid = `CP-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      userId: user?.id || 'usr_student_01',
      userName: user?.name || 'Alex Silva',
      courseId,
      courseTitle: course.title,
      issuedAt: new Date().toLocaleDateString('pt-BR'),
      verificationCode: uuid,
    };

    saveCertificate(newCert);
    setCertificates(getStoredCertificates());

    // Award achievement and extra XP
    if (user) {
      updateProfile({ xp: user.xp + 300 });
    }

    showToast(
      'Certificado Emitido! 📜',
      `Parabéns! Você concluiu o "${course.title}". Seu certificado já está disponível!`,
      'achievement'
    );
    triggerConfetti();

    return newCert;
  };

  const saveProject = (projectData: Omit<CodeProject, 'id' | 'createdAt' | 'updatedAt' | 'userId'> & { id?: string }) => {
    const now = new Date().toISOString();
    const id = projectData.id || `proj_${Date.now()}`;
    
    const fullProject: CodeProject = {
      id,
      userId: user?.id || 'usr_student_01',
      title: projectData.title || 'Meu Projeto CodePlay',
      description: projectData.description || 'Projeto criado no Laboratório CodePlay.',
      html: projectData.html,
      css: projectData.css,
      js: projectData.js,
      createdAt: now,
      updatedAt: now,
    };

    saveStoredProject(fullProject);
    setUserProjects(getStoredProjects());
    showToast('Projeto Salvo!', `O projeto "${fullProject.title}" foi salvo na sua biblioteca.`, 'success');
  };

  const deleteProject = (id: string) => {
    deleteStoredProject(id);
    setUserProjects(getStoredProjects());
    showToast('Projeto Removido', 'O projeto foi excluído da sua biblioteca.', 'info');
  };

  const openLesson = (courseId: string, lessonId: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setActiveTab('courses');
  };

  const openPlaygroundWithCode = (html: string, css: string, js: string, title = 'Exemplo da Aula') => {
    setPlaygroundInitialCode({ html, css, js, title });
    setActiveTab('playground');
  };

  return (
    <ProgressContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        progressList,
        isLessonCompleted,
        markLessonComplete,
        getCourseProgressPercentage,
        certificates,
        generateCertificate,
        userProjects,
        saveProject,
        deleteProject,
        unlockedAchievementIds,
        toasts,
        removeToast,
        showToast,
        openLesson,
        openPlaygroundWithCode,
        playgroundInitialCode,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress deve ser usado dentro de um ProgressProvider');
  }
  return context;
};
