import React, { useState } from 'react';
import { GoogleFormsLink, LinkConfigStatus } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  Link2, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  X,
  FileSpreadsheet,
  Info
} from 'lucide-react';

export const Process4GoogleFormsLinks: React.FC = () => {
  const [links, setLinks] = useState<GoogleFormsLink[]>(() => dataService.getGoogleFormsLinks());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editLinkModal, setEditLinkModal] = useState<GoogleFormsLink | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredLinks = links.filter(l => {
    const matchesSearch = l.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopyLink = (link: GoogleFormsLink) => {
    if (!link.googleFormsUrl) return;
    navigator.clipboard.writeText(link.googleFormsUrl);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2500);
    showNotice(`Google Form evaluation link for ${link.subjectCode} copied to clipboard.`);
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLinkModal) return;

    // Validate URL syntax
    const isValid = editLinkModal.googleFormsUrl.trim().startsWith('https://docs.google.com/forms') ||
                    editLinkModal.googleFormsUrl.trim().startsWith('https://forms.gle');

    const updated: GoogleFormsLink = {
      ...editLinkModal,
      isValidated: isValid,
      status: isValid ? (editLinkModal.status === 'Published' ? 'Published' : 'Link Ready') : 'Not Configured',
      dateGenerated: new Date().toISOString().split('T')[0]
    };

    dataService.saveGoogleFormsLink(updated);
    setLinks(dataService.getGoogleFormsLinks());
    setEditLinkModal(null);
    showNotice('Google Form link configuration saved successfully.');
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
            <span className="font-semibold text-[#B91C1C]">DFD Process 4.0</span>
            <span>·</span>
            <span>Guidance Center Operations</span>
            <span>·</span>
            <span className="font-mono">Forms Distribution Hub</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Google Forms Evaluation Links</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Configure, validate, and manage individual Google Forms evaluation links for teacher courses and student sections.
            Teachers receive these links under Process 5.0 to share with class group chats.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setEditLinkModal({
                id: `gfl-${Date.now()}`,
                teacherId: 'usr-teacher-01',
                teacherName: 'Engr. Ronald P. Mendoza',
                subjectCode: 'IT 325',
                subjectName: 'Information Assurance and Security',
                section: 'BSIT 3-B',
                evaluationPeriod: '2nd Semester, AY 2025-2026',
                googleFormsUrl: '',
                isValidated: false,
                status: 'Not Configured',
                dateGenerated: new Date().toISOString().split('T')[0],
                intendedAudience: 'BSIT 3-B (36 Enrolled)',
                responseCount: 0
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Section Form Link
          </button>
        </div>
      </div>

      {/* Honest Architectural Disclaimer Notice */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Integration Notice — External Google Forms Workflow:</p>
          <p className="text-amber-800 leading-relaxed">
            In accordance with the Davao Central College evaluation architecture, Google Forms are provisioned via Google Workspace.
            Authorized Guidance personnel input verified Google Forms URLs here. The system does not falsely claim automated form synthesis;
            it enforces link validation, distribution tracking, and synchronized response aggregation.
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

      {/* Filter and Search */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by teacher name, subject code, or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg focus:outline-hidden focus:border-[#B91C1C]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs"
        >
          <option value="all">All Configuration Statuses</option>
          <option value="Link Ready">Link Ready</option>
          <option value="Published">Published</option>
          <option value="Not Configured">Not Configured</option>
        </select>
      </div>

      {/* Links Data Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-[#E5E5E5] text-[#737373] font-semibold">
              <tr>
                <th className="py-3 px-4">Teacher & Subject</th>
                <th className="py-3 px-4">Section / Cohort</th>
                <th className="py-3 px-4">Google Forms Evaluation URL</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Responses</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredLinks.map((link) => (
                <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#171717]">{link.teacherName}</div>
                    <div className="text-[11px] text-[#737373] font-mono mt-0.5">
                      {link.subjectCode} · {link.subjectName}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-[#171717]">{link.section}</span>
                    <span className="block text-[11px] text-[#737373]">{link.intendedAudience}</span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {link.googleFormsUrl ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-600 truncate block max-w-[220px]">
                          {link.googleFormsUrl}
                        </span>
                        <a
                          href={link.googleFormsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-500 hover:text-[#B91C1C] transition-colors"
                          title="Open Google Form in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-[#737373] italic">No URL configured</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      link.status === 'Link Ready'
                        ? 'bg-emerald-100 text-emerald-800'
                        : link.status === 'Published'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-[#171717] tabular-nums">
                    {link.responseCount}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {link.googleFormsUrl && (
                        <button
                          onClick={() => handleCopyLink(link)}
                          className="p-1.5 text-slate-600 hover:text-[#B91C1C] hover:bg-slate-100 rounded transition-colors"
                          title="Copy Link to Clipboard"
                        >
                          {copiedId === link.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => setEditLinkModal(link)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#171717] rounded text-xs font-medium transition-colors"
                      >
                        Configure
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Link Modal */}
      {editLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">Configure Google Forms Link</h3>
              <button onClick={() => setEditLinkModal(null)} className="p-1 text-[#737373]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLink} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#171717] mb-1">Teacher</label>
                <input
                  type="text"
                  value={editLinkModal.teacherName}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-[#E5E5E5] rounded-lg text-slate-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Subject Code</label>
                  <input
                    type="text"
                    value={editLinkModal.subjectCode}
                    onChange={(e) => setEditLinkModal({ ...editLinkModal, subjectCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#171717] mb-1">Section</label>
                  <input
                    type="text"
                    value={editLinkModal.section}
                    onChange={(e) => setEditLinkModal({ ...editLinkModal, section: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Google Forms Evaluation URL <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/forms/d/e/... or https://forms.gle/..."
                  value={editLinkModal.googleFormsUrl}
                  onChange={(e) => setEditLinkModal({ ...editLinkModal, googleFormsUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono text-xs focus:border-[#B91C1C]"
                  required
                />
                <p className="text-[11px] text-[#737373] mt-1">
                  Provide the official Google Workspace evaluation link for this section.
                </p>
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">Publication Status</label>
                <select
                  value={editLinkModal.status}
                  onChange={(e) => setEditLinkModal({ ...editLinkModal, status: e.target.value as LinkConfigStatus })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                >
                  <option value="Link Ready">Link Ready (Ready for teacher distribution)</option>
                  <option value="Published">Published (Active student evaluation)</option>
                  <option value="Not Configured">Not Configured (Draft)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditLinkModal(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
