import React from 'react';
import { UserProfile } from '../../types';
import { dataService } from '../../services/dataService';
import { StatCard } from '../../components/common/StatCard';
import { 
  Scale, 
  ShieldAlert, 
  FileText, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

interface Props {
  user: UserProfile;
  onNavigate: (pageId: string) => void;
}

export const HRDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const records = dataService.getHREmploymentRecords();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
            <span className="font-semibold text-[#B91C1C]">Human Resource Management Office</span>
            <span>·</span>
            <span>Davao Central College</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#737373] mt-1 leading-relaxed">
            Restricted HR administrative dashboard for authorized faculty due process dockets (Process 11.0 HR pathway).
            Review referred cases, verify statutory due process notices, and maintain institutional personnel compliance.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('process_11_hr')}
              className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Examine Authorized Referral Dockets ({records.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl text-xs text-red-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-950">Statutory Due Process Enforced:</p>
          <p className="text-red-900 leading-relaxed mt-0.5">
            Adverse employment actions are strictly manual and governed by substantive and procedural due process.
            TeachReach enforces human review at every juncture; no termination or sanction may ever be automated.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Active Referral Cases"
          value={records.length}
          subtext="Under human HR officer review"
          icon={Scale}
          onClick={() => onNavigate('process_11_hr')}
        />
        <StatCard
          label="Upcoming Conferences"
          value="1 Scheduled"
          subtext="Administrative hearing"
          icon={Clock}
          onClick={() => onNavigate('process_11_hr')}
        />
        <StatCard
          label="Compliance Standard"
          value="Twin Notice Rule"
          subtext="Labor Code Articles 297-299"
          icon={FileText}
          onClick={() => onNavigate('process_11_hr')}
        />
      </div>

      {/* Active Dockets List */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
          <h3 className="text-sm font-semibold text-[#171717]">
            Active Faculty Employment Review Dockets
          </h3>
          <span className="text-xs text-[#737373]">
            Confidential HR Records
          </span>
        </div>

        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              onClick={() => onNavigate('process_11_hr')}
              className="p-4 rounded-xl border border-[#E5E5E5] hover:bg-slate-50 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#B91C1C]">{rec.caseNumber}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-bold text-[#171717]">{rec.teacherName}</span>
                </div>
                <p className="text-[11px] text-[#737373] mt-0.5">
                  {rec.department} · Referred by: {rec.referralSource}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded font-semibold text-[11px]">
                  {rec.stage}
                </span>
                <span className="text-xs text-[#B91C1C] font-semibold flex items-center gap-1">
                  Examine Docket →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
