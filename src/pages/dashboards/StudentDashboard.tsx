import React from 'react';
import { UserProfile } from '../../types';
import { dataService } from '../../services/dataService';
import { StatCard } from '../../components/common/StatCard';
import { 
  PenTool, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Lock 
} from 'lucide-react';

interface Props {
  user: UserProfile;
  onNavigate: (pageId: string) => void;
}

export const StudentDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const announcements = dataService.getAnnouncements().filter(a => a.status === 'Published');

  const enrolledCourses = [
    {
      code: 'IT 312',
      name: 'Web Systems and Technologies II',
      instructor: 'Engr. Ronald P. Mendoza',
      isCompleted: true,
      completedDate: '2026-04-05'
    },
    {
      code: 'GENED 104',
      name: 'Mathematics in the Modern World',
      instructor: 'Prof. Aniceto G. Morales',
      isCompleted: false,
      deadline: '2026-04-20'
    },
    {
      code: 'CS 221',
      name: 'Data Structures and Algorithms',
      instructor: 'Engr. Ronald P. Mendoza',
      isCompleted: false,
      deadline: '2026-04-20'
    }
  ];

  const pendingCount = enrolledCourses.filter(c => !c.isCompleted).length;
  const completedCount = enrolledCourses.filter(c => c.isCompleted).length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
            <span className="font-semibold text-[#B91C1C]">DCC Student Portal</span>
            <span>·</span>
            <span>{user.title}</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#737373] mt-1 leading-relaxed">
            Participate in the 2nd Semester Faculty Teaching Performance Evaluation.
            Your appraisals directly shape classroom instruction and curriculum delivery at Davao Central College.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('process_6')}
              className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Answer Pending Evaluation ({pendingCount} Remaining)</span>
            </button>
            <button
              onClick={() => onNavigate('announcements')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg font-semibold transition-colors"
            >
              View Guidance Office Memo
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Pending Course Evaluations"
          value={pendingCount}
          subtext="Awaiting your anonymous input"
          icon={Clock}
          onClick={() => onNavigate('process_6')}
        />
        <StatCard
          label="Completed Evaluations"
          value={completedCount}
          subtext="Submitted securely"
          icon={CheckCircle2}
        />
        <StatCard
          label="Submission Anonymity"
          value="100% Protected"
          subtext="Guidance Center encryption"
          icon={ShieldCheck}
        />
      </div>

      {/* Anonymity Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
        <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-emerald-950">Strict Student Anonymity Guarantee:</p>
          <p className="text-emerald-800 leading-relaxed mt-0.5">
            Your name, student ID, and email address are never attached to your ratings or written suggestions.
            Faculty members receive only aggregated numbers and anonymous comments after final course grading.
          </p>
        </div>
      </div>

      {/* Course Evaluation Roster */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
          <h3 className="text-sm font-semibold text-[#171717]">
            Enrolled Courses & Evaluation Status
          </h3>
          <span className="text-xs text-[#737373]">
            Academic Year 2025-2026 · 2nd Semester
          </span>
        </div>

        <div className="space-y-3">
          {enrolledCourses.map((course) => (
            <div
              key={course.code}
              className="p-4 rounded-xl border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#B91C1C]">{course.code}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-semibold text-[#171717]">{course.name}</span>
                </div>
                <p className="text-[11px] text-[#737373] mt-0.5">
                  Instructor: <strong>{course.instructor}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {course.isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Submitted on {course.completedDate}
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate('process_6')}
                    className="px-3.5 py-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Evaluate Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
