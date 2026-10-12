import React, { useState } from 'react';
import { EmploymentIntervention, DueProcessStage } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  Scale, 
  ShieldAlert, 
  FileText, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  UserCheck, 
  Send,
  Calendar,
  X
} from 'lucide-react';

export const Process11HREmploymentIntervention: React.FC = () => {
  const [records, setRecords] = useState<EmploymentIntervention[]>(() => dataService.getHREmploymentRecords());
  const [selectedRecord, setSelectedRecord] = useState<EmploymentIntervention>(records[0]);
  const [notification, setNotification] = useState<string | null>(null);

  const [humanNotes, setHumanNotes] = useState(selectedRecord?.humanReviewNotes || '');
  const [stage, setStage] = useState<DueProcessStage>(selectedRecord?.stage || 'Administrative Conference Scheduled');

  const handleSelectRecord = (rec: EmploymentIntervention) => {
    setSelectedRecord(rec);
    setHumanNotes(rec.humanReviewNotes);
    setStage(rec.stage);
  };

  const handleSaveDueProcess = () => {
    if (!selectedRecord) return;
    const updated: EmploymentIntervention = {
      ...selectedRecord,
      humanReviewNotes: humanNotes,
      stage,
      humanReviewerSignoff: true
    };
    dataService.saveHREmploymentRecord(updated);
    setRecords(dataService.getHREmploymentRecords());
    setSelectedRecord(updated);
    showNotice('HR Due Process docket updated with authorized human officer remarks.');
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
            <span className="font-semibold text-[#B91C1C]">DFD Process 11.0 (HR Employment Pathway)</span>
            <span>·</span>
            <span>Human Resource Management Office</span>
            <span>·</span>
            <span className="font-mono">Restricted Legal Due Process</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Authorized Employment Referrals & Due Process</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Strictly authorized administrative review portal for chronic non-performance cases referred by the Principal and Academic Committee.
            All proceedings are strictly manual, confidential, and compliant with statutory due process.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-800 border border-red-200 rounded-lg text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-red-700" />
            Restricted HR Access Level
          </span>
        </div>
      </div>

      {/* MANDATORY LEGAL & DUE PROCESS SAFEGUARD CALLOUT */}
      <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl text-xs text-red-950 space-y-2">
        <div className="flex items-center gap-2 text-red-900 font-bold">
          <ShieldAlert className="w-4 h-4 text-[#B91C1C]" />
          <span>Statutory Due Process Notice — Anti-Automation Safeguard:</span>
        </div>
        <p className="text-red-900 leading-relaxed">
          Pursuant to the Philippine Labor Code (Articles 297–299) and the Davao Central College Faculty Operations Manual,
          <strong> no faculty member may ever be terminated, suspended, or sanctioned automatically based on student evaluation scores or algorithmic ratings.</strong>
          TeachReach strictly prohibits automated adverse personnel decisions. Any employment intervention requires authorized human referral,
          formal written Notice of Explanation (Twin Notice Rule), an impartial administrative conference, documented evidence review, and executive committee deliberation.
        </p>
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

      {/* HR Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Referred Cases */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#171717] mb-3 pb-2 border-b border-[#E5E5E5]">
              Authorized HR Referral Dockets ({records.length})
            </h3>

            <div className="space-y-3">
              {records.map((rec) => {
                const isSelected = selectedRecord?.id === rec.id;

                return (
                  <div
                    key={rec.id}
                    onClick={() => handleSelectRecord(rec)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/25 ring-1 ring-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#B91C1C] block">
                          {rec.caseNumber}
                        </span>
                        <h4 className="text-xs font-bold text-[#171717] mt-0.5">
                          {rec.teacherName}
                        </h4>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                        {rec.stage}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-[#737373]">
                      <span>Source: {rec.referralSource}</span>
                      <span className="block font-mono text-[10px]">Referred: {rec.dateReferred}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {rec.documentedConcerns[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Case Examination & Due Process Stage Management */}
        <div className="lg:col-span-7 space-y-4">
          {selectedRecord && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
              <div className="pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#B91C1C]">
                    DOCKET NO. {selectedRecord.caseNumber}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Mandatory Human Review: ACTIVE
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#171717] mt-1">
                  {selectedRecord.teacherName} — {selectedRecord.department}
                </h3>
              </div>

              {/* Documented Evidence from Prior Processes */}
              <div className="p-4 bg-slate-50 border border-[#E5E5E5] rounded-xl text-xs space-y-2">
                <span className="font-semibold text-[#171717] uppercase tracking-wider text-[11px] block">
                  Documented Academic Concerns & Prior Intervention History:
                </span>
                <ul className="space-y-1.5 text-slate-800">
                  {selectedRecord.documentedConcerns.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B91C1C] font-bold">§{i + 1}</span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policy Articles Applied */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#171717] block flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#B91C1C]" />
                  Applicable Institutional Policies & Legal Benchmarks:
                </span>
                <div className="space-y-1">
                  {selectedRecord.facultyManualArticles.map((art, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200">
                      {art}
                    </div>
                  ))}
                </div>
              </div>

              {/* Due Process Stage Selector */}
              <div className="space-y-2 text-xs">
                <label className="block font-semibold text-[#171717]">
                  Due Process Progress Stage (Twin Notice Standard):
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as DueProcessStage)}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-medium text-[#171717]"
                >
                  <option value="Authorized Referral Received">1. Authorized Referral Received & Verified</option>
                  <option value="Notice of Explanation Issued">2. Notice of Explanation Issued (First Notice Served)</option>
                  <option value="Administrative Conference Scheduled">3. Administrative Conference Scheduled (Right to Hearing)</option>
                  <option value="Under Human Evaluation">4. Under Human Evaluation by HR & Academic Committee</option>
                  <option value="Executive Decision Documented">5. Executive Decision Documented (Second Notice / Resolution)</option>
                </select>
              </div>

              {/* Human Review Notes Area */}
              <div className="space-y-2 text-xs">
                <label className="block font-semibold text-[#171717]">
                  HR Officer Human Deliberation Minutes & Findings:
                </label>
                <textarea
                  rows={4}
                  value={humanNotes}
                  onChange={(e) => setHumanNotes(e.target.value)}
                  placeholder="Record verification of notice service dates, written response received from faculty member, committee discussion notes..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs leading-relaxed text-[#171717]"
                />
              </div>

              {/* Reviewer Signoff Strip */}
              <div className="pt-3 border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-[11px] text-[#737373]">
                  <span>Assigned Reviewer: <strong>{selectedRecord.assignedHRReviewer}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={handleSaveDueProcess}
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save HR Due Process Record
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
