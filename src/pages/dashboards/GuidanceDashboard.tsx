import React from 'react';
import { UserProfile } from '../../types';
import { dataService } from '../../services/dataService';
import { StatCard } from '../../components/common/StatCard';
import { 
  CalendarDays, 
  Link2, 
  BarChart3, 
  TrendingUp, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

interface Props {
  user: UserProfile;
  onNavigate: (pageId: string) => void;
}

export const GuidanceDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const announcements = dataService.getAnnouncements();
  const links = dataService.getGoogleFormsLinks();
  const results = dataService.getTeacherResults();
  const interventions = dataService.getInterventions();
  const improvements = dataService.getImprovements();

  const totalResponses = links.reduce((acc, l) => acc + l.responseCount, 0);
  const readyLinks = links.filter(l => l.status === 'Link Ready' || l.status === 'Published');
  const activeAnnouncements = announcements.filter(a => a.status === 'Published');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
            <span className="font-semibold text-[#B91C1C]">Guidance & Testing Services</span>
            <span>·</span>
            <span>Davao Central College</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#737373] mt-1 leading-relaxed">
            Operational dashboard for faculty teaching evaluations. Manage announcement schedules (Process 3.0),
            configure and validate Google Forms section links (Process 4.0), and compute overall statistical ratings (Process 7.0).
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('process_3')}
              className="px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Manage Evaluation Schedules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('process_4')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg font-semibold transition-colors"
            >
              Google Forms Section Links ({links.length})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Student Responses"
          value={totalResponses}
          subtext="Processed across active sections"
          icon={BarChart3}
          trend={{ value: 'Active collection', positive: true }}
          onClick={() => onNavigate('process_7')}
        />
        <StatCard
          label="Google Form Links"
          value={`${readyLinks.length} / ${links.length}`}
          subtext="Validated for GC distribution"
          icon={Link2}
          onClick={() => onNavigate('process_4')}
        />
        <StatCard
          label="Active Cycles Announced"
          value={activeAnnouncements.length}
          subtext="DCC institutional memoranda"
          icon={CalendarDays}
          onClick={() => onNavigate('process_3')}
        />
        <StatCard
          label="Improvement Cases"
          value={improvements.length}
          subtext="Under follow-up observation"
          icon={TrendingUp}
          onClick={() => onNavigate('process_10')}
        />
      </div>

      {/* Grid: Forms Deployment Queue & Teacher Ratings Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Section Links Status */}
        <div className="lg:col-span-6 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Section Links Configuration Status (Process 4.0)
            </h3>
            <button
              onClick={() => onNavigate('process_4')}
              className="text-xs text-[#B91C1C] hover:underline font-semibold"
            >
              Configure Links →
            </button>
          </div>

          <div className="space-y-3">
            {links.map((link) => (
              <div 
                key={link.id}
                onClick={() => onNavigate('process_4')}
                className="p-3.5 rounded-lg border border-[#E5E5E5] hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-[#171717]">{link.teacherName}</span>
                  <div className="text-[11px] text-[#737373] font-mono mt-0.5">
                    {link.subjectCode} · {link.section}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    link.status === 'Link Ready' ? 'bg-emerald-100 text-emerald-800' :
                    link.status === 'Published' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {link.status}
                  </span>
                  <span className="block text-[11px] font-mono text-[#737373] mt-1">
                    {link.responseCount} answers
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Teacher Performance Ratings Released */}
        <div className="lg:col-span-6 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717]">
              Computed Mean Performance Ratings (Process 7.0)
            </h3>
            <button
              onClick={() => onNavigate('process_7')}
              className="text-xs text-[#B91C1C] hover:underline font-semibold"
            >
              View Full Ratings →
            </button>
          </div>

          <div className="space-y-3">
            {results.map((res) => (
              <div 
                key={res.teacherId}
                onClick={() => onNavigate('process_7')}
                className="p-3.5 rounded-lg border border-[#E5E5E5] hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-[#171717]">{res.teacherName}</span>
                  <span className="block text-[11px] text-[#737373]">{res.department}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-[#171717] tabular-nums">
                    {res.overallMean.toFixed(2)} / 5.00
                  </span>
                  <span className={`block text-[10px] font-semibold ${
                    res.isReleasedToTeacher ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {res.isReleasedToTeacher ? 'Released to Faculty' : 'Unreleased'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
