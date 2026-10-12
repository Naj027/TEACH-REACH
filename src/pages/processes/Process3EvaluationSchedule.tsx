import React, { useState } from 'react';
import { EvaluationAnnouncement, ScheduleStatus } from '../../types';
import { dataService } from '../../services/dataService';
import { ASSETS } from '../../assets/assetPaths';
import { 
  CalendarDays, 
  Megaphone, 
  Plus, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X, 
  FileText, 
  Send,
  Building,
  Printer
} from 'lucide-react';

export const Process3EvaluationSchedule: React.FC = () => {
  const [announcements, setAnnouncements] = useState<EvaluationAnnouncement[]>(() => dataService.getAnnouncements());
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<EvaluationAnnouncement>(announcements[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New announcement form state
  const [formState, setFormState] = useState<Partial<EvaluationAnnouncement>>({
    memoNumber: `DCC-VPAA-MEMO-2026-0${Math.floor(40 + Math.random() * 50)}`,
    title: '',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    targetAudience: 'All Enrolled College & Senior High School Students',
    gradeLevelOrDepartment: 'Collegiate Departments',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    status: 'Scheduled',
    message: '',
    signatory: 'Noel R. De Guzman, RGC',
    signatoryTitle: 'Head, Guidance and Evaluation Center'
  });

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.message) return;

    const saved = dataService.saveAnnouncement(formState);
    const updated = dataService.getAnnouncements();
    setAnnouncements(updated);
    setSelectedAnnouncement(saved);
    setIsCreateModalOpen(false);
    showNotice('Evaluation announcement scheduled successfully.');
  };

  const handlePublish = (id: string) => {
    const ann = announcements.find(a => a.id === id);
    if (!ann) return;
    const updated: EvaluationAnnouncement = {
      ...ann,
      status: 'Published',
      publishedDate: new Date().toISOString().split('T')[0]
    };
    dataService.saveAnnouncement(updated);
    setAnnouncements(dataService.getAnnouncements());
    setSelectedAnnouncement(updated);
    showNotice('Official DCC evaluation memorandum published to student & teacher portals.');
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="font-semibold text-[#B91C1C]">DFD Process 3.0</span>
            <span>·</span>
            <span>Guidance Center Operational Command</span>
            <span>·</span>
            <span className="font-mono">Institutional Evaluation Cycle</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Evaluation Schedule & Announcements</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Authorize and announce the official student evaluation timeline across colleges and departments.
            Generates standardized institutional memoranda ready for dissemination to academic units and class group chats.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4 text-[#737373]" />
            Preview Memorandum
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Announcement
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

      {/* Announcements Table & Memorandum Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Schedule Announcements Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E5E5]">
              <h3 className="text-sm font-semibold text-[#171717]">
                Active & Scheduled Evaluation Periods
              </h3>
              <span className="text-xs text-[#737373]">
                {announcements.length} Institutional Cycles
              </span>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => {
                const isSelected = selectedAnnouncement?.id === ann.id;
                return (
                  <div
                    key={ann.id}
                    onClick={() => setSelectedAnnouncement(ann)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/20 ring-1 ring-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[11px] font-semibold text-[#B91C1C]">
                            {ann.memoNumber}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            ann.status === 'Published' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : ann.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {ann.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#171717]">{ann.title}</h4>
                        <p className="text-xs text-[#737373] mt-1 line-clamp-2">{ann.message}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#E5E5E5]/60 flex flex-wrap items-center justify-between text-[11px] text-[#737373] gap-2">
                      <div className="flex items-center gap-1.5 font-mono">
                        <CalendarDays className="w-3.5 h-3.5 text-[#B91C1C]" />
                        <span>{ann.startDate} to {ann.endDate}</span>
                      </div>
                      <span className="font-medium text-slate-600 truncate max-w-[200px]">
                        Target: {ann.targetAudience}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Memorandum Preview */}
        <div className="lg:col-span-5 space-y-4">
          {selectedAnnouncement && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#B91C1C]" />
                  <h3 className="text-sm font-semibold text-[#171717]">Memorandum Dispatch Preview</h3>
                </div>
                {selectedAnnouncement.status !== 'Published' && (
                  <button
                    onClick={() => handlePublish(selectedAnnouncement.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publish Now
                  </button>
                )}
              </div>

              {/* Memorandum Document Box */}
              <div className="p-5 border border-slate-200 bg-slate-50/50 rounded-xl space-y-4 text-xs font-sans">
                {/* DCC Academic Header */}
                <div className="text-center pb-3 border-b border-slate-200">
                  <div className="w-10 h-10 mx-auto mb-1">
                    <img src={ASSETS.seal} alt="DCC Seal" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#171717]">
                    Davao Central College
                  </h4>
                  <p className="text-[10px] text-[#737373]">Office of the Guidance & Evaluation Center</p>
                  <p className="text-[10px] font-mono text-[#B91C1C] mt-1 font-semibold">
                    MEMORANDUM NO. {selectedAnnouncement.memoNumber}
                  </p>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex">
                    <span className="w-20 font-semibold text-[#737373]">FOR:</span>
                    <span className="font-medium text-[#171717]">{selectedAnnouncement.targetAudience}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 font-semibold text-[#737373]">FROM:</span>
                    <span className="font-medium text-[#171717]">{selectedAnnouncement.signatory}, {selectedAnnouncement.signatoryTitle}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 font-semibold text-[#737373]">SUBJECT:</span>
                    <span className="font-bold text-[#171717]">{selectedAnnouncement.title}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 font-semibold text-[#737373]">PERIOD:</span>
                    <span className="font-mono text-[#171717] font-semibold">{selectedAnnouncement.startDate} to {selectedAnnouncement.endDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-slate-700 leading-relaxed space-y-2">
                  <p>{selectedAnnouncement.message}</p>
                  <p className="text-[11px] text-[#737373] italic">
                    All evaluations are conducted anonymously in compliance with DCC Quality Assurance protocols. Faculty members receive aggregated insights only after semester grades have been finalized.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[11px]">
                  <div>
                    <span className="text-[10px] text-[#737373] block">Status:</span>
                    <span className="font-semibold text-[#B91C1C]">{selectedAnnouncement.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#171717]">{selectedAnnouncement.signatory}</div>
                    <div className="text-[10px] text-[#737373]">{selectedAnnouncement.signatoryTitle}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-xl overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">
                Issue Evaluation Announcement Memorandum
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-[#737373] hover:text-[#171717] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Memorandum Number</label>
                  <input
                    type="text"
                    value={formState.memoNumber || ''}
                    onChange={(e) => setFormState({ ...formState, memoNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Academic Period</label>
                  <input
                    type="text"
                    value={`${formState.semester}, AY ${formState.academicYear}`}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 border border-[#E5E5E5] rounded-lg text-slate-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Announcement Title</label>
                <input
                  type="text"
                  placeholder="e.g. 2nd Semester Faculty Teaching Performance Evaluation"
                  value={formState.title || ''}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Target Student Audience</label>
                  <input
                    type="text"
                    value={formState.targetAudience || ''}
                    onChange={(e) => setFormState({ ...formState, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Grade Level / College</label>
                  <input
                    type="text"
                    value={formState.gradeLevelOrDepartment || ''}
                    onChange={(e) => setFormState({ ...formState, gradeLevelOrDepartment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formState.startDate || ''}
                    onChange={(e) => setFormState({ ...formState, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">End Date</label>
                  <input
                    type="date"
                    value={formState.endDate || ''}
                    onChange={(e) => setFormState({ ...formState, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Official Directive Message</label>
                <textarea
                  rows={4}
                  value={formState.message || ''}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Enter the official memorandum text explaining the purpose of the evaluation, student instructions, and anonymity guarantees..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-end gap-2.5">
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
                  Schedule Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Memorandum Full Modal Preview */}
      {isPreviewModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">Davao Central College Memorandum View</h3>
              <button onClick={() => setIsPreviewModalOpen(false)} className="p-1 text-[#737373]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6 text-xs text-[#171717]">
              <div className="text-center pb-4 border-b border-slate-200">
                <img src={ASSETS.seal} alt="DCC Seal" className="w-16 h-16 mx-auto mb-2" />
                <h2 className="text-base font-bold uppercase tracking-wide">Davao Central College</h2>
                <p className="text-xs text-slate-600">Guidance and Evaluation Center</p>
                <p className="text-xs font-mono font-bold text-[#B91C1C] mt-2">
                  MEMORANDUM NO. {selectedAnnouncement.memoNumber}
                </p>
              </div>
              <div className="space-y-2">
                <p><strong>TO:</strong> {selectedAnnouncement.targetAudience}</p>
                <p><strong>FROM:</strong> {selectedAnnouncement.signatory}, {selectedAnnouncement.signatoryTitle}</p>
                <p><strong>DATE:</strong> {selectedAnnouncement.dateCreated}</p>
                <p><strong>SUBJECT:</strong> {selectedAnnouncement.title}</p>
              </div>
              <div className="pt-4 border-t border-slate-200 leading-relaxed text-slate-800">
                <p>{selectedAnnouncement.message}</p>
              </div>
              <div className="pt-8 text-right">
                <p className="font-bold">{selectedAnnouncement.signatory}</p>
                <p className="text-slate-600">{selectedAnnouncement.signatoryTitle}</p>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-[#E5E5E5] bg-slate-50 flex justify-end gap-2">
              <button 
                onClick={() => window.print()}
                className="px-3 py-1.5 border border-slate-300 rounded text-xs font-medium hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Memorandum
              </button>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-1.5 bg-[#B91C1C] text-white rounded text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
