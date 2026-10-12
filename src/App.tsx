import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from './types';
import { dataService } from './services/dataService';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';

// Process Pages
import { Process1EvaluationQuestions } from './pages/processes/Process1EvaluationQuestions';
import { Process2QuestionReview } from './pages/processes/Process2QuestionReview';
import { Process3EvaluationSchedule } from './pages/processes/Process3EvaluationSchedule';
import { Process4GoogleFormsLinks } from './pages/processes/Process4GoogleFormsLinks';
import { Process5EvaluationDistribution } from './pages/processes/Process5EvaluationDistribution';
import { Process6StudentEvaluation } from './pages/processes/Process6StudentEvaluation';
import { Process7PerformanceRatings } from './pages/processes/Process7PerformanceRatings';
import { Process8DiscussionFollowUp } from './pages/processes/Process8DiscussionFollowUp';
import { Process9InterventionPrograms } from './pages/processes/Process9InterventionPrograms';
import { Process10ImprovementMonitoring } from './pages/processes/Process10ImprovementMonitoring';
import { Process11SeminarsAndTraining } from './pages/processes/Process11SeminarsAndTraining';
import { Process11HREmploymentIntervention } from './pages/processes/Process11HREmploymentIntervention';
import { DfdWorkflowExplorer } from './pages/DfdWorkflowExplorer';

// Role Dashboards
import { PrincipalDashboard } from './pages/dashboards/PrincipalDashboard';
import { GuidanceDashboard } from './pages/dashboards/GuidanceDashboard';
import { CoordinatorDashboard } from './pages/dashboards/CoordinatorDashboard';
import { TeacherDashboard } from './pages/dashboards/TeacherDashboard';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { HRDashboard } from './pages/dashboards/HRDashboard';

