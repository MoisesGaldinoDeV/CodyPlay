import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import { COURSES_DATA } from '../../data/coursesData';
import { Certificate } from '../../types';
import { Award, CheckCircle2, Download, Printer, Copy, Share2, Code2, Sparkles, X } from 'lucide-react';

export const CertificateView: React.FC = () => {
  const { user } = useAuth();
  const { certificates, getCourseProgressPercentage, generateCertificate, showToast } = useProgress();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('Código Copiado!', `Código de validação ${code} copiado para a área de transferência.`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Certificados de Conclusão CodePlay</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Emita e consulte seus certificados com verificação de autenticidade única
        </p>
      </div>

      {/* Earned Certificates Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Seus Certificados Emitidos
        </h2>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm tracking-wide">CodePlay Certified</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">
                      Autêntico ✔
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xl text-white mb-2 leading-tight">
                    {cert.courseTitle}
                  </h3>

                  <div className="space-y-1 text-xs text-indigo-200/80">
                    <p>Emitido para: <strong className="text-white">{cert.userName}</strong></p>
                    <p>Data de Conclusão: <strong className="text-white">{cert.issuedAt}</strong></p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-indigo-800/60 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-indigo-300 truncate">
                    ID: {cert.verificationCode}
                  </span>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-indigo-50 text-xs font-bold transition-all shadow-md shrink-0"
                  >
                    Visualizar & Imprimir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Nenhum certificado emitido ainda
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Conclua 100% das aulas de um dos cursos para emitir seu primeiro certificado com autenticidade verificada!
            </p>
          </div>
        )}
      </div>

      {/* Available Certificates Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Status de Elegibilidade por Curso
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES_DATA.map((course) => {
            const pct = getCourseProgressPercentage(course.id);
            const isEligible = pct >= 100;
            const alreadyIssued = certificates.some((c) => c.courseId === course.id);

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${course.badgeColor}`}>
                      {course.level}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {pct}%
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 mt-2">
                    {course.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {alreadyIssued ? (
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Certificado já Emitido
                    </div>
                  ) : isEligible ? (
                    <button
                      onClick={() => generateCertificate(course.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Emitir Certificado Agora</span>
                    </button>
                  ) : (
                    <div className="text-xs text-slate-400 font-medium">
                      Conclua mais {100 - pct}% para liberar a emissão
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable Certificate Modal Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl max-w-3xl w-full p-8 space-y-6 relative print:p-0 print:border-none print:shadow-none">
            {/* Close Button (Hidden on Print) */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl print:hidden"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate Canvas */}
            <div className="border-8 border-indigo-600/20 p-8 sm:p-12 rounded-2xl text-center space-y-6 bg-gradient-to-b from-slate-50 to-indigo-50/30">
              <div className="flex justify-center items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
                  CP
                </div>
                <div className="text-left">
                  <h3 className="font-extrabold text-2xl tracking-tight text-indigo-900">CodePlay</h3>
                  <p className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Plataforma de Ensino de Programação</p>
                </div>
              </div>

              <div className="py-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Certificado de Conclusão
                </p>

                <p className="text-sm text-slate-600">Certificamos que</p>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif italic text-indigo-950">
                  {selectedCert.userName}
                </h2>

                <p className="text-sm text-slate-600 max-w-lg mx-auto pt-2">
                  concluiu com êxito todas as aulas práticas e exercícios do curso
                </p>

                <h4 className="text-xl font-bold text-indigo-700 max-w-xl mx-auto">
                  "{selectedCert.courseTitle}"
                </h4>
              </div>

              <div className="pt-8 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
                <div className="text-left">
                  <p>Data de Emissão: <strong>{selectedCert.issuedAt}</strong></p>
                  <p className="font-mono mt-1">Código Único: {selectedCert.verificationCode}</p>
                </div>

                <div className="text-right">
                  <div className="w-32 border-b border-slate-400 mb-1" />
                  <p className="font-bold text-slate-800">Prof. Carlos Dev</p>
                  <p className="text-[10px]">Diretor de Ensino CodePlay</p>
                </div>
              </div>
            </div>

            {/* Print & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 print:hidden">
              <button
                onClick={() => handleCopyCode(selectedCert.verificationCode)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>Copiar Código de Autenticidade</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar em PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
