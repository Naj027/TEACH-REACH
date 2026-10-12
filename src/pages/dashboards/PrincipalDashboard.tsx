import React from 'react';
import { UserProfile } from '../../types';
import { dataService } from '../../services/dataService';
import { StatCard } from '../../components/common/StatCard';
import { ASSETS } from '../../assets/assetPaths';
import { 
  Award, 
  ClipboardCheck, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  TrendingUp,
  FileText
} from 'lucide-react';

interface Props {
  user: UserProfile;
  onNavigate: (pageId: string) => void;
}

export const PrincipalDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const reviews = dataService.getQuestionReviews();
  const results = dataService.getTeacherResults();
  const discussions = dataService.getDiscussions();
  const interventions = dataService.getInterventions();
  const seminars = dataService.getSeminars();

  const pendingReview = reviews.filter(r => r.status === 'Pending Review');
  const conductedDiscussions = discussions.filter(d => d.status === 'Conducted');
  const activeInterventions = interventions.filter(i => i.status === 'In Progress');

  // Calculate institutional mean
  const overallMean = results.length > 0 
    ? (results.reduce((acc, r) => acc + r.overallMean, 0) / results.length).toFixed(2)
    : '4.00';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
            <span className="font-semibold text-[#B91C1C]">Executive Academic Command</span>
            <span>·</span>
            <span>Davao Central College</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#737373] mt-1 leading-relaxed">
            Institutional overview for the 2nd Semester evaluation cycle. Monitor validated faculty ratings,
            authorise pedagogical question instruments, and track faculty development progress across all collegiate departments.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('process_2')}
              className="px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Review Draft Questionnaire ({pendingReview.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('process_8')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg font-semibold transition-colors"
            >
              Post-Evaluation Conferences
            </button>
          </div>
        </div>

        <div className="absolute right-4 -bottom-6 w-44 h-44 opacity-10 pointer-events-none hidden md:block">
          <img src={ASSETS.seal} alt="DCC Seal" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Institutional Mean"
          value={`${overallMean} / 5.00`}
          subtext="Target benchmark: 4.00"
          icon={Award}
          trend={{ value: '+0.12 vs last sem', positive: true }}
          onClick={() => onNavigate('process_7')}
        />
        <StatCard
          label="Pending Questionnaire Review"
          value={pendingReview.length}
          subtext="Awaiting Principal endorsement"
          icon={ClipboardCheck}
          onClick={() => onNavigate('process_2')}
        />
        <StatCard
          label="Active Interventions"
          value={activeInterventions.length}
          subtext="Faculty growth plans underway"
          icon={Sparkles}
          onClick={() => onNavigate('process_9')}
        />
        <StatCard
          label="Scheduled Seminars"
          value={seminars.length}
          subtext="Upcoming pedagogy workshops"
          icon={GraduationCap}
          onClick={() => onNavigate('process_11_seminars')}
        />
      </div>

      {/* Grid: Pending Action Tasks & Faculty Evaluation Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Faculty Evaluation Summary Table */}
        <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Faculty Evaluation Ratings (Process 7.0)
            </h3>
            <button
              onClick={() => onNavigate('process_7')}
              className="text-xs text-[#B91C1C] hover:underline font-semibold flex items-center gap-1"
            >
              View Full Analytics <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {results.map((res) => (
              <div 
                key={res.teacherId}
                onClick={() => onNavigate('process_7')}
                className="p-3.5 rounded-xl border border-[#E5E5E5] hover:border-[#B91C1C]/40 hover:bg-slate-50/60 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-[#171717]">{res.teacherName}</h4>
                  <p className="text-[#737373] text-[11px]">{res.department} · {res.totalResponses} submissions</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-[#171717] tabular-nums">
                    {res.overallMean.toFixed(2)}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    res.overallMean >= 4.5 ? 'bg-emerald-100 text-emerald-800' :
                    res.overallMean >= 4.0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {res.qualitativeInterpretation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending Executive Tasks & Conferences */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-[#171717] pb-3 border-b border-[#E5E5E5]">
              Executive Action Queue
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/60 flex items-start gap-3">
                <ClipboardCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold text-amber-950 block">Questionnaire AY2025-2026.v3</span>
                  <p className="text-amber-900 text-[11px] mt-0.5">
                    Summer Term draft criteria awaiting Principal validation signoff.
                  </p>
                  <button
                    onClick={() => onNavigate('process_2')}
                    className="mt-2 text-[11px] font-bold text-[#B91C1C] hover:underline"
                  >
                    Open Review Gate →
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#E5E5E5] bg-slate-50 flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold text-[#171717] block">Post-Evaluation Conference</span>
                  <p className="text-[#737373] text-[11px] mt-0.5">
                    Scheduled with Prof. Aniceto Morales on April 28, 2026.
                  </p>
                  <button
                    onClick={() => onNavigate('process_8')}
                    className="mt-2 text-[11px] font-bold text-[#B91C1C] hover:underline"
                  >
                    View Conference Notes →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
