import React from 'react';
import { UserRole } from '../../types';
import { ASSETS } from '../../assets/assetPaths';
import {
  LayoutDashboard,
  FileQuestion,
  ClipboardCheck,
  CalendarDays,
  Megaphone,
  Link2,
  Share2,
  PenTool,
  CheckCircle2,
  BarChart3,
  MessagesSquare,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Scale,
  FileText,
  ShieldAlert,
  Network,
  ChevronLeft,
  ChevronRight,
  BookOpenCheck
} from 'lucide-react';

export interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  dfdProcess?: string;
  badge?: string;
}

interface SidebarProps {
  currentRole: UserRole;
  activeNavId: string;
  onSelectNav: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeNavId,
  onSelectNav,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  // Navigation mapping derived directly from Section 4 of user instructions
  const getRoleNavItems = (role: UserRole): NavItemConfig[] => {
    switch (role) {
      case 'principal':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'process_1', label: 'Evaluation Questions', icon: FileQuestion, dfdProcess: 'P1' },
          { id: 'process_2', label: 'Questionnaire Review', icon: ClipboardCheck, dfdProcess: 'P2' },
          { id: 'process_7', label: 'Teacher Evaluation Results', icon: BarChart3, dfdProcess: 'P7' },
          { id: 'process_8', label: 'Discussion and Follow-up', icon: MessagesSquare, dfdProcess: 'P8' },
          { id: 'process_9', label: 'Intervention Programs', icon: Sparkles, dfdProcess: 'P9' },
          { id: 'process_11_seminars', label: 'Seminars and Training', icon: GraduationCap, dfdProcess: 'P11' },
          { id: 'reports', label: 'Reports & Analytics', icon: FileText, dfdProcess: 'Summary' }
        ];

