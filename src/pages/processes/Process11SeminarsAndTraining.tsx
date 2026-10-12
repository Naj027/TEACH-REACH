import React, { useState } from 'react';
import { SeminarTraining } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Plus, 
  Clock, 
  FileText, 
  X,
  Building
} from 'lucide-react';

export const Process11SeminarsAndTraining: React.FC = () => {
  const [seminars, setSeminars] = useState<SeminarTraining[]>(() => dataService.getSeminars());
  const [selectedSeminar, setSelectedSeminar] = useState<SeminarTraining>(seminars[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formState, setFormState] = useState<Partial<SeminarTraining>>({
    title: '',
    skillsGapAddressed: '',
    objectives: ['Formulate objective assessment rubrics', 'Enhance digital student consultation'],
    description: '',
    schedule: 'June 5, 2026 | 9:00 AM - 4:00 PM',
    venue: 'DCC AVR-1 Audio-Visual Hall',
    facilitator: '',
    targetParticipants: 'All Collegiate Faculty',
    maxAttendees: 50,
    enrolledTeachers: ['Engr. Ronald P. Mendoza', 'Prof. Aniceto G. Morales'],
    attendanceStatus: 'Planned',
    postTrainingFollowUp: 'Submission of revamped course syllabus with formative rubrics',
    outcomeNotes: 'Organized under DCC Professional Development Framework'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.skillsGapAddressed) return;

    const newSem: SeminarTraining = {
      id: `sem-${Date.now()}`,
      title: formState.title,
      skillsGapAddressed: formState.skillsGapAddressed,
      objectives: formState.objectives || [],
      description: formState.description || '',
      schedule: formState.schedule || 'TBA',
      venue: formState.venue || 'Davao Central College',
      facilitator: formState.facilitator || 'Faculty Development Committee',
      targetParticipants: formState.targetParticipants || 'All Faculty',
      maxAttendees: formState.maxAttendees || 40,
      enrolledTeachers: formState.enrolledTeachers || [],
      attendanceStatus: 'Planned',
      postTrainingFollowUp: formState.postTrainingFollowUp || '',
      outcomeNotes: formState.outcomeNotes || ''
    };

    dataService.saveSeminar(newSem);
    setSeminars(dataService.getSeminars());
    setSelectedSeminar(newSem);
    setIsCreateModalOpen(false);
    showNotice(`Seminar "${newSem.title}" scheduled successfully.`);
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
            <span className="font-semibold text-[#B91C1C]">DFD Process 11.0</span>
            <span>·</span>
            <span>Institutional Capacity Building</span>
            <span>·</span>
            <span className="font-mono">Pedagogical Excellence</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Faculty Seminars and Training</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Institutional seminars, pedagogical workshops, and continuing professional development initiatives
            designed to close instructional competencies and curriculum gaps revealed by student evaluation trends.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Schedule Seminar
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

      {/* Seminars List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scheduled Seminars */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#171717] mb-3 pb-2 border-b border-[#E5E5E5]">
              Professional Development Calendar ({seminars.length})
            </h3>

            <div className="space-y-3">
              {seminars.map((sem) => {
                const isSelected = selectedSeminar?.id === sem.id;

                return (
                  <div
                    key={sem.id}
                    onClick={() => setSelectedSeminar(sem)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/25 ring-1 ring-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-xs text-[#171717] line-clamp-1">
                        {sem.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">
                        {sem.attendanceStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-[11px] text-[#737373]">
                      <Calendar className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span className="font-mono">{sem.schedule.split('|')[0]}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {sem.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Seminar Program Dossier */}
        <div className="lg:col-span-7 space-y-4">
          {selectedSeminar && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
              <div className="pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
                  <span className="font-semibold text-[#B91C1C]">DCC Faculty Development</span>
                  <span>·</span>
                  <span className="font-mono">Audience: {selectedSeminar.targetParticipants}</span>
                </div>
                <h3 className="text-lg font-bold text-[#171717] leading-snug">
                  {selectedSeminar.title}
                </h3>
              </div>

              {/* Skills Gap Callout */}
              <div className="p-4 bg-slate-50 border border-[#E5E5E5] rounded-xl text-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                  Identified Instructional Gap Addressed:
                </span>
                <p className="font-semibold text-[#B91C1C] text-sm">
                  {selectedSeminar.skillsGapAddressed}
                </p>
              </div>

              {/* Seminar Details Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#737373] mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span className="font-semibold">Schedule & Time</span>
                  </div>
                  <span className="font-mono text-[#171717] font-medium">{selectedSeminar.schedule}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#737373] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span className="font-semibold">Venue / Facility</span>
                  </div>
                  <span className="text-[#171717] font-medium">{selectedSeminar.venue}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#737373] mb-1">
                    <Users className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span className="font-semibold">Lead Facilitator</span>
                  </div>
                  <span className="text-[#171717] font-medium">{selectedSeminar.facilitator}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#737373] mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span className="font-semibold">Capacity</span>
                  </div>
                  <span className="font-mono text-[#171717] font-medium">
                    {selectedSeminar.enrolledTeachers.length} Registered / {selectedSeminar.maxAttendees} Maximum
                  </span>
                </div>
              </div>

              {/* Objectives */}
              <div className="text-xs space-y-2">
                <span className="font-bold text-[#171717] block">Curricular Objectives:</span>
                <ul className="space-y-1 text-slate-700">
                  {selectedSeminar.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B91C1C] font-bold">1.{i + 1}</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enrolled Faculty Roster */}
              <div className="text-xs space-y-2 pt-2 border-t border-[#E5E5E5]">
                <span className="font-bold text-[#171717] block">
                  Enrolled Faculty Participants ({selectedSeminar.enrolledTeachers.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedSeminar.enrolledTeachers.map((teach, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-800 text-[11px] font-medium">
                      {teach}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post-Training Follow-Up */}
              <div className="p-4 bg-slate-50 border border-[#E5E5E5] rounded-xl text-xs space-y-1">
                <span className="font-semibold text-[#737373] block text-[11px]">Post-Training Deliverable:</span>
                <p className="text-slate-800 leading-relaxed">{selectedSeminar.postTrainingFollowUp}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Seminar Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-xl overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">Schedule Faculty Training Seminar</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-[#737373]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#171717] mb-1">Seminar / Training Title</label>
                <input
                  type="text"
                  placeholder="e.g. Authentic Assessment and Digital Rubrics Implementation"
                  value={formState.title || ''}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Identified Pedagogical Skills Gap</label>
                <input
                  type="text"
                  placeholder="e.g. Assessment Transparency & Formative Feedback Turnaround"
                  value={formState.skillsGapAddressed || ''}
                  onChange={(e) => setFormState({ ...formState, skillsGapAddressed: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Schedule</label>
                  <input
                    type="text"
                    value={formState.schedule || ''}
                    onChange={(e) => setFormState({ ...formState, schedule: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Venue</label>
                  <input
                    type="text"
                    value={formState.venue || ''}
                    onChange={(e) => setFormState({ ...formState, venue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Lead Facilitator / Resource Speaker</label>
                <input
                  type="text"
                  value={formState.facilitator || ''}
                  onChange={(e) => setFormState({ ...formState, facilitator: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Description & Training Scope</label>
                <textarea
                  rows={3}
                  value={formState.description || ''}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
