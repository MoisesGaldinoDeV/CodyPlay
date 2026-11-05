export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  createdAt: string;
  bio?: string;
}

export type CourseLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface ExerciseChoice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  type: 'multiple_choice' | 'complete_code' | 'spot_error' | 'write_function' | 'practical_challenge';
  points: number;
  question: string;
  options?: ExerciseChoice[]; // for multiple_choice
  starterCode?: string; // for code exercises
  expectedOutput?: string; // for auto-validation
  correctAnswer?: string;
  hint: string;
  commentedSolution: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  order: number;
  title: string;
  objectives: string[];
  introduction: string;
  contentMarkdown: string; // Full didactic explanation with examples
  lineByLineExplanation?: { line: string; explanation: string }[];
  practicalDemo?: {
    description: string;
    html: string;
    css: string;
    js: string;
  };
  exercises: Exercise[];
  summary: string;
  starterCode?: {
    html: string;
    css: string;
    js: string;
  };
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: string;
  level: CourseLevel;
  objective: string;
  resultDescription: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: CourseLevel;
  category: string;
  estimatedHours: number;
  iconName: string;
  badgeColor: string;
  modules: Module[];
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  completedAt?: string;
  lastAccessedAt: string;
}

export interface ExerciseAttempt {
  id: string;
  userId: string;
  exerciseId: string;
  isCorrect: boolean;
  submittedAnswer: string;
  attemptedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpValue: number;
  unlockedAt?: string;
  category: 'progress' | 'streak' | 'projects' | 'exercises';
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  verificationCode: string;
}

export interface CodeProject {
  id: string;
  userId: string;
  title: string;
  description?: string;
  html: string;
  css: string;
  js: string;
  createdAt: string;
  updatedAt: string;
}

export type ActiveTab = 
  | 'overview'
  | 'courses'
  | 'learning-path'
  | 'playground'
  | 'projects'
  | 'certificates'
  | 'profile'
  | 'settings'
  | 'admin';