      case 'guidance':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'process_3', label: 'Evaluation Schedule', icon: CalendarDays, dfdProcess: 'P3' },
          { id: 'announcements', label: 'Announcements', icon: Megaphone, dfdProcess: 'P3' },
          { id: 'process_4', label: 'Google Forms Links', icon: Link2, dfdProcess: 'P4' },
          { id: 'responses', label: 'Evaluation Responses', icon: BookOpenCheck, dfdProcess: 'Data Store' },
          { id: 'process_7', label: 'Performance Ratings', icon: BarChart3, dfdProcess: 'P7' },
          { id: 'teacher_results', label: 'Teacher Results', icon: FileText, dfdProcess: 'P7' },
          { id: 'process_9', label: 'Intervention Programs', icon: Sparkles, dfdProcess: 'P9' },
          { id: 'process_10', label: 'Improvement Monitoring', icon: TrendingUp, dfdProcess: 'P10' },
          { id: 'reports', label: 'Reports', icon: FileText, dfdProcess: 'Summary' }
        ];

      case 'coordinator':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'process_2', label: 'Questionnaire Review', icon: ClipboardCheck, dfdProcess: 'P2' },
          { id: 'process_7', label: 'Teacher Evaluation Results', icon: BarChart3, dfdProcess: 'P7' },
          { id: 'process_8', label: 'Discussion and Follow-up', icon: MessagesSquare, dfdProcess: 'P8' },
          { id: 'process_10', label: 'Improvement Reports', icon: TrendingUp, dfdProcess: 'P10' },
          { id: 'process_9', label: 'Intervention Recommendations', icon: Sparkles, dfdProcess: 'P9' }
        ];

      case 'teacher':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'announcements', label: 'Evaluation Announcements', icon: Megaphone, dfdProcess: 'P3' },
          { id: 'process_5', label: 'Evaluation Link Distribution', icon: Share2, dfdProcess: 'P5' },
          { id: 'my_results', label: 'My Evaluation Results', icon: BarChart3, dfdProcess: 'P7' },
          { id: 'teacher_feedback', label: 'Feedback', icon: MessagesSquare, dfdProcess: 'P8' },
          { id: 'process_10', label: 'Improvement Plan', icon: TrendingUp, dfdProcess: 'P10' },
          { id: 'process_11_seminars', label: 'Professional Development', icon: GraduationCap, dfdProcess: 'P11' }
        ];

      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'announcements', label: 'Evaluation Announcements', icon: Megaphone, dfdProcess: 'P3' },
          { id: 'available_evaluations', label: 'Available Evaluations', icon: Link2, dfdProcess: 'P4' },
          { id: 'process_6', label: 'Evaluation Form', icon: PenTool, dfdProcess: 'P6', badge: 'Active' },
          { id: 'completion_status', label: 'Completion Status', icon: CheckCircle2, dfdProcess: 'P6' }
        ];

      case 'hr':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'process_11_hr', label: 'Authorized Employment Referrals', icon: Scale, dfdProcess: 'P11' },
          { id: 'hr_documentation', label: 'Employment Documentation', icon: FileText, dfdProcess: 'P11' },
          { id: 'hr_policies', label: 'Policy References', icon: ShieldAlert, dfdProcess: 'Manual' },
          { id: 'hr_status', label: 'Review Status', icon: ClipboardCheck, dfdProcess: 'P11' }
        ];

      default:
        return [];
    }
  };

  const navItems = getRoleNavItems(currentRole);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E5E5E5] text-[#171717]">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-[#FEE2E2] border border-[#B91C1C]/20 flex items-center justify-center">
            <img 
              src={ASSETS.seal} 
              alt="Davao Central College Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {!isCollapsed && (
            <div className="leading-tight truncate">
              <span className="font-bold text-base text-[#B91C1C] tracking-tight block">TeachReach</span>
              <span className="text-[11px] font-medium text-[#737373] block truncate">
                Davao Central College
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1 rounded-md text-[#737373] hover:text-[#171717] hover:bg-slate-100 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Title Banner */}
      {!isCollapsed && (
        <div className="px-4 py-2.5 bg-slate-50 border-b border-[#E5E5E5] flex items-center justify-between text-xs">
          <span className="text-[#737373] font-medium">Active Workspace</span>
          <span className="text-[#B91C1C] font-semibold uppercase tracking-wider text-[11px]">
            {currentRole}
          </span>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNavId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectNav(item.id);
                onCloseMobile();
              }}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-[#FEE2E2] text-[#B91C1C] font-semibold border border-[#B91C1C]/30'
                  : 'text-[#171717] hover:bg-slate-100 hover:text-[#171717]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#B91C1C]' : 'text-[#737373]'}`} />
              
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.dfdProcess && (
                    <span className="text-[10px] font-mono text-[#737373] ml-2 shrink-0">
                      {item.dfdProcess}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-[10px] font-semibold bg-[#B91C1C] text-white px-1.5 py-0.2 rounded-xs ml-2">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* DFD Architecture Explorer Link */}
      <div className="p-3 border-t border-[#E5E5E5] bg-slate-50">
        <button
          onClick={() => {
            onSelectNav('dfd_explorer');
            onCloseMobile();
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
            activeNavId === 'dfd_explorer'
              ? 'bg-[#B91C1C] text-white'
              : 'bg-white border border-[#E5E5E5] text-[#171717] hover:border-[#B91C1C]/40'
          }`}
          title="Inspect the 11 DFD processes, entities, and data flows"
        >
          <Network className={`w-4 h-4 shrink-0 ${activeNavId === 'dfd_explorer' ? 'text-white' : 'text-[#B91C1C]'}`} />
          {!isCollapsed && (
            <div className="truncate">
              <span className="block font-semibold">DFD System Workflow</span>
              <span className={`text-[10px] block truncate ${activeNavId === 'dfd_explorer' ? 'text-red-100' : 'text-[#737373]'}`}>
                11 Processes & 6 Roles
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Institutional Footer */}
      {!isCollapsed && (
        <div className="p-3 text-[11px] text-[#737373] border-t border-[#E5E5E5] text-center">
          <span>Davao Central College · Est. 1924</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:block shrink-0 transition-all duration-200 z-20 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="fixed top-0 bottom-0 left-0 transition-all duration-200 z-20" style={{ width: isCollapsed ? '5rem' : '16rem' }}>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
