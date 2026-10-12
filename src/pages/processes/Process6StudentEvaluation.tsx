import React, { useState } from 'react';
import { EvaluationQuestion } from '../../types';
import { dataService } from '../../services/dataService';
import { ASSETS } from '../../assets/assetPaths';
import { 
  PenTool, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  Lock, 
  AlertCircle, 
  Send, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface FormProps {
  onEvaluationCompleted?: () => void;
}

export const Process6StudentEvaluation: React.FC<FormProps> = ({ onEvaluationCompleted }) => {
  const [questions] = useState<EvaluationQuestion[]>(() => 
    dataService.getQuestions().filter(q => q.isActive)
  );

  // Student selects which enrolled course to evaluate
  const [selectedCourse, setSelectedCourse] = useState({
    teacherId: 'usr-teacher-01',
    teacherName: 'Engr. Ronald P. Mendoza, MSIT',
    subjectCode: 'IT 312',
    subjectName: 'Web Systems and Technologies II',
    section: 'BSIT 3-A',
    academicPeriod: '2nd Semester, AY 2025-2026'
  });

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [writtenFeedback, setWrittenFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(ratings).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [questionId]: rating }));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that every active question is answered
    const unanswered = questions.filter(q => !ratings[q.id]);
    if (unanswered.length > 0) {
      setValidationError(`Please provide a rating for all questions (${unanswered.length} remaining).`);
      // Scroll to first unanswered item
      const el = document.getElementById(`question-card-${unanswered[0].id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      dataService.submitStudentEvaluation({
        teacherId: selectedCourse.teacherId,
        subjectCode: selectedCourse.subjectCode,
        ratings,
        writtenFeedback
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onEvaluationCompleted) onEvaluationCompleted();
    }, 600);
  };

  const handleResetForNextCourse = () => {
    setRatings({});
    setWrittenFeedback('');
    setIsSubmitted(false);
    setSelectedCourse({
      teacherId: 'usr-teacher-02',
      teacherName: 'Prof. Aniceto G. Morales',
      subjectCode: 'GENED 104',
      subjectName: 'Mathematics in the Modern World',
      section: 'BSED 1-A',
      academicPeriod: '2nd Semester, AY 2025-2026'
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95">
        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">
              Evaluation Successfully Submitted!
            </h2>
            <p className="text-xs text-[#737373] max-w-md mx-auto leading-relaxed">
              Thank you for contributing to instructional excellence at Davao Central College.
              Your evaluation for <strong>{selectedCourse.subjectCode} ({selectedCourse.teacherName})</strong> has been securely recorded.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Anonymity Enforced</span>
            </div>
            <p className="text-[#737373] leading-relaxed">
              Your student identification (Name, Student ID, Email) was separated at submission.
              Neither the instructor nor department administrators can link your identity to these ratings or written comments.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleResetForNextCourse}
              className="px-5 py-2.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
            >
              Evaluate Another Course
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header and Privacy Assurance Banner */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
              <span className="font-semibold text-[#B91C1C]">DFD Process 6.0</span>
              <span>·</span>
              <span>Student Confidential Evaluation</span>
              <span>·</span>
              <span className="font-mono">5-Point Likert</span>
            </div>
            <h2 className="text-xl font-bold text-[#171717]">Student Evaluation of Faculty Teaching</h2>
            <p className="text-xs text-[#737373] mt-1">
              Davao Central College · Guidance & Testing Center
            </p>
          </div>

          {/* Confidentiality Lock Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium self-start">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Anonymous Submission</span>
          </div>
        </div>

        {/* Selected Course Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[#737373] block text-[11px]">Instructor Being Evaluated:</span>
            <span className="font-bold text-[#171717] text-sm">{selectedCourse.teacherName}</span>
          </div>
          <div>
            <span className="text-[#737373] block text-[11px]">Subject Code & Description:</span>
            <span className="font-semibold text-[#171717]">
              {selectedCourse.subjectCode} — {selectedCourse.subjectName}
            </span>
          </div>
          <div>
            <span className="text-[#737373] block text-[11px]">Section / Class:</span>
            <span className="font-medium text-[#171717]">{selectedCourse.section}</span>
          </div>
          <div>
            <span className="text-[#737373] block text-[11px]">Evaluation Cycle:</span>
            <span className="font-mono text-[#171717]">{selectedCourse.academicPeriod}</span>
          </div>
        </div>

        {/* Instructions & Likert Scale Legend */}
        <div className="mt-4 p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-2">
          <p className="font-semibold">Instructions for Students:</p>
          <p className="text-amber-900 leading-relaxed">
            Please evaluate your instructor objectively based on classroom experiences throughout this term.
            Select the rating that best reflects your appraisal using the five-point Likert scale below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-center text-[11px] font-medium pt-1">
            <div className="bg-white p-1 rounded border border-amber-200 font-bold text-emerald-700">5: Strongly Agree</div>
            <div className="bg-white p-1 rounded border border-amber-200 text-emerald-600">4: Agree</div>
            <div className="bg-white p-1 rounded border border-amber-200 text-slate-700">3: Neutral</div>
            <div className="bg-white p-1 rounded border border-amber-200 text-amber-700">2: Disagree</div>
            <div className="bg-white p-1 rounded border border-amber-200 text-red-700 font-bold">1: Strongly Disagree</div>
          </div>
        </div>
      </div>

      {/* Progress Bar Sticky Strip */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-xs border border-[#E5E5E5] rounded-xl p-3 shadow-xs flex items-center justify-between gap-4 text-xs">
        <div className="flex-1">
          <div className="flex justify-between mb-1 text-[11px] font-medium">
            <span className="text-[#171717]">Questionnaire Progress:</span>
            <span className="font-mono font-bold text-[#B91C1C] tabular-nums">
              {answeredCount} / {totalQuestions} Answered ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-[#B91C1C] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Evaluation Questions Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q, idx) => {
          const currentRating = ratings[q.id];

          return (
            <div 
              key={q.id}
              id={`question-card-${q.id}`}
              className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${
                currentRating ? 'border-[#E5E5E5]' : 'border-[#E5E5E5] hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-xs text-[#B91C1C]">
                      Question {idx + 1} of {totalQuestions}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] text-[#737373]">{q.category}</span>
                  </div>
                  <p className="text-sm font-medium text-[#171717] leading-relaxed">
                    {q.text}
                  </p>
                </div>
              </div>

              {/* Likert Buttons Row */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {[
                  { value: 5, label: 'Strongly Agree', short: 'SA' },
                  { value: 4, label: 'Agree', short: 'A' },
                  { value: 3, label: 'Neutral', short: 'N' },
                  { value: 2, label: 'Disagree', short: 'D' },
                  { value: 1, label: 'Strongly Disagree', short: 'SD' }
                ].map((opt) => {
                  const isSelected = currentRating === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleRatingChange(q.id, opt.value)}
                      className={`py-2.5 px-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? 'border-[#B91C1C] bg-[#B91C1C] text-white shadow-xs font-semibold'
                          : 'border-[#E5E5E5] bg-slate-50/50 hover:bg-slate-100 text-[#171717]'
                      }`}
                    >
                      <span className="font-mono text-base font-bold leading-none">{opt.value}</span>
                      <span className="text-[10px] hidden sm:inline truncate max-w-full opacity-90">
                        {opt.label}
                      </span>
                      <span className="text-[9px] sm:hidden font-mono">
                        {opt.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Written Feedback Section */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs space-y-2">
          <label className="block text-sm font-semibold text-[#171717]">
            Optional Constructive Comments & Suggestions
          </label>
          <p className="text-xs text-[#737373]">
            What specific teaching practices did this instructor do well? What concrete suggestions do you recommend for improvement?
            (Anonymized before delivery to faculty).
          </p>
          <textarea
            rows={4}
            value={writtenFeedback}
            onChange={(e) => setWrittenFeedback(e.target.value)}
            placeholder="Write constructive suggestions here (e.g. pace of lecture, practical exercises, grading feedback clarity)..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:outline-hidden focus:border-[#B91C1C] leading-relaxed"
          />
        </div>

        {/* Final Submission Card */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#737373]">
            <p className="font-semibold text-[#171717]">Ready to finalize submission?</p>
            <p>Ensure all ratings represent your objective academic evaluation.</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Encrypting & Recording...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Anonymous Evaluation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
