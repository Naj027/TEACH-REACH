import React, { useState } from 'react';
import { QuestionnaireReview, EvaluationQuestion, ReviewStatus } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Save, 
  FileCheck,
  Check,
  Clock,
  MessageSquareQuote,
  ShieldCheck
} from 'lucide-react';

export const Process2QuestionReview: React.FC = () => {
  const [reviews, setReviews] = useState<QuestionnaireReview[]>(() => dataService.getQuestionReviews());
  const [activeReviewId, setActiveReviewId] = useState<string>(reviews[0]?.id || '');
  const [questions] = useState<EvaluationQuestion[]>(() => dataService.getQuestions());
  const [notification, setNotification] = useState<string | null>(null);

  const currentReview = reviews.find(r => r.id === activeReviewId) || reviews[0];

  const [remarks, setRemarks] = useState(currentReview?.remarks || '');
  const [recommendations, setRecommendations] = useState(currentReview?.recommendations || '');
  const [status, setStatus] = useState<ReviewStatus>(currentReview?.status || 'Pending Review');

  const handleSelectReview = (rev: QuestionnaireReview) => {
    setActiveReviewId(rev.id);
    setRemarks(rev.remarks);
    setRecommendations(rev.recommendations);
    setStatus(rev.status);
  };

  const handleSaveReview = (newStatus?: ReviewStatus) => {
    if (!currentReview) return;
    const effectiveStatus = newStatus || status;
    const updated: QuestionnaireReview = {
      ...currentReview,
      remarks,
      recommendations,
      status: effectiveStatus,
      reviewedDate: new Date().toISOString().split('T')[0]
    };

    dataService.updateQuestionReview(updated);
    setReviews(dataService.getQuestionReviews());
    setStatus(effectiveStatus);
    showNotice(`Questionnaire review updated: Marked as ${effectiveStatus}.`);
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
            <span className="font-semibold text-[#B91C1C]">DFD Process 2.0</span>
            <span>·</span>
            <span>Principal & Academic Coordinator Authority</span>
            <span>·</span>
            <span className="font-mono">Quality Assurance Gate</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Questionnaire Review & Validation</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Examine and validate the proposed classroom teaching evaluation questions prior to Guidance Office schedule release.
            This stage ensures institutional alignment with DCC standards, curriculum competencies, and DepEd/CHED quality mandates.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md font-mono text-slate-700">
            Current Status: <strong>{status}</strong>
          </span>
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

      {/* Review Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-2 text-xs">
        {reviews.map(r => (
          <button
            key={r.id}
            onClick={() => handleSelectReview(r)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              r.id === activeReviewId 
                ? 'bg-[#B91C1C] text-white shadow-xs' 
                : 'bg-white border border-[#E5E5E5] text-[#171717] hover:bg-slate-50'
            }`}
          >
            {r.evaluationPeriod} ({r.version})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Questions under inspection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E5E5]">
              <div>
                <h3 className="text-sm font-semibold text-[#171717]">
                  Questionnaire Under Examination
                </h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  {questions.filter(q => q.isActive).length} Active evaluation items in {currentReview?.version}
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                Scale: 5-pt Likert
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 text-xs">
              {questions.map((q, idx) => (
                <div 
                  key={q.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    q.isActive 
                      ? 'border-[#E5E5E5] bg-slate-50/50' 
                      : 'border-dashed border-slate-200 bg-slate-100/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-[#B91C1C]">Item #{idx + 1}</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.2 bg-white border border-slate-200 rounded text-slate-600">
                          {q.category}
                        </span>
                        {!q.isActive && (
                          <span className="text-[10px] font-medium text-slate-500">
                            (Inactive)
                          </span>
                        )}
                      </div>
                      <p className="text-[#171717] font-medium leading-relaxed">{q.text}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#737373] shrink-0">
                      Likert 1-5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Review Action Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-[#E5E5E5] pb-3">
              <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B91C1C]" />
                Institutional Review & Endorsement
              </h3>
              <p className="text-xs text-[#737373] mt-0.5">
                Principal & Academic Coordinator Quality Verification
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#171717] mb-1">Reviewing Authorities</label>
                <div className="p-2.5 bg-slate-50 border border-[#E5E5E5] rounded-lg text-slate-700">
                  {currentReview?.reviewedBy || 'Office of the Principal & Academic Coordinator'}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Current Validation Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Approved', 'Pending Review', 'Returned for Revision', 'Draft'] as ReviewStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatus(st)}
                      className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                        status === st 
                          ? 'border-[#B91C1C] bg-[#FEE2E2]/40 text-[#B91C1C] font-semibold' 
                          : 'border-[#E5E5E5] text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Examination Remarks <span className="text-[#B91C1C]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter specific audit observations regarding question clarity, balance of categories, or phrasing..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#171717] leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Recommendations & Implementation Guidance
                </label>
                <textarea
                  rows={3}
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="Provide guidance to Guidance Office regarding evaluation schedule timing or student briefing..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#171717] leading-relaxed"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-[#E5E5E5] text-[11px] text-[#737373] space-y-1">
                <div className="flex justify-between">
                  <span>Instrument Version:</span>
                  <span className="font-mono text-[#171717] font-semibold">{currentReview?.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Review Date:</span>
                  <span className="font-mono text-[#171717]">{currentReview?.reviewedDate || 'Not yet recorded'}</span>
                </div>
              </div>
            </div>

            {/* Decision Actions */}
            <div className="pt-2 border-t border-[#E5E5E5] flex flex-col gap-2">
              <button
                onClick={() => handleSaveReview('Approved')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Check className="w-4 h-4" />
                Approve & Endorse for Deployment (Process 3.0)
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSaveReview('Returned for Revision')}
                  className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-medium transition-colors"
                >
                  Return for Revision
                </button>
                <button
                  onClick={() => handleSaveReview()}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Remarks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
