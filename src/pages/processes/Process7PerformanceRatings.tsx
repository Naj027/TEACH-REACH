import React, { useState } from 'react';
import { TeacherEvaluationResult, UserRole } from '../../types';
import { dataService } from '../../services/dataService';
import { ASSETS } from '../../assets/assetPaths';
import { 
  BarChart3, 
  Printer, 
  Filter, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  MessageSquare, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  UserCheck,
  Building
} from 'lucide-react';

interface Props {
  currentRole: UserRole;
  currentTeacherId?: string;
}

export const Process7PerformanceRatings: React.FC<Props> = ({ currentRole, currentTeacherId }) => {
  const [results, setResults] = useState<TeacherEvaluationResult[]>(() => dataService.getTeacherResults());
  
  // If teacher role, only allow viewing their own released results!
  const availableResults = currentRole === 'teacher' 
    ? results.filter(r => r.teacherId === currentTeacherId && r.isReleasedToTeacher)
    : results;

  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    availableResults[0]?.teacherId || ''
  );
  const [selectedSemester, setSelectedSemester] = useState<string>('2nd Semester');
  const [notification, setNotification] = useState<string | null>(null);

  const activeResult = availableResults.find(r => r.teacherId === selectedTeacherId) || availableResults[0];

  const handleToggleRelease = (tId: string) => {
    dataService.toggleReleaseToTeacher(tId);
    setResults(dataService.getTeacherResults());
    showNotice('Faculty results release status updated.');
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!activeResult) {
    return (
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-12 text-center text-xs text-[#737373]">
        <BarChart3 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <h3 className="font-semibold text-sm text-[#171717]">No Released Evaluation Results</h3>
        <p className="mt-1">
          {currentRole === 'teacher'
            ? 'Your teaching evaluation results have not yet been released by the Guidance Center and Academic Office for this period.'
            : 'No evaluation result records found.'}
        </p>
      </div>
    );
  }

  // Calculate qualitative rating badge
  const getRatingBadge = (mean: number) => {
    if (mean >= 4.5) return { label: 'Outstanding', color: 'bg-emerald-100 text-emerald-800' };
    if (mean >= 4.0) return { label: 'Very Satisfactory', color: 'bg-blue-100 text-blue-800' };
    if (mean >= 3.5) return { label: 'Satisfactory', color: 'bg-slate-100 text-slate-800' };
    if (mean >= 3.0) return { label: 'Fair', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const ratingInfo = getRatingBadge(activeResult.overallMean);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="font-semibold text-[#B91C1C]">DFD Process 7.0</span>
            <span>·</span>
            <span>Guidance Center Statistical Processing</span>
            <span>·</span>
            <span className="font-mono">Performance Analytics</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Teaching Performance Evaluation Overall Rating</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Aggregated mean ratings computed from validated student evaluation responses across all instructional categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4 text-[#737373]" />
            Print Summary
          </button>

          {(currentRole === 'principal' || currentRole === 'guidance') && (
            <button
              onClick={() => handleToggleRelease(activeResult.teacherId)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeResult.isReleasedToTeacher
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-[#B91C1C] hover:bg-[#991B1B] text-white shadow-xs'
              }`}
            >
              {activeResult.isReleasedToTeacher ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Recall Released Result
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Release to Faculty Member
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between animate-in fade-in no-print">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {notification}
          </span>
          <button onClick={() => setNotification(null)} className="text-emerald-700 font-bold">×</button>
        </div>
      )}

      {/* Filter Selector (Hidden for Teacher since they only see themselves) */}
      {currentRole !== 'teacher' && (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#171717]">Select Faculty Member:</span>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs font-medium text-[#171717]"
            >
              {availableResults.map(r => (
                <option key={r.teacherId} value={r.teacherId}>
                  {r.teacherName} — {r.department}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#737373]">Period:</span>
            <span className="font-mono font-medium px-2.5 py-1 bg-slate-100 rounded text-slate-800">
              {activeResult.semester}, AY {activeResult.academicYear}
            </span>
          </div>
        </div>
      )}

      {/* PRINT-FRIENDLY & ON-SCREEN EVALUATION REPORT */}
      <div className="space-y-6">
        {/* Printable Academic Header */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img src={ASSETS.seal} alt="DCC Emblem" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#171717]">Davao Central College</h3>
                <p className="text-xs text-[#737373]">Guidance, Testing & Faculty Development Center</p>
                <p className="text-[11px] font-mono font-semibold text-[#B91C1C]">
                  Official Teaching Performance Evaluation Summary
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs">
              <div className="flex items-center sm:justify-end gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${ratingInfo.color}`}>
                  {ratingInfo.label}
                </span>
                <span className="text-[#737373]">·</span>
                <span className="font-mono text-slate-600">
                  {activeResult.isReleasedToTeacher ? 'Released to Faculty' : 'Under Committee Review'}
                </span>
              </div>
              <p className="text-[11px] text-[#737373] mt-1 font-mono">
                Evaluated: {activeResult.semester}, AY {activeResult.academicYear}
              </p>
            </div>
          </div>

          {/* Teacher Profile Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-[#E5E5E5] text-xs">
            <div>
              <span className="text-[11px] text-[#737373] block">Faculty Name:</span>
              <span className="font-bold text-[#171717]">{activeResult.teacherName}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#737373] block">Academic Unit:</span>
              <span className="font-medium text-[#171717]">{activeResult.department}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#737373] block">Student Responses:</span>
              <span className="font-mono font-bold text-[#171717] tabular-nums">
                {activeResult.totalResponses} submissions
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#737373] block">Prior Semester Mean:</span>
              <span className="font-mono font-bold text-[#171717] tabular-nums">
                {activeResult.previousPeriodMean ? `${activeResult.previousPeriodMean.toFixed(2)} / 5.00` : 'Baseline'}
              </span>
            </div>
          </div>

          {/* Overall Score Highlight */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-red-50 to-rose-50/50 border border-red-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                Institutional Mean Rating
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-extrabold text-[#171717] font-mono tabular-nums">
                  {activeResult.overallMean.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-[#737373]">out of 5.00</span>
              </div>
              <p className="text-xs text-[#737373] mt-1">
                Benchmark Standard: 4.00 (Satisfactory) · Qualitative Equivalence: <strong>{ratingInfo.label}</strong>
              </p>
            </div>

            {activeResult.previousPeriodMean && (
              <div className="p-3 bg-white rounded-lg border border-red-200 text-xs shrink-0">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    +{(activeResult.overallMean - activeResult.previousPeriodMean).toFixed(2)} Point Growth
                  </span>
                </div>
                <p className="text-[11px] text-[#737373] mt-0.5">
                  Compared to preceding evaluation cycle ({activeResult.previousPeriodMean.toFixed(2)})
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown and Likert Distribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Scores Breakdown */}
          <div className="lg:col-span-7 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#B91C1C]" />
              Evaluation Scores by Dimension
            </h3>

            <div className="space-y-3.5 text-xs">
              {activeResult.categoryScores.map((cat) => {
                const percent = (cat.mean / 5.0) * 100;
                return (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-[#171717]">{cat.category}</span>
                      <span className="font-mono font-bold text-[#171717] tabular-nums">
                        {cat.mean.toFixed(2)} / 5.00
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          cat.mean >= 4.5 ? 'bg-emerald-600' :
                          cat.mean >= 4.0 ? 'bg-[#B91C1C]' :
                          cat.mean >= 3.5 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#737373]">
                      <span>Baseline: 4.00</span>
                      <span>Target: 5.00</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Likert Scale Distribution */}
          <div className="lg:col-span-5 bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B91C1C]" />
              Response Rating Distribution
            </h3>

            <div className="space-y-2.5 text-xs">
              {[
                { label: '5 — Strongly Agree', count: activeResult.ratingDistribution.stronglyAgree, color: 'bg-emerald-600' },
                { label: '4 — Agree', count: activeResult.ratingDistribution.agree, color: 'bg-emerald-500' },
                { label: '3 — Neutral', count: activeResult.ratingDistribution.neutral, color: 'bg-slate-400' },
                { label: '2 — Disagree', count: activeResult.ratingDistribution.disagree, color: 'bg-amber-500' },
                { label: '1 — Strongly Disagree', count: activeResult.ratingDistribution.stronglyDisagree, color: 'bg-red-600' },
              ].map((item) => {
                const total = activeResult.totalResponses || 1;
                const pct = Math.round((item.count / total) * 100);

                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#171717] font-medium">{item.label}</span>
                      <span className="font-mono text-[#737373] tabular-nums">
                        {item.count} responses ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Strengths & Improvement Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Documented Strengths
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {activeResult.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-emerald-600">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Areas Recommended for Enhancement
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {activeResult.areasForImprovement.map((a, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-600">→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Anonymized Student Comments */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#B91C1C]" />
              Anonymized Student Feedback & Qualitative Insights
            </h3>
            <span className="text-[11px] text-[#737373]">
              {activeResult.anonymizedComments.length} Qualitative Submissions
            </span>
          </div>

          <div className="space-y-3">
            {activeResult.anonymizedComments.map((cm) => (
              <div 
                key={cm.id}
                className="p-3.5 rounded-lg border border-[#E5E5E5] bg-slate-50/50 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#737373]">
                    Submitted during 2nd Sem Cycle · {cm.date}
                  </span>
                  <span className={`px-2 py-0.2 rounded text-[10px] font-medium ${
                    cm.categorySentiment === 'Positive' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cm.categorySentiment}
                  </span>
                </div>
                <p className="text-slate-800 leading-relaxed italic">
                  "{cm.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
