import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COURSES_DATA } from '../../data/coursesData';
import { useProgress } from '../../context/ProgressContext';
import {
  Shield,
  Users,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  BarChart3,
  Award,
  Layers,
  FileText,
  AlertCircle
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { isAdmin, user } = useAuth();
  const { certificates, showToast } = useProgress();

  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'courses' | 'users' | 'certificates'>('stats');
  
  // Quick course edit modal state
  const [editingCourseTitle, setEditingCourseTitle] = useState('');
  const [editingCourseDesc, setEditingCourseDesc] = useState('');
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="font-bold text-xl text-slate-900 dark:text-white">
          Acesso Restrito ao Painel Administrativo
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Você está conectado como perfil de Aluno. Apenas usuários com permissão de Administrador possuem acesso às ferramentas de gerenciamento de cursos e usuários.
        </p>
      </div>
    );
  }

  const handleSaveCourseEdits = () => {
    showToast('Curso Atualizado!', 'As alterações do curso foram salvas com sucesso.', 'success');
    setSelectedCourseForEdit(null);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Painel Administrativo CodePlay
            </h1>
            <p className="text-xs text-indigo-200 mt-1">
              Gerenciamento completo de cursos, aulas, usuários e métricas do sistema
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
          Acesso Geral Liberado
        </span>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'stats'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Visão Geral & Estatísticas</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Gerenciar Cursos & Aulas</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'users'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Alunos & Permissões</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('certificates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeAdminTab === 'certificates'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificados ({certificates.length})</span>
        </button>
      </div>

      {/* Tab 1: System Statistics */}
      {activeAdminTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total de Cursos</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{COURSES_DATA.length}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Módulos Cadastrados</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">3 Módulos</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Aulas Publicadas</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12 Aulas Didáticas</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Certificados Emitidos</span>
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{certificates.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Courses */}
      {activeAdminTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Cursos Cadastrados na Plataforma
            </h2>
            <button
              onClick={() => showToast('Novo Curso', 'Formulário de cadastro ativado.', 'info')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Curso</span>
            </button>
          </div>

          <div className="space-y-4">
            {COURSES_DATA.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${c.badgeColor}`}>
                      {c.level}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {c.modules[0].lessons.length} Aulas
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {c.description}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedCourseForEdit(c.id);
                      setEditingCourseTitle(c.title);
                      setEditingCourseDesc(c.description);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Users */}
      {activeAdminTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Usuários Cadastrados
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase text-[10px] font-bold text-slate-400">
                <tr>
                  <th className="p-3">Nome / E-mail</th>
                  <th className="p-3">Função</th>
                  <th className="p-3">XP</th>
                  <th className="p-3">Sequência</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                <tr>
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                      A
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Alex Silva</div>
                      <div className="text-[10px] text-slate-400">aluno@codeplay.com</div>
                    </div>
                  </td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-[10px] font-bold">Aluno</span></td>
                  <td className="p-3 font-mono font-bold">350 XP</td>
                  <td className="p-3">4 dias</td>
                  <td className="p-3 text-indigo-600 cursor-pointer font-bold">Gerenciar</td>
                </tr>
                <tr>
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                      C
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Prof. Carlos Dev</div>
                      <div className="text-[10px] text-slate-400">admin@codeplay.com</div>
                    </div>
                  </td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 text-[10px] font-bold">Admin</span></td>
                  <td className="p-3 font-mono font-bold">2500 XP</td>
                  <td className="p-3">30 dias</td>
                  <td className="p-3 text-indigo-600 cursor-pointer font-bold">Gerenciar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for editing course */}
      {selectedCourseForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Editar Dados do Curso
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Título:</label>
              <input
                type="text"
                value={editingCourseTitle}
                onChange={(e) => setEditingCourseTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Descrição:</label>
              <textarea
                value={editingCourseDesc}
                onChange={(e) => setEditingCourseDesc(e.target.value)}
                rows={3}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedCourseForEdit(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCourseEdits}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