import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => dataService.getCurrentRole());
  const [activeNavId, setActiveNavId] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  const currentUser: UserProfile = dataService.getUserProfile(currentRole);

  const handleSelectRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    dataService.setCurrentRole(newRole);
    setActiveNavId('dashboard'); // return to role's dashboard on switch
  };

  const handleResetData = () => {
    dataService.resetAllData();
    window.location.reload();
  };

  // Determine human-readable page title for Header
  const getPageTitle = (navId: string): string => {
    switch (navId) {
      case 'dashboard':
        return `${currentUser.title} Dashboard`;
      case 'process_1':
        return 'Process 1.0 — Evaluation Questions Management';
      case 'process_2':
        return 'Process 2.0 — Questionnaire Review & Validation';
      case 'process_3':
      case 'announcements':
        return 'Process 3.0 — Evaluation Schedules & Memoranda';
      case 'process_4':
        return 'Process 4.0 — Google Forms Evaluation Links';
      case 'process_5':
        return 'Process 5.0 — Class Group Chat Distribution';
      case 'process_6':
      case 'available_evaluations':
      case 'completion_status':
        return 'Process 6.0 — Student Faculty Evaluation';
      case 'process_7':
      case 'my_results':
      case 'teacher_results':
      case 'reports':
        return 'Process 7.0 — Teaching Performance Overall Ratings';
      case 'process_8':
      case 'teacher_feedback':
        return 'Process 8.0 — Evaluation Discussion & Follow-up';
      case 'process_9':
        return 'Process 9.0 — Intervention Programs';
      case 'process_10':
        return 'Process 10.0 — Improvement Monitoring & Observations';
      case 'process_11_seminars':
        return 'Process 11.0 — Seminars & Pedagogical Training';
      case 'process_11_hr':
      case 'hr_documentation':
      case 'hr_policies':
      case 'hr_status':
        return 'Process 11.0 — Authorized HR Employment Due Process';
      case 'dfd_explorer':
        return 'TeachReach DFD System Architecture';
      case 'responses':
        return 'Evaluation Responses Data Store';
      default:
        return 'TeachReach Platform';
    }
  };

  // Role Authorization Check
  const isAuthorized = (navId: string, role: UserRole): boolean => {
    if (navId === 'dashboard' || navId === 'dfd_explorer') return true;

    switch (role) {
      case 'principal':
        return ['process_1', 'process_2', 'process_7', 'process_8', 'process_9', 'process_11_seminars', 'reports'].includes(navId);
      case 'guidance':
        return ['process_3', 'announcements', 'process_4', 'responses', 'process_7', 'teacher_results', 'process_9', 'process_10', 'reports'].includes(navId);
      case 'coordinator':
        return ['process_2', 'process_7', 'process_8', 'process_10', 'process_9'].includes(navId);
      case 'teacher':
        return ['announcements', 'process_5', 'my_results', 'teacher_feedback', 'process_10', 'process_11_seminars'].includes(navId);
      case 'student':
        return ['announcements', 'available_evaluations', 'process_6', 'completion_status'].includes(navId);
      case 'hr':
        return ['process_11_hr', 'hr_documentation', 'hr_policies', 'hr_status'].includes(navId);
      default:
        return false;
    }
  };

  const renderContent = () => {
    // Check permission
    if (!isAuthorized(activeNavId, currentRole)) {
      return (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-red-100 text-[#B91C1C] rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#171717]">Access Restricted</h3>
          <p className="text-xs text-[#737373] leading-relaxed">
            In accordance with Davao Central College Data Flow Diagram security protocols,
            the <strong>{currentRole.toUpperCase()}</strong> role is not authorized to access this module.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveNavId('dashboard')}
              className="px-4 py-2 bg-[#B91C1C] text-white text-xs font-semibold rounded-lg hover:bg-[#991B1B] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Your Dashboard
            </button>
          </div>
        </div>
      );
    }

    // Render by Nav ID
    if (activeNavId === 'dashboard') {
      switch (currentRole) {
        case 'principal':
          return <PrincipalDashboard user={currentUser} onNavigate={setActiveNavId} />;
        case 'guidance':
          return <GuidanceDashboard user={currentUser} onNavigate={setActiveNavId} />;
        case 'coordinator':
          return <CoordinatorDashboard user={currentUser} onNavigate={setActiveNavId} />;
        case 'teacher':
          return <TeacherDashboard user={currentUser} onNavigate={setActiveNavId} />;
        case 'student':
          return <StudentDashboard user={currentUser} onNavigate={setActiveNavId} />;
        case 'hr':
          return <HRDashboard user={currentUser} onNavigate={setActiveNavId} />;
      }
    }

    if (activeNavId === 'dfd_explorer') {
      return <DfdWorkflowExplorer onNavigate={setActiveNavId} />;
    }

    // Process mappings
    switch (activeNavId) {
      case 'process_1':
        return <Process1EvaluationQuestions />;
      case 'process_2':
        return <Process2QuestionReview />;
      case 'process_3':
      case 'announcements':
        return <Process3EvaluationSchedule />;
      case 'process_4':
        return <Process4GoogleFormsLinks />;
      case 'process_5':
        return <Process5EvaluationDistribution />;
      case 'process_6':
      case 'available_evaluations':
      case 'completion_status':
        return <Process6StudentEvaluation onEvaluationCompleted={() => setActiveNavId('dashboard')} />;
      case 'process_7':
      case 'my_results':
      case 'teacher_results':
      case 'reports':
      case 'responses':
        return <Process7PerformanceRatings currentRole={currentRole} currentTeacherId={currentUser.id} />;
      case 'process_8':
      case 'teacher_feedback':
        return <Process8DiscussionFollowUp currentRole={currentRole} />;
      case 'process_9':
        return <Process9InterventionPrograms />;
      case 'process_10':
        return <Process10ImprovementMonitoring />;
      case 'process_11_seminars':
        return <Process11SeminarsAndTraining />;
      case 'process_11_hr':
      case 'hr_documentation':
      case 'hr_policies':
      case 'hr_status':
        return <Process11HREmploymentIntervention />;
      default:
        return <PrincipalDashboard user={currentUser} onNavigate={setActiveNavId} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171717] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentRole={currentRole}
        activeNavId={activeNavId}
        onSelectNav={setActiveNavId}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentUser={currentUser}
          currentRole={currentRole}
          onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setIsMobileSidebarOpen(true);
            } else {
              setIsSidebarCollapsed(!isSidebarCollapsed);
            }
          }}
          onResetData={handleResetData}
          pageTitle={getPageTitle(activeNavId)}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Demonstration Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
      />
    </div>
  );
}
