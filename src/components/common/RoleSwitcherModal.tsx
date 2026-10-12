import React from 'react';
import { UserRole } from '../../types';
import { SYSTEM_ROLES } from '../../services/dataService';
import { X, ShieldCheck, Check } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

const ROLE_DESCRIPTIONS: Record<UserRole, { summary: string; dfdProcesses: string }> = {
  principal: {
    summary: 'Executive school head overseeing institutional evaluation questions, approval reviews, overall ratings, conferences, and interventions.',
    dfdProcesses: 'Processes 1, 2, 7, 8, 9, 11'
  },
  guidance: {
    summary: 'Operational testing & guidance center head managing schedules, announcements, Google Forms links, response collection, and ratings.',
    dfdProcesses: 'Processes 3, 4, 6, 7, 9, 10'
  },
  coordinator: {
    summary: 'Academic officer reviewing questions, participating in teacher post-evaluation discussions, and drafting improvement recommendations.',
    dfdProcesses: 'Processes 2, 7, 8, 10'
  },
  teacher: {
    summary: 'Faculty member receiving evaluation announcements, distributing form links to class group chats, and viewing confidential released ratings.',
    dfdProcesses: 'Processes 3, 5, 7 (released only), 8, 9, 11'
  },
  student: {
    summary: 'Enrolled collegiate student submitting strictly anonymous faculty evaluations using the 5-point Likert questionnaire.',
    dfdProcesses: 'Processes 3, 6 (Anonymous appraisal)'
  },
  hr: {
    summary: 'Human Resource Officer managing authorized human employment due process referrals under the DCC Faculty Manual (strictly non-automated).',
    dfdProcesses: 'Process 11 (HR Due Process pathway)'
  }
};

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#B91C1C]" />
            <div>
              <h2 className="text-base font-semibold text-[#171717]">Switch Demonstration Role</h2>
              <p className="text-xs text-[#737373]">
                Role switching is enabled exclusively for system evaluation and UI testing.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#737373] hover:text-[#171717] rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {(Object.keys(SYSTEM_ROLES) as UserRole[]).map((roleKey) => {
            const user = SYSTEM_ROLES[roleKey];
            const meta = ROLE_DESCRIPTIONS[roleKey];
            const isSelected = currentRole === roleKey;

            return (
              <div
                key={roleKey}
                onClick={() => {
                  onSelectRole(roleKey);
                  onClose();
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-4 ${
                  isSelected 
                    ? 'border-[#B91C1C] bg-[#FEE2E2]/25 ring-1 ring-[#B91C1C]' 
                    : 'border-[#E5E5E5] hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                  isSelected ? 'bg-[#B91C1C] text-white' : 'bg-slate-100 text-[#171717]'
                }`}>
                  {user.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#171717]">{user.name}</span>
                      <span className="text-xs uppercase font-medium tracking-wider text-[#B91C1C] bg-[#FEE2E2] px-2 py-0.5 rounded">
                        {roleKey.replace('_', ' ')}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-semibold text-[#B91C1C] flex items-center gap-1">
                        <Check className="w-4 h-4" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#737373] mt-0.5">{user.title} · {user.department}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{meta.summary}</p>
                  <p className="text-[11px] font-mono text-[#B91C1C] mt-1.5 font-medium">
                    DFD Coverage: {meta.dfdProcesses}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 border-t border-[#E5E5E5] bg-slate-50 flex items-center justify-between text-xs text-[#737373]">
          <span>Security Notice: Actual production requires institutional SSO and role-based ACLs.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 text-[#171717] hover:bg-slate-300 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
