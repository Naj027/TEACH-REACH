import React from 'react';
import { UserProfile } from '../../types';
import { dataService } from '../../services/dataService';
import { StatCard } from '../../components/common/StatCard';
import { 
  ClipboardCheck, 
  MessagesSquare, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';

interface Props {
  user: UserProfile;
  onNavigate: (pageId: string) => void;
}

export const CoordinatorDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const reviews = dataService.getQuestionReviews();
  const discussions = dataService.getDiscussions();
  const improvements = dataService.getImprovements();
  const interventions = dataService.getInterventions();

  const pendingDiscussions = discussions.filter(d => d.status === 'Scheduled');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
            <span className="font-semibold text-[#B91C1C]">Academic Affairs Coordination</span>
            <span>·</span>
            <span>Davao Central College</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#737373] mt-1 leading-relaxed">
            Monitor curricular teaching standards, conduct constructive teacher conferences (Process 8.0),
            audit proposed questionnaire items (Process 2.0), and follow up on faculty improvement milestones (Process 10.0).
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('process_8')}
              className="px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Conduct Teacher Conference ({pendingDiscussions.length} Pending)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('process_10')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg font-semibold transition-colors"
            >
              Log Classroom Observation Visit
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pending Conferences"
          value={pendingDiscussions.length}
          subtext="Post-evaluation discussions"
          icon={MessagesSquare}
          onClick={() => onNavigate('process_8')}
        />
        <StatCard
          label="Questionnaires for Audit"
          value={reviews.length}
          subtext="Curricular instrument criteria"
          icon={ClipboardCheck}
          onClick={() => onNavigate('process_2')}
        />
        <StatCard
          label="Active Mentoring Trackers"
          value={improvements.length}
          subtext="Classroom observation files"
          icon={TrendingUp}
          onClick={() => onNavigate('process_10')}
        />
        <StatCard
          label="Intervention Recommendations"
          value={interventions.length}
          subtext="Pedagogical growth plans"
          icon={Sparkles}
          onClick={() => onNavigate('process_9')}
        />
      </div>

      {/* Grid: Upcoming Conferences & Classroom Observation Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Conferences Scheduled */}
        <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Post-Evaluation Conference Roster (Process 8.0)
            </h3>
            <button
              onClick={() => onNavigate('process_8')}
              className="text-xs text-[#B91C1C] hover:underline font-semibold"
            >
              View All Conferences →
            </button>
          </div>

          <div className="space-y-3">
            {discussions.map((d) => (
              <div 
                key={d.id}
                onClick={() => onNavigate('process_8')}
                className="p-3.5 rounded-xl border border-[#E5E5E5] hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-[#171717]">{d.teacherName}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#737373] mt-0.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span>{d.discussionDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                    d.status === 'Conducted' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {d.status}
                  </span>
                  <span className="block text-[11px] text-[#737373] mt-1">
                    Action: {d.followUpStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Improvement Monitoring Cases */}
        <div className="lg:col-span-5 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Supervisory Observations (Process 10.0)
            </h3>
            <button
              onClick={() => onNavigate('process_10')}
              className="text-xs text-[#B91C1C] hover:underline font-semibold"
            >
              Monitor →
            </button>
          </div>

          <div className="space-y-3">
            {improvements.map((imp) => (
              <div 
                key={imp.id}
                onClick={() => onNavigate('process_10')}
                className="p-3 rounded-lg border border-[#E5E5E5] hover:bg-slate-50 cursor-pointer transition-all text-xs space-y-1"
              >
                <div className="flex justify-between font-semibold">
                  <span className="text-[#171717]">{imp.teacherName}</span>
                  <span className="text-emerald-700 font-mono">
                    {imp.updatedMeanScore ? `${imp.updatedMeanScore.toFixed(2)} / 5.00` : 'Baseline'}
                  </span>
                </div>
                <p className="text-[#737373] text-[11px] line-clamp-1">{imp.originalFinding}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
