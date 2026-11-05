import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Play,
  RotateCcw,
  Trash2,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
  Save,
  Code2,
  Sparkles,
  Check,
  Eye,
  FileCode,
  FolderPlus
} from 'lucide-react';

const DEFAULT_STARTER = {
  html: `<div class="codeplay-box">
  <h1>✨ Meu Projeto CodePlay</h1>
  <p>Altere o HTML, CSS ou JavaScript para ver a mágica acontecer ao vivo!</p>
  <button id="btnInterativo">Clique em Mim 🚀</button>
  <div id="resultado"></div>
</div>`,
  css: `body {
  font-family: 'Poppins', sans-serif;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.codeplay-box {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(105, 87, 232, 0.1);
  text-align: center;
  max-width: 400px;
}

h1 {
  color: #6957E8;
  font-size: 22px;
  margin-top: 0;
}

p {
  color: #64748b;
  font-size: 14px;
}

button {
  background: #6957E8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #5140C7;
  transform: scale(1.05);
}`,
  js: `document.getElementById('btnInterativo').addEventListener('click', function() {
  const res = document.getElementById('resultado');
  res.innerHTML = '<p style="color:#19B98B;font-weight:bold;margin-top:16px;">Parabéns! O JavaScript funcionou perfeitamente! 🎉</p>';
});`
};

export const CodePlayground: React.FC = () => {
  const { theme } = useTheme();
  const { playgroundInitialCode, saveProject, showToast } = useProgress();

  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(playgroundInitialCode?.html || DEFAULT_STARTER.html);
  const [cssCode, setCssCode] = useState(playgroundInitialCode?.css || DEFAULT_STARTER.css);
  const [jsCode, setJsCode] = useState(playgroundInitialCode?.js || DEFAULT_STARTER.js);

  const [projectTitle, setProjectTitle] = useState(playgroundInitialCode?.title || 'Novo Projeto CodePlay');
  const [autoRun, setAutoRun] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [srcDoc, setSrcDoc] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Update initial code if passed from lesson
  useEffect(() => {
    if (playgroundInitialCode) {
      setHtmlCode(playgroundInitialCode.html);
      setCssCode(playgroundInitialCode.css);
      setJsCode(playgroundInitialCode.js);
      setProjectTitle(playgroundInitialCode.title || 'Exemplo Carregado');
    }
  }, [playgroundInitialCode]);

  // Combined compiled code execution
  const updatePreview = () => {
    const combined = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch (err) {
              console.error(err);
              document.body.innerHTML += '<div style="color:red;background:#ffe6e6;padding:10px;margin-top:10px;border-radius:6px;font-family:monospace;">⚠️ Erro JS: ' + err.message + '</div>';
            }
          </script>
        </body>
      </html>
    `;
    setSrcDoc(combined);
  };

  useEffect(() => {
    if (autoRun) {
      const timeout = setTimeout(() => {
        updatePreview();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [htmlCode, cssCode, jsCode, autoRun]);

  // Initial load
  useEffect(() => {
    updatePreview();
  }, []);

  const handleReset = () => {
    setHtmlCode(DEFAULT_STARTER.html);
    setCssCode(DEFAULT_STARTER.css);
    setJsCode(DEFAULT_STARTER.js);
    showToast('Código Restaurado', 'Exemplo padrão recarregado no laboratório.', 'info');
  };

  const handleClear = () => {
    if (activeEditorTab === 'html') setHtmlCode('');
    if (activeEditorTab === 'css') setCssCode('');
    if (activeEditorTab === 'js') setJsCode('');
    showToast('Aba Limpa', `O código da aba ${activeEditorTab.toUpperCase()} foi limpo.`, 'info');
  };

  const handleSaveProject = () => {
    setIsSaving(true);
    saveProject({
      title: projectTitle,
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      description: 'Projeto criado no Laboratório CodePlay IDE.',
    });
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className={`space-y-4 animate-fade-in ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 overflow-hidden' : 'pb-12'}`}>
      {/* IDE Control Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="font-bold text-base bg-transparent text-slate-900 dark:text-white border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1"
              placeholder="Nome do Projeto..."
            />
            <p className="text-[11px] text-slate-400 px-1">
              Laboratório Integrado CodePlay
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={updatePreview}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Executar</span>
          </button>

          <button
            onClick={() => setAutoRun(!autoRun)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              autoRun
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {autoRun ? '⚡ Auto-Execução ON' : 'Pausado'}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            title="Restaurar Exemplo Padrão"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleClear}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            title="Limpar Código da Aba Atual"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleSaveProject}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Projeto'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            title={isFullscreen ? 'Sair do Modo Tela Cheia' : 'Tela Cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split IDE Area: Left Code Editors / Right Preview */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${isFullscreen ? 'h-[calc(100vh-6rem)]' : 'min-h-[550px]'}`}>
        
        {/* Left Pane: Editor Tabs & Code Canvas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-md">
          {/* Editor Tabs Header */}
          <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveEditorTab('html')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeEditorTab === 'html'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-orange-400" />
                <span>index.html</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('css')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeEditorTab === 'css'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                <span>styles.css</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('js')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeEditorTab === 'js'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-yellow-400" />
                <span>script.js</span>
              </button>
            </div>

            <span className="text-[10px] text-slate-500 font-mono">Monaco IDE CodePlay</span>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 relative min-h-[380px]">
            {activeEditorTab === 'html' && (
              <Editor
                height="100%"
                language="html"
                theme="vs-dark"
                value={htmlCode}
                onChange={(val) => setHtmlCode(val || '')}
                options={{
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            )}

            {activeEditorTab === 'css' && (
              <Editor
                height="100%"
                language="css"
                theme="vs-dark"
                value={cssCode}
                onChange={(val) => setCssCode(val || '')}
                options={{
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            )}

            {activeEditorTab === 'js' && (
              <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={jsCode}
                onChange={(val) => setJsCode(val || '')}
                options={{
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            )}
          </div>
        </div>

        {/* Right Pane: Isolated Sandbox Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-md">
          {/* Preview Header Bar */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">
                Pré-visualização em Tempo Real
              </span>
            </div>

            {/* Viewport Simulator Controls */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewportMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Desktop (Computador)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewportMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Celular (Smartphone)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="flex-1 bg-slate-950/50 p-4 flex items-center justify-center overflow-auto">
            <div
              className={`bg-white rounded-xl shadow-2xl transition-all overflow-hidden border border-slate-800 ${
                viewportMode === 'mobile' ? 'w-[360px] h-[520px]' : 'w-full h-full min-h-[380px]'
              }`}
            >
              <iframe
                srcDoc={srcDoc}
                title="Preview"
                sandbox="allow-scripts"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
