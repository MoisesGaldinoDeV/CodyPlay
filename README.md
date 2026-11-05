# 🚀 CodePlay — Plataforma de Ensino de Programação

O **CodePlay** é uma plataforma completa e interativa para ensino de desenvolvimento web (HTML5, CSS3, JavaScript ES6+ e React), criada para permitir que alunos aprendam programação construindo projetos reais com execução em tempo real, gamificação e certificação autêntica.

---

## 📑 Sumário

1. [Visão Geral da Arquitetura](#-visão-geral-da-arquitetura)
2. [Variáveis de Ambiente (.env)](#-variáveis-de-ambiente-env)
3. [Guia de Configuração do Supabase](#-guia-de-configuração-do-supabase)
4. [Configuração do Banco de Dados (Tabelas e RLS)](#-configuração-do-banco-de-dados-tabelas-e-rls)
5. [Configuração Passo a Passo do OAuth (Google e GitHub)](#-configuração-passo-a-passo-do-oauth-google-e-github)
6. [Executando a Aplicação](#-executando-a-aplicação)

---

## 🏗️ Visão Geral da Arquitetura

- **Front-End**: React + Vite + TypeScript + Tailwind CSS v4.
- **Autenticação**: Supabase Auth (E-mail/Senha, Google OAuth, GitHub OAuth) + Fallback em iFrame.
- **Banco de Dados**: Supabase PostgreSQL (Perfis, Progresso de Aulas, Tentativas, Projetos do IDE, Certificados e Conquistas).
- **IDE Playground**: Monaco Editor integrado com isolamento em `iframe` com atributo `sandbox="allow-scripts"`.
- **Servidor Backend**: Node.js + Express (`server.ts`) para suporte a rotas de API e OAuth callbacks.

---

## 🔑 Variáveis de Ambiente (.env)

Crie ou edite o arquivo `.env` na raiz do seu projeto adicionando as seguintes variáveis:

```env
# GEMINI API KEY (Injetado automaticamente no AI Studio)
GEMINI_API_KEY="SUA_CHAVE_GEMINI"

# URL da Aplicação
APP_URL="https://ais-dev-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app"

# SUPABASE AUTH & DATABASE (Obrigatório para conectar ao Supabase)
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_ANON_KEY="sua-chave-anonima-supabase"

# PROVEDORES OAUTH DIRECT POPUP (Opcional para backend Express)
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"
```

---

## ⚡ Guia de Configuração do Supabase

### Passo 1: Criar um Projeto no Supabase

1. Acesse o painel do [Supabase](https://supabase.com) e faça login.
2. Clique em **"New Project"** (Novo Projeto).
3. Insira o nome do projeto (ex: `CodePlay-Platform`), defina a senha do banco de dados e escolha a região mais próxima (ex: `South America (São Paulo)`).
4. Clique em **"Create new project"** e aguarde o provisionamento.

### Passo 2: Obter a URL e a Chave Pública (Anon Key)

1. No painel do seu projeto no Supabase, vá em **Project Settings** (Ícone de engrenagem) -> **API**.
2. Copie os valores:
   - **Project URL**: Cole no `.env` em `VITE_SUPABASE_URL`.
   - **Project API keys (`anon` / `public`)**: Cole no `.env` em `VITE_SUPABASE_ANON_KEY`.

---

## 🗄️ Configuração do Banco de Dados (Tabelas e RLS)

No painel do Supabase, vá em **SQL Editor** -> **New Query**, cole o script SQL abaixo e clique em **Run**:

```sql
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
  issuedAt TEXT NOT NULL,
  verification_code TEXT UNIQUE NOT NULL
);

-- POLÍTICAS DE SEGURANÇA (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfil acessível por proprietário e admin" ON profiles
  FOR SELECT USING (auth.uid() = id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Usuário gerencia próprio progresso" ON lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuário gerencia próprios projetos" ON projects
  FOR ALL USING (auth.uid() = user_id);
```

---

## 🔐 Configuração Passo a Passo do OAuth (Google e GitHub)

### URLs de Redirecionamento (Callback URLs) Exatas da Aplicação:

Adicione as seguintes URLs exatas nas configurações de Callback dos seus provedores e do Supabase:

- **URL de Desenvolvimento:** `https://ais-dev-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app/auth/callback`
- **URL Compartilhada / Produção:** `https://ais-pre-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app/auth/callback`

---

### 1. Configurando o Provider GitHub no Supabase

#### A. Criar o App OAuth no GitHub:
1. Acesse suas configurações de desenvolvedor no GitHub: [GitHub Developer Settings](https://github.com/settings/developers).
2. Clique em **"OAuth Apps"** -> **"New OAuth App"**.
3. Preencha o formulário:
   - **Application name**: `CodePlay`
   - **Homepage URL**: `https://ais-dev-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app`
   - **Authorization callback URL**: `https://ais-dev-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app/auth/callback`
4. Clique em **"Register application"**.
5. Copie o **Client ID** e gere um **Client Secret**.

#### B. Ativar o Provider no Console do Supabase:
1. No painel do Supabase, vá em **Authentication** -> **Providers** -> **GitHub**.
2. Marque a opção **Enable GitHub provider**.
3. Cole o **Client ID** e o **Client Secret** obtidos no GitHub.
4. Clique em **Save**.

---

### 2. Configurando o Provider Google no Supabase

#### A. Criar as Credenciais no Google Cloud Console:
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Crie um novo projeto ou selecione um existente.
3. Vá em **APIs & Services** -> **Credentials** -> **Create Credentials** -> **OAuth client ID**.
4. Escolha o tipo **Web application**.
5. Em **Authorized redirect URIs**, adicione:
   - `https://ais-dev-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app/auth/callback`
   - `https://ais-pre-i6hkypgvyybw76vn7nysus-370909874809.us-east1.run.app/auth/callback`
   - `https://<seu-projeto-supabase>.supabase.co/auth/v1/callback`
6. Clique em **Create** e copie o **Client ID** e **Client Secret**.

#### B. Ativar o Provider no Console do Supabase:
1. No painel do Supabase, vá em **Authentication** -> **Providers** -> **Google**.
2. Marque a opção **Enable Google provider**.
3. Cole o **Client ID** e o **Client Secret** gerados no Google.
4. Clique em **Save**.

---

## 🛠️ Executando a Aplicação

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento (Express + Vite + Supabase):
   ```bash
   npm run dev
   ```

3. Acesse a aplicação na porta 3000 ou na URL do ambiente de desenvolvimento.

---

### 🎓 Recursos da CodePlay Prontos para Uso:
- 📱 Interface com suporte a tema claro e escuro.
- 🔐 Autenticação com Supabase e fallback local instantâneo.
- 💻 IDE Integrada Monaco Editor com preview em tempo real.
- 📜 Emissão de Certificados Válidos com Verificação de Autenticidade UUID.
- 🏆 Sistema de Gamificação (XP, Medalhas e Sequência de Dias).
- 🛡️ Painel Administrativo com controle de perfil (Admin vs Aluno).
