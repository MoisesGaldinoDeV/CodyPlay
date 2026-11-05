import { UserProfile, LessonProgress, ExerciseAttempt, Certificate, CodeProject } from '../types';

const STORAGE_KEYS = {
  USER: 'codeplay_user_profile',
  PROGRESS: 'codeplay_lesson_progress',
  ATTEMPTS: 'codeplay_exercise_attempts',
  CERTIFICATES: 'codeplay_certificates',
  PROJECTS: 'codeplay_user_projects',
  ACHIEVEMENTS: 'codeplay_user_achievements',
};

// Default Initial Student User
export const DEFAULT_STUDENT_USER: UserProfile = {
  id: 'usr_student_01',
  email: 'aluno@codeplay.com',
  name: 'Alex Silva',
  role: 'student',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  xp: 350,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  createdAt: '2026-10-01T10:00:00.000Z',
  bio: 'Estudante de desenvolvimento Web apaixonado por criar projetos interativos.',
};

// Default Initial Admin User
export const DEFAULT_ADMIN_USER: UserProfile = {
  id: 'usr_admin_01',
  email: 'admin@codeplay.com',
  name: 'Prof. Carlos Dev (Admin)',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
  xp: 2500,
  streakDays: 30,
  lastActiveDate: new Date().toISOString().split('T')[0],
  createdAt: '2026-01-01T08:00:00.000Z',
  bio: 'Instrutor principal e Engenheiro de Software na CodePlay.',
};

export const getStoredUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler perfil do localStorage', e);
  }
  return DEFAULT_STUDENT_USER;
};

export const setStoredUser = (user: UserProfile | null) => {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredProgress = (): LessonProgress[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler progresso', e);
  }
  // Default seed: completed 3 initial lessons of Module 1
  return [
    {
      userId: DEFAULT_STUDENT_USER.id,
      lessonId: 'mod1_aula1',
      courseId: 'modulo_01_todo',
      completed: true,
      completedAt: '2026-11-01T14:30:00.000Z',
      lastAccessedAt: '2026-11-01T14:30:00.000Z',
    },
    {
      userId: DEFAULT_STUDENT_USER.id,
      lessonId: 'mod1_aula2',
      courseId: 'modulo_01_todo',
      completed: true,
      completedAt: '2026-11-02T16:20:00.000Z',
      lastAccessedAt: '2026-11-02T16:20:00.000Z',
    },
    {
      userId: DEFAULT_STUDENT_USER.id,
      lessonId: 'mod1_aula3',
      courseId: 'modulo_01_todo',
      completed: false,
      lastAccessedAt: new Date().toISOString(),
    },
  ];
};

export const setStoredProgress = (progress: LessonProgress[]) => {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
};

export const getStoredAttempts = (): ExerciseAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler tentativas', e);
  }
  return [];
};

export const saveExerciseAttempt = (attempt: ExerciseAttempt) => {
  const attempts = getStoredAttempts();
  const existingIdx = attempts.findIndex(
    (a) => a.userId === attempt.userId && a.exerciseId === attempt.exerciseId
  );
  if (existingIdx >= 0) {
    attempts[existingIdx] = attempt;
  } else {
    attempts.push(attempt);
  }
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
};

export const getStoredCertificates = (): Certificate[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler certificados', e);
  }
  return [];
};

export const saveCertificate = (cert: Certificate) => {
  const certs = getStoredCertificates();
  if (!certs.some((c) => c.courseId === cert.courseId && c.userId === cert.userId)) {
    certs.push(cert);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
  }
};

export const getStoredProjects = (): CodeProject[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler projetos', e);
  }
  // Default sample project for user
  return [
    {
      id: 'proj_sample_01',
      userId: DEFAULT_STUDENT_USER.id,
      title: 'Minha Lista de Tarefas Interativa',
      description: 'Projeto desenvolvido no Módulo 01 com HTML, CSS e JavaScript localstorage.',
      html: `<div class="app-card">
  <h1>📝 Minha Lista de Tarefas</h1>
  <div class="input-row">
    <input type="text" id="taskInput" placeholder="Digite uma nova tarefa..." />
    <button onclick="adicionarTarefa()">Adicionar</button>
  </div>
  <ul id="taskList"></ul>
</div>`,
      css: `body {
  font-family: sans-serif;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 40px;
}
.app-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
h1 {
  font-size: 20px;
  margin-top: 0;
  color: #6957E8;
}
.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  background: #6957E8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}`,
      js: `function adicionarTarefa() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  
  const ul = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = \`<span>\${text}</span> <button onclick="this.parentElement.remove()" style="background:#ff4d4f;padding:4px 8px;font-size:12px;">Remover</button>\`;
  ul.appendChild(li);
  input.value = '';
}`,
      createdAt: '2026-11-03T10:00:00.000Z',
      updatedAt: '2026-11-03T10:00:00.000Z',
    },
  ];
};

export const saveStoredProject = (project: CodeProject) => {
  const projects = getStoredProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

export const deleteStoredProject = (id: string) => {
  const projects = getStoredProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

export const getUnlockedAchievements = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler conquistas', e);
  }
  return ['ach_first_step', 'ach_html_master'];
};

export const unlockAchievement = (id: string): boolean => {
  const current = getUnlockedAchievements();
  if (!current.includes(id)) {
    current.push(id);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(current));
    return true; // Newly unlocked
  }
  return false;
};
