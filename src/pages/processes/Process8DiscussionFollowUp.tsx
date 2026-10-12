import React, { useState } from 'react';
import { EvaluationDiscussion, MeetingStatus, UserRole } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  MessagesSquare, 
  Calendar, 
  Users, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Save, 
  AlertCircle, 
  Clock, 
  Plus, 
  X,
  ShieldCheck,
  Send
} from 'lucide-react';

interface Props {
  currentRole: UserRole;
}

export const Process8DiscussionFollowUp: React.FC<Props> = ({ currentRole }) => {
  const [discussions, setDiscussions] = useState<EvaluationDiscussion[]>(() => dataService.getDiscussions());
  const [activeDiscussionId, setActiveDiscussionId] = useState<string>(discussions[0]?.id || '');
  const [notification, setNotification] = useState<string | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const selectedDiscussion = discussions.find(d => d.id === activeDiscussionId) || discussions[0];

  // Editable fields for active discussion
  const [meetingNotes, setMeetingNotes] = useState(selectedDiscussion?.meetingNotes || '');
  const [recommendations, setRecommendations] = useState(selectedDiscussion?.recommendations || '');
  const [remarks, setRemarks] = useState(selectedDiscussion?.remarks || '');
  const [feedbackToTeacher, setFeedbackToTeacher] = useState(selectedDiscussion?.feedbackToTeacher || '');
  const [meetingStatus, setMeetingStatus] = useState<MeetingStatus>(selectedDiscussion?.status || 'Scheduled');

  // New discussion modal state
  const [newDiscussion, setNewDiscussion] = useState<Partial<EvaluationDiscussion>>({
    teacherId: 'usr-teacher-01',
    teacherName: 'Engr. Ronald P. Mendoza',
    discussionDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    participants: ['Dr. Maria Elena C. Santos (Principal)', 'Prof. Carmencita V. Alcantara (Coordinator)'],
    status: 'Scheduled',
    meetingNotes: '',
    recommendations: '',
    remarks: '',
    feedbackToTeacher: '',
    improvementReportSummary: 'Post-evaluation alignment conference.',
    followUpStatus: 'Open',
    isConfidential: true
  });

  const handleSelectDiscussion = (d: EvaluationDiscussion) => {
    setActiveDiscussionId(d.id);
    setMeetingNotes(d.meetingNotes);
    setRecommendations(d.recommendations);
    setRemarks(d.remarks);
    setFeedbackToTeacher(d.feedbackToTeacher);
    setMeetingStatus(d.status);
  };

  const handleSaveMinutes = (statusOverride?: MeetingStatus) => {
    if (!selectedDiscussion) return;
    const finalStatus = statusOverride || meetingStatus;
    const updated: EvaluationDiscussion = {
      ...selectedDiscussion,
      meetingNotes,
      recommendations,
      remarks,
      feedbackToTeacher,
      status: finalStatus
    };

    dataService.saveDiscussion(updated);
    setDiscussions(dataService.getDiscussions());
    setMeetingStatus(finalStatus);
    showNotice(`Conference record saved. Status: ${finalStatus}.`);
  };

  const handleScheduleNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussion.teacherName) return;

    const fullDisc: EvaluationDiscussion = {
      id: `disc-${Date.now()}`,
      teacherId: newDiscussion.teacherId || 'usr-teacher-01',
      teacherName: newDiscussion.teacherName,
      discussionDate: newDiscussion.discussionDate || new Date().toISOString().split('T')[0],
      participants: newDiscussion.participants || [],
      status: 'Scheduled',
      meetingNotes: newDiscussion.meetingNotes || '',
      recommendations: newDiscussion.recommendations || '',
      remarks: newDiscussion.remarks || '',
      feedbackToTeacher: newDiscussion.feedbackToTeacher || '',
      improvementReportSummary: newDiscussion.improvementReportSummary || '',
      followUpStatus: 'Open',
      isConfidential: true,
      academicCoordinatorSignoff: true,
      principalSignoff: false
    };

    dataService.saveDiscussion(fullDisc);
    setDiscussions(dataService.getDiscussions());
    setActiveDiscussionId(fullDisc.id);
    setIsScheduleModalOpen(false);
    showNotice(`Post-evaluation discussion scheduled for ${fullDisc.teacherName}.`);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Process Context */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="font-semibold text-[#B91C1C]">DFD Process 8.0</span>
            <span>·</span>
            <span>Principal & Academic Coordinator Authority</span>
            <span>·</span>
            <span className="font-mono">Constructive Faculty Dialogue</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Evaluation Discussion and Follow-up</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Conduct structured post-evaluation conferences with faculty members. Review ratings, celebrate strengths,
            formulate constructive recommendations, and establish mutual growth goals.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Schedule Conference
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {notification}
          </span>
          <button onClick={() => setNotification(null)} className="text-emerald-700 font-bold">×</button>
        </div>
      )}

      {/* Discussion List & Active Conference Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scheduled Conferences */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#171717] mb-3 pb-2 border-b border-[#E5E5E5]">
              Conference Roster ({discussions.length})
            </h3>

            <div className="space-y-2.5">
              {discussions.map((d) => {
                const isSelected = d.id === activeDiscussionId;

                return (
                  <div
                    key={d.id}
                    onClick={() => handleSelectDiscussion(d)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/25 ring-1 ring-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-xs text-[#171717]">{d.teacherName}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        d.status === 'Conducted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-[11px] text-[#737373] font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span>{d.discussionDate}</span>
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2">
                      {d.recommendations || d.meetingNotes}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Structured Meeting Minutes & Feedback Form */}
        <div className="lg:col-span-8 space-y-4">
          {selectedDiscussion && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
              {/* Meeting Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#737373]">
                    <span className="font-semibold text-[#B91C1C]">Conference File</span>
                    <span>·</span>
                    <span className="font-mono">{selectedDiscussion.discussionDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#171717] mt-0.5">
                    {selectedDiscussion.teacherName}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    meetingStatus === 'Conducted' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {meetingStatus}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                    <Lock className="w-3 h-3 text-slate-600" />
                    Confidential Faculty Record
                  </span>
                </div>
              </div>

              {/* Participants */}
              <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs space-y-1">
                <span className="font-semibold text-[#737373] block text-[11px]">Authorized Attendees:</span>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {selectedDiscussion.participants.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800 font-medium text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Inputs for Minutes & Recommendations */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#171717] mb-1">
                    Conference Minutes & Discussion Observations
                  </label>
                  <textarea
                    rows={4}
                    value={meetingNotes}
                    onChange={(e) => setMeetingNotes(e.target.value)}
                    placeholder="Document the key points discussed during the conference, faculty perspectives, and clarifications..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#171717] leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#171717] mb-1">
                      Agreed Actionable Recommendations
                    </label>
                    <textarea
                      rows={3}
                      value={recommendations}
                      onChange={(e) => setRecommendations(e.target.value)}
                      placeholder="e.g. Implement automated rubric feedback; participate in peer mentoring..."
                      className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#171717] mb-1">
                      Direct Feedback Communicated to Faculty
                    </label>
                    <textarea
                      rows={3}
                      value={feedbackToTeacher}
                      onChange={(e) => setFeedbackToTeacher(e.target.value)}
                      placeholder="Specific positive reinforcement and supportive developmental counsel..."
                      className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg leading-relaxed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#171717] mb-1">
                    Follow-Up Status & Administrative Action Required
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Open', 'Resolved', 'Intervention Required'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          const updated: EvaluationDiscussion = {
                            ...selectedDiscussion,
                            followUpStatus: st as any
                          };
                          dataService.saveDiscussion(updated);
                          setDiscussions(dataService.getDiscussions());
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                          selectedDiscussion.followUpStatus === st
                            ? 'border-[#B91C1C] bg-[#FEE2E2] text-[#B91C1C] font-semibold'
                            : 'border-[#E5E5E5] bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Signoffs status */}
                <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg flex items-center justify-between text-[11px] text-[#737373]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Academic Coordinator Signoff Recorded
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className={`w-4 h-4 ${selectedDiscussion.principalSignoff ? 'text-emerald-600' : 'text-slate-300'}`} />
                    Principal Endorsement {selectedDiscussion.principalSignoff ? 'Affirmed' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleSaveMinutes('Conducted')}
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Conference as Conducted
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveMinutes()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Save Minutes Draft
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Conference Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">Schedule Post-Evaluation Conference</h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-1 text-[#737373]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleNew} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#171717] mb-1">Faculty Member</label>
                <input
                  type="text"
                  value={newDiscussion.teacherName || ''}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, teacherName: e.target.value })}
                  placeholder="e.g. Prof. Aniceto G. Morales"
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Conference Date</label>
                <input
                  type="date"
                  value={newDiscussion.discussionDate || ''}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, discussionDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Preliminary Agenda Notes</label>
                <textarea
                  rows={3}
                  value={newDiscussion.meetingNotes || ''}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, meetingNotes: e.target.value })}
                  placeholder="Review 2nd Semester instructional feedback; discuss grading feedback pacing..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold"
                >
                  Confirm Conference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
