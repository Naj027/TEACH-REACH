import React, { useState } from 'react';
import { InterventionProgram, InterventionType, ProgramStatus } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  Sparkles, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  User, 
  BookOpen, 
  HeartHandshake, 
  X,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';

const INTERVENTION_TYPES: InterventionType[] = [
  'Pedagogical Workshop',
  'Classroom Mentoring',
  'Guidance Office Referral',
  'Curriculum Alignment',
  'Instructional Materials Development'
];

export const Process9InterventionPrograms: React.FC = () => {
  const [interventions, setInterventions] = useState<InterventionProgram[]>(() => dataService.getInterventions());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState<InterventionProgram>(interventions[0]);
  const [notification, setNotification] = useState<string | null>(null);

  const [formState, setFormState] = useState<Partial<InterventionProgram>>({
    teacherName: '',
    identifiedArea: '',
    type: 'Pedagogical Workshop',
    objectives: ['Master active questioning strategies', 'Formulate objective evaluation rubrics'],
    recommendedActivities: ['Attend DCC Faculty Workshop', 'Peer observation sessions with Department Head'],
    seminarOrTrainingTitle: 'DCC Faculty Pedagogical Workshop Series',
    assignedPersonnel: 'Prof. Carmencita V. Alcantara (Academic Coordinator)',
    startDate: new Date().toISOString().split('T')[0],
    targetCompletionDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    status: 'In Progress',
    expectedOutcomes: 'Observed enhancement in student engagement and assessment transparency.',
    followUpSchedule: 'Bi-weekly instructional consultation'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.teacherName || !formState.identifiedArea) return;

    const newProg: InterventionProgram = {
      id: `int-${Date.now()}`,
      teacherId: `usr-teacher-${Date.now()}`,
      teacherName: formState.teacherName,
      identifiedArea: formState.identifiedArea,
      type: formState.type as InterventionType,
      objectives: formState.objectives || [],
      recommendedActivities: formState.recommendedActivities || [],
      seminarOrTrainingTitle: formState.seminarOrTrainingTitle,
      assignedPersonnel: formState.assignedPersonnel || 'Academic Coordinator',
      startDate: formState.startDate || new Date().toISOString().split('T')[0],
      targetCompletionDate: formState.targetCompletionDate || new Date().toISOString().split('T')[0],
      status: 'In Progress',
      expectedOutcomes: formState.expectedOutcomes || '',
      followUpSchedule: formState.followUpSchedule || 'Monthly follow-up'
    };

    dataService.saveIntervention(newProg);
    const updated = dataService.getInterventions();
    setInterventions(updated);
    setSelectedIntervention(newProg);
    setIsCreateModalOpen(false);
    showNotice(`Supportive intervention created for ${newProg.teacherName}.`);
  };

  const handleUpdateStatus = (prog: InterventionProgram, newStatus: ProgramStatus) => {
    const updated = { ...prog, status: newStatus };
    dataService.saveIntervention(updated);
    setInterventions(dataService.getInterventions());
    setSelectedIntervention(updated);
    showNotice(`Program status updated to ${newStatus}.`);
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
            <span className="font-semibold text-[#B91C1C]">DFD Process 9.0</span>
            <span>·</span>
            <span>Guidance Center & Academic Affairs</span>
            <span>·</span>
            <span className="font-mono">Professional Growth Pathway</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Intervention & Professional Development Programs</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Formulate personalized, constructive growth plans targeting instructional skills gaps identified during student evaluations.
            Emphasizes mentorship, seminars, and wellness support to nurture DCC faculty excellence.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Intervention Plan
          </button>
        </div>
      </div>

      {/* Ethical Assurance Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-emerald-950">Supportive Growth Philosophy:</p>
          <p className="text-emerald-800 leading-relaxed">
            Intervention programs at Davao Central College are developmental and collegiate—never punitive.
            Any formal personnel or disciplinary action remains a distinct human process strictly governed by the DCC Faculty Manual under Process 11.0 (HR Due Process).
          </p>
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

      {/* Intervention Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interventions List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#171717] mb-3 pb-2 border-b border-[#E5E5E5]">
              Active Developmental Programs ({interventions.length})
            </h3>

            <div className="space-y-3">
              {interventions.map((prog) => {
                const isSelected = selectedIntervention?.id === prog.id;

                return (
                  <div
                    key={prog.id}
                    onClick={() => setSelectedIntervention(prog)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/25 ring-1 ring-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-[#171717] block">
                          {prog.teacherName}
                        </span>
                        <span className="text-[11px] font-medium text-[#B91C1C] mt-0.5 block">
                          {prog.type}
                        </span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        prog.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prog.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {prog.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#737373] mt-2 line-clamp-2">
                      {prog.identifiedArea}
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#E5E5E5]/60 flex items-center justify-between text-[11px] text-[#737373] font-mono">
                      <span>Timeline: {prog.startDate}</span>
                      <span>Target: {prog.targetCompletionDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Program Overview */}
        <div className="lg:col-span-7 space-y-4">
          {selectedIntervention && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-3">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#B91C1C] uppercase tracking-wider">
                    {selectedIntervention.type}
                  </span>
                  <h3 className="text-lg font-bold text-[#171717] mt-0.5">
                    {selectedIntervention.teacherName}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {(['Not Started', 'In Progress', 'Completed'] as ProgramStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedIntervention, st)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        selectedIntervention.status === st
                          ? 'bg-[#B91C1C] text-white font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Identified Area Box */}
              <div className="p-4 bg-slate-50 border border-[#E5E5E5] rounded-xl space-y-1">
                <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider block">
                  Identified Area for Instructional Support:
                </span>
                <p className="text-sm font-semibold text-[#171717]">
                  {selectedIntervention.identifiedArea}
                </p>
              </div>

              {/* Objectives & Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <span className="font-bold text-[#171717] block">Program Objectives:</span>
                  <ul className="space-y-1.5 text-slate-700">
                    {selectedIntervention.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#B91C1C] font-bold">1.{i + 1}</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-[#171717] block">Recommended Activities:</span>
                  <ul className="space-y-1.5 text-slate-700">
                    {selectedIntervention.recommendedActivities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meta details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E5E5] space-y-2 text-xs">
                {selectedIntervention.seminarOrTrainingTitle && (
                  <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700">
                    <span className="font-semibold text-[#737373]">Associated Seminar / Training:</span>
                    <span className="font-medium text-[#171717]">{selectedIntervention.seminarOrTrainingTitle}</span>
                  </div>
                )}
                {selectedIntervention.guidanceReferralNotes && (
                  <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700">
                    <span className="font-semibold text-[#737373]">Guidance Counseling Endorsement:</span>
                    <span className="font-medium text-[#171717]">{selectedIntervention.guidanceReferralNotes}</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700">
                  <span className="font-semibold text-[#737373]">Assigned Mentor / Personnel:</span>
                  <span className="font-medium text-[#171717]">{selectedIntervention.assignedPersonnel}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700">
                  <span className="font-semibold text-[#737373]">Monitoring Schedule:</span>
                  <span className="font-medium text-[#171717]">{selectedIntervention.followUpSchedule}</span>
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#171717] block">Expected Developmental Outcomes:</span>
                <p className="text-slate-700 leading-relaxed bg-white border border-[#E5E5E5] p-3 rounded-lg">
                  {selectedIntervention.expectedOutcomes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Intervention Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-xl overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">Create Faculty Intervention Plan</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-[#737373]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Faculty Member</label>
                  <input
                    type="text"
                    placeholder="e.g. Prof. Aniceto G. Morales"
                    value={formState.teacherName || ''}
                    onChange={(e) => setFormState({ ...formState, teacherName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Intervention Modality</label>
                  <select
                    value={formState.type || 'Pedagogical Workshop'}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value as InterventionType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  >
                    {INTERVENTION_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Identified Area for Growth</label>
                <input
                  type="text"
                  placeholder="e.g. Assessment Rubrics & Timely Student Grading Feedback"
                  value={formState.identifiedArea || ''}
                  onChange={(e) => setFormState({ ...formState, identifiedArea: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formState.startDate || ''}
                    onChange={(e) => setFormState({ ...formState, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Target Completion</label>
                  <input
                    type="date"
                    value={formState.targetCompletionDate || ''}
                    onChange={(e) => setFormState({ ...formState, targetCompletionDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Expected Developmental Outcomes</label>
                <textarea
                  rows={3}
                  value={formState.expectedOutcomes || ''}
                  onChange={(e) => setFormState({ ...formState, expectedOutcomes: e.target.value })}
                  placeholder="Enhanced clarity in student assessment rubrics and timely feedback return..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
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
                  Save Intervention Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
