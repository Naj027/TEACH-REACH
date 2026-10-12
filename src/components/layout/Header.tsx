import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';
import { ASSETS } from '../../assets/assetPaths';
import { 
  Bell, 
  Menu, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile;
  currentRole: UserRole;
  onOpenRoleSwitcher: () => void;
  onToggleSidebar: () => void;
  onResetData: () => void;
  pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentRole,
  onOpenRoleSwitcher,
  onToggleSidebar,
  onResetData,
  pageTitle
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E5E5E5] px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & breadcrumb/page title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-slate-100 transition-colors focus-visible:outline-hidden"
          title="Toggle Navigation Sidebar"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C] hidden sm:inline">
            TeachReach
          </span>
          <span className="text-xs text-slate-300 hidden sm:inline">/</span>
          <h1 className="text-sm lg:text-base font-semibold text-[#171717] truncate">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right Controls: Demo Role Badge, Notification Bell, Reset Data, Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Role Switcher Pill / Button */}
        <button
          onClick={onOpenRoleSwitcher}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FEE2E2]/80 border border-[#B91C1C]/20 transition-colors text-xs font-medium cursor-pointer"
          title="Click to switch between Principal, Guidance Counselor, Coordinator, Teacher, Student, and HR roles"
        >
          <ShieldCheck className="w-4 h-4 text-[#B91C1C]" />
          <span className="hidden md:inline font-semibold">Demo Role:</span>
          <span className="capitalize font-bold">{currentRole.replace('_', ' ')}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </button>

        {/* Reset Demo Data button */}
        <div className="relative">
          <button
            onClick={() => setShowResetConfirm(!showResetConfirm)}
            className="p-2 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-slate-100 transition-colors"
            title="Reset demonstration data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {showResetConfirm && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5E5E5] rounded-xl shadow-lg p-3 z-50 text-xs">
              <p className="font-semibold text-[#171717]">Reset Demo State?</p>
              <p className="text-[#737373] mt-1">
                Restores default questionnaire, schedules, and evaluation analytics.
              </p>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetData();
                    setShowResetConfirm(false);
                  }}
                  className="px-2.5 py-1 bg-[#B91C1C] text-white rounded font-medium hover:bg-[#991B1B]"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-slate-100 transition-colors"
            title="Institutional Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#B91C1C] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E5E5] rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-3 border-b border-[#E5E5E5] bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-[#B91C1C]" />
                  <span className="text-xs font-semibold text-[#171717]">DCC System Notices</span>
                </div>
                <span className="text-[11px] text-[#737373]">2 New</span>
              </div>
              <div className="divide-y divide-[#E5E5E5] max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#171717]">2nd Sem Faculty Evaluation Active</span>
                    <span className="text-[10px] text-[#737373]">Today</span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Guidance Office memo DCC-VPAA-MEMO-2026-042 is now open for collegiate classes.
                  </p>
                </div>
                <div className="p-3 hover:bg-slate-50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#171717]">Faculty Development Seminar</span>
                    <span className="text-[10px] text-[#737373]">Yesterday</span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Pedagogy & Classroom Facilitation Workshop scheduled for May 8-9 in AVR-1.
                  </p>
                </div>
              </div>
              <div className="p-2 border-t border-[#E5E5E5] bg-slate-50 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#B91C1C] font-semibold hover:underline"
                >
                  Dismiss Notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile display */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E5E5E5]">
          <div className="w-8 h-8 rounded-lg bg-[#B91C1C] text-white flex items-center justify-center font-bold text-xs">
            {currentUser.avatarInitials}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-[#171717] leading-tight truncate max-w-[150px]">
              {currentUser.name}
            </p>
            <p className="text-[11px] text-[#737373] leading-tight truncate max-w-[150px]">
              {currentUser.title}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
