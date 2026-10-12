import React from 'react';
import { UserProfile } from '../../types';
import { dataService } from '../../services/dataService';
import { StatCard } from '../../components/common/StatCard';
import { 
  BarChart3, 
  Share2, 
  GraduationCap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  MessageSquare,
  Lock,
  Copy
} from 'lucide-react';

interface Props {
  user: UserProfile;
  onNavigate: (pageId: string) => void;
}

export const TeacherDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const allResults = dataService.getTeacherResults();
  const myResult = allResults.find(r => r.teacherId === user.id);
  const distributions = dataService.getDistributions().filter(d => d.teacherId === user.id);
  const seminars = dataService.getSeminars();

  const isReleased = myResult?.isReleasedToTeacher;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
            <span className="font-semibold text-[#B91C1C]">Faculty Workspace</span>
            <span>·</span>
            <span>{user.department}</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#737373] mt-1 leading-relaxed">
            Distribute official student evaluation links to your assigned class group chats (Process 5.0),
            view released teaching appraisal analytics (Process 7.0), and explore professional development seminars (Process 11.0).
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('process_5')}
              className="px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Distribute Evaluation Link to Class GC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {isReleased && (
              <button
                onClick={() => onNavigate('my_results')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg font-semibold transition-colors"
              >
                View Released Feedback Summary
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Teaching Mean Rating"
          value={isReleased && myResult ? `${myResult.overallMean.toFixed(2)} / 5.00` : 'Pending'}
          subtext={isReleased ? 'Released by Guidance Office' : 'Under committee evaluation'}
          icon={Award}
          trend={isReleased ? { value: '+0.20 growth', positive: true } : undefined}
          onClick={() => isReleased && onNavigate('my_results')}
        />
        <StatCard
          label="Class GC Link Distribution"
          value={`${distributions.filter(d => d.status === 'Shared').length} / ${distributions.length}`}
          subtext="Sections broadcasted"
          icon={Share2}
          onClick={() => onNavigate('process_5')}
        />
        <StatCard
          label="Student Responses"
          value={isReleased && myResult ? myResult.totalResponses : 'Processing'}
          subtext="Anonymous student submissions"
          icon={BarChart3}
        />
        <StatCard
          label="Faculty Development"
          value={seminars.length}
          subtext="Available training seminars"
          icon={GraduationCap}
          onClick={() => onNavigate('process_11_seminars')}
        />
      </div>

      {/* Grid: Group Chat Distribution Status & Strengths Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Class Group Chat Links Quick Access */}
        <div className="lg:col-span-6 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Class Group Chat Distribution (Process 5.0)
            </h3>
            <button
              onClick={() => onNavigate('process_5')}
              className="text-xs text-[#B91C1C] hover:underline font-semibold"
            >
              Open Distribution Panel →
            </button>
          </div>

          <div className="space-y-3">
            {distributions.map((d) => (
              <div 
                key={d.id}
                className="p-3.5 rounded-lg border border-[#E5E5E5] bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-semibold text-[#171717]">{d.section}</span>
                  <p className="text-[11px] text-[#737373] font-mono mt-0.5">{d.subjectCode}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    d.status === 'Shared' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {d.status}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(d.evaluationLink);
                      alert('Evaluation link copied to clipboard!');
                    }}
                    className="p-1 text-slate-500 hover:text-[#B91C1C]"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Released Highlights or Confidential Notice */}
        <div className="lg:col-span-6 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Pedagogical Strengths & Feedback Summary
            </h3>
            {isReleased && (
              <button
                onClick={() => onNavigate('my_results')}
                className="text-xs text-[#B91C1C] hover:underline font-semibold"
              >
                View Full Dossier →
              </button>
            )}
          </div>

          {isReleased && myResult ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <span className="font-semibold text-emerald-900 block mb-1">
                  Top Instructional Strengths:
                </span>
                <ul className="space-y-1 text-emerald-950">
                  {myResult.strengths.slice(0, 2).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg">
                <span className="font-semibold text-[#171717] block mb-1">
                  Student Qualitative Insights:
                </span>
                <p className="text-slate-700 italic">
                  "{myResult.anonymizedComments[0]?.text || 'Instruction was highly engaging and practical.'}"
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#737373] space-y-2">
              <Lock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-[#171717]">Evaluation Ratings Under Review</p>
              <p>
                Evaluation results are finalized after student grade submission deadlines to protect student academic confidentiality.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
