import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/ui/Toast';

import { OverviewView } from './components/dashboard/OverviewView';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { LessonView } from './components/courses/LessonView';
import { LearningPathView } from './components/courses/LearningPathView';
import { CodePlayground } from './components/playground/CodePlayground';
import { MyProjectsView } from './components/projects/MyProjectsView';
import { CertificateView } from './components/certificates/CertificateView';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsView } from './components/settings/SettingsView';
import { AdminPanel } from './components/admin/AdminPanel';

const MainContent: React.FC<{ onMobileMenuToggle: () => void }> = ({ onMobileMenuToggle }) => {
  const { activeTab, selectedLessonId } = useProgress();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F111A] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onMobileMenuToggle={onMobileMenuToggle} />

      <div className="flex-1 max-w-7xl w-full mx-auto flex items-start">
        {/* Main View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'overview' && <OverviewView />}
          
          {activeTab === 'courses' && (
            selectedLessonId ? <LessonView /> : <CourseCatalog />
          )}

          {activeTab === 'learning-path' && <LearningPathView />}
          {activeTab === 'playground' && <CodePlayground />}
          {activeTab === 'projects' && <MyProjectsView />}
          {activeTab === 'certificates' && <CertificateView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'admin' && <AdminPanel />}
        </main>
      </div>

      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <div className="min-h-screen flex bg-slate-50 dark:bg-[#0F111A] text-slate-900 dark:text-slate-100 transition-colors">
            <Sidebar
              isOpenMobile={isMobileMenuOpen}
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
            <div className="flex-1 flex flex-col min-w-0">
              <MainContent onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
            </div>
          </div>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
