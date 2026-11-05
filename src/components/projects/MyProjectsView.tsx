import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { FolderGit2, Play, Trash2, Calendar, Code2, Plus } from 'lucide-react';

export const MyProjectsView: React.FC = () => {
  const { userProjects, deleteProject, openPlaygroundWithCode, setActiveTab } = useProgress();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Meus Projetos no Laboratório</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Biblioteca de códigos e experimentos salvos no seu perfil
          </p>
        </div>

        <button
          onClick={() => setActiveTab('playground')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Projeto</span>
        </button>
      </div>

      {userProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-indigo-500/40 transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(proj.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {proj.description || 'Projeto criado no Laboratório CodePlay.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => openPlaygroundWithCode(proj.html, proj.css, proj.js, proj.title)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Abrir no Editor</span>
                </button>

                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Excluir Projeto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <FolderGit2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Nenhum projeto salvo na biblioteca
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Abra o Laboratório IDE e clique em "Salvar Projeto" para armazenar seus protótipos aqui.
          </p>
          <button
            onClick={() => setActiveTab('playground')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
          >
            Ir para o Laboratório
          </button>
        </div>
      )}
    </div>
  );
};
