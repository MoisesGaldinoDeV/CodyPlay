import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to provide SQL schema snippet for user deployment if requested
export const SUPABASE_SQL_SCHEMA = `
-- TABELA: profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 1,
  last_active_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: courses
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  estimated_hours INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: modules
CREATE TABLE IF NOT EXISTS modules (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  objective TEXT NOT NULL,
  result_description TEXT NOT NULL
);

-- TABELA: lessons
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  objectives JSONB,
  introduction TEXT,
  content_markdown TEXT,
  summary TEXT
);

-- TABELA: lesson_progress
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- TABELA: exercise_attempts
CREATE TABLE IF NOT EXISTS exercise_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  submitted_answer TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  html TEXT,
  css TEXT,
  js TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: certificates
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verification_code TEXT UNIQUE NOT NULL
);

-- TABELA: achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- POLÍTICAS DE SEGURANÇA (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfil visível pelo proprietário e admin" ON profiles
  FOR SELECT USING (auth.uid() = id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Usuário gerencia próprio progresso" ON lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuário gerencia próprios projetos" ON projects
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Certificados públicos para consulta" ON certificates
  FOR SELECT USING (true);
`;
