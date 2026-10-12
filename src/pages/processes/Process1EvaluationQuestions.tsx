import React, { useState } from 'react';
import { EvaluationQuestion, QuestionCategory, QuestionType } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Power, 
  X,
  FileQuestion,
  HelpCircle
} from 'lucide-react';

const CATEGORIES: QuestionCategory[] = [
  'Instructional Competence',
  'Classroom Management',
  'Assessment & Feedback',
  'Student Engagement',
  'Professionalism & Ethics'
];

export const Process1EvaluationQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<EvaluationQuestion[]>(() => dataService.getQuestions());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<EvaluationQuestion> | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.number.toString().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && q.isActive) ||
                          (statusFilter === 'inactive' && !q.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingQuestion({
      number: questions.length + 1,
      text: '',
      category: 'Instructional Competence',
      type: 'likert_5',
      isActive: true,
      version: 'AY2025-2026.v2'
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (q: EvaluationQuestion) => {
    setEditingQuestion({ ...q });
    setIsEditModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion || !editingQuestion.text?.trim()) return;

    dataService.saveQuestion(editingQuestion as EvaluationQuestion);
    setQuestions(dataService.getQuestions());
    setIsEditModalOpen(false);
    setEditingQuestion(null);
    showNotice('Evaluation question saved successfully.');
  };

  const handleToggleActive = (id: string) => {
    dataService.toggleQuestionActive(id);
    setQuestions(dataService.getQuestions());
    showNotice('Question active status toggled.');
  };

  const showNotice = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Process Context */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="font-semibold text-[#B91C1C]">DFD Process 1.0</span>
            <span>·</span>
            <span>Academic Affairs & Principal Workflow</span>
            <span>·</span>
            <span className="font-mono">Instrument AY2025-2026.v2</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Evaluation Questions</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Configure, curate, and maintain classroom teaching evaluation criteria for Davao Central College.
            Changes to the question pool will be queued for institutional approval under Process 2.0.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded-lg text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4 text-[#737373]" />
            Preview Questionnaire
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {actionSuccess}
          </span>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search evaluation question text or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs focus:outline-hidden focus:border-[#B91C1C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:outline-hidden focus:border-[#B91C1C]"
          >
            <option value="all">All Categories ({questions.length})</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:outline-hidden focus:border-[#B91C1C]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Questions Data Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#E5E5E5] text-[#737373] font-semibold">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Question Text</th>
                <th className="py-3 px-4 w-48">Category</th>
                <th className="py-3 px-4 w-28">Response Type</th>
                <th className="py-3 px-4 w-24 text-center">Status</th>
                <th className="py-3 px-4 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#737373]">
                    <FileQuestion className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No evaluation questions found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center font-mono font-medium text-[#737373] tabular-nums">
                      {q.number}
                    </td>
                    <td className="py-3 px-4 text-[#171717] leading-relaxed font-medium">
                      {q.text}
                      <div className="text-[11px] text-[#737373] mt-0.5 font-normal">
                        Instrument Version: {q.version} · Updated: {q.lastUpdated}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#171717]">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800">
                        {q.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#737373] font-mono text-[11px]">
                      {q.type === 'likert_5' ? '5-Point Likert' : 'Open Feedback'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        q.isActive ? 'text-emerald-700' : 'text-slate-400'
                      }`}>
                        {q.isActive ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" /> Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(q)}
                          className="p-1.5 text-slate-600 hover:text-[#B91C1C] hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit question text or category"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(q.id)}
                          className={`p-1.5 rounded-md transition-colors ${
                            q.isActive 
                              ? 'text-slate-500 hover:text-amber-700 hover:bg-amber-50' 
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={q.isActive ? 'Deactivate question' : 'Activate question'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#737373]">
          <span>Showing {filteredQuestions.length} of {questions.length} questions</span>
          <span>Approved DCC Standard Likert Scale: 5 (Strongly Agree) to 1 (Strongly Disagree)</span>
        </div>
      </div>

      {/* Add / Edit Question Modal */}
      {isEditModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">
                {editingQuestion.id ? 'Edit Evaluation Question' : 'Create New Evaluation Question'}
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-[#737373] hover:text-[#171717] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Question Number <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={editingQuestion.number || 1}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, number: parseInt(e.target.value) || 1 })}
                  className="w-24 px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Evaluation Dimension / Category <span className="text-[#B91C1C]">*</span>
                </label>
                <select
                  value={editingQuestion.category || 'Instructional Competence'}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value as QuestionCategory })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-[#171717]"
                  required
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Evaluation Question Text <span className="text-[#B91C1C]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={editingQuestion.text || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                  placeholder="e.g. Demonstrates deep mastery of the subject matter and explains concepts clearly."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-[#171717] leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Response Type</label>
                  <select
                    value={editingQuestion.type || 'likert_5'}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value as QuestionType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  >
                    <option value="likert_5">5-Point Likert Scale (1-5)</option>
                    <option value="open_feedback">Open-Ended Written Comment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#171717] mb-1">Active Status</label>
                  <select
                    value={editingQuestion.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, isActive: e.target.value === 'active' })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  >
                    <option value="active">Active (Include in evaluation)</option>
                    <option value="inactive">Inactive (Archived)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold transition-colors"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Questionnaire Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-sm text-[#171717]">
                  DCC Student Evaluation Questionnaire Preview
                </h3>
                <p className="text-xs text-[#737373]">
                  AY 2025-2026 Official Instrument · Showing {questions.filter(q => q.isActive).length} active items
                </p>
              </div>
              <button 
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1 text-[#737373] hover:text-[#171717] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 leading-relaxed">
                <strong className="block font-semibold mb-1">Standard Likert Rating Scale:</strong>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-medium pt-1">
                  <span className="bg-white p-1.5 rounded border border-amber-200">5 — Strongly Agree</span>
                  <span className="bg-white p-1.5 rounded border border-amber-200">4 — Agree</span>
                  <span className="bg-white p-1.5 rounded border border-amber-200">3 — Neutral</span>
                  <span className="bg-white p-1.5 rounded border border-amber-200">2 — Disagree</span>
                  <span className="bg-white p-1.5 rounded border border-amber-200">1 — Strongly Disagree</span>
                </div>
              </div>

              <div className="space-y-3">
                {questions.filter(q => q.isActive).map((q, idx) => (
                  <div key={q.id} className="p-3 border border-[#E5E5E5] rounded-lg bg-slate-50/50">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-[#B91C1C] mr-1.5">Q{idx + 1}.</span>
                        <span className="text-[#171717] font-medium">{q.text}</span>
                        <p className="text-[11px] text-[#737373] mt-1">Category: {q.category}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {[5, 4, 3, 2, 1].map(score => (
                          <span 
                            key={score} 
                            className="w-6 h-6 rounded border border-slate-300 bg-white flex items-center justify-center font-mono text-[11px] text-slate-600"
                          >
                            {score}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#E5E5E5] bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-2 bg-[#B91C1C] text-white rounded-lg font-medium text-xs hover:bg-[#991B1B]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
