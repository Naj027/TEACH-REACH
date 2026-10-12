import React, { useState } from 'react';
import { EvaluationDistribution } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Info,
  Send,
  Users
} from 'lucide-react';

export const Process5EvaluationDistribution: React.FC = () => {
  const [distributions, setDistributions] = useState<EvaluationDistribution[]>(() => dataService.getDistributions());
  const [copiedLinkMap, setCopiedLinkMap] = useState<Record<string, boolean>>({});
  const [copiedMemoMap, setCopiedMemoMap] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const handleCopyLink = (dist: EvaluationDistribution) => {
    navigator.clipboard.writeText(dist.evaluationLink);
    setCopiedLinkMap(prev => ({ ...prev, [dist.id]: true }));
    setTimeout(() => {
      setCopiedLinkMap(prev => ({ ...prev, [dist.id]: false }));
    }, 2500);
    showNotice(`Evaluation link copied for ${dist.section}.`);
  };

  const handleCopyMemo = (dist: EvaluationDistribution) => {
    navigator.clipboard.writeText(dist.preparedAnnouncementText);
    setCopiedMemoMap(prev => ({ ...prev, [dist.id]: true }));
    setTimeout(() => {
      setCopiedMemoMap(prev => ({ ...prev, [dist.id]: false }));
    }, 2500);
    showNotice(`Pre-formatted class GC announcement copied to clipboard.`);
  };

  const handleMarkShared = (distId: string, platform: string) => {
    dataService.markDistributionShared(distId, platform);
    setDistributions(dataService.getDistributions());
    showNotice(`Marked distribution as shared to ${platform}.`);
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
            <span className="font-semibold text-[#B91C1C]">DFD Process 5.0</span>
            <span>·</span>
            <span>Faculty Distribution Channel</span>
            <span>·</span>
            <span className="font-mono">Classroom Engagement</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Class Group Chat Evaluation Distribution</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Facilitate student participation by providing official evaluation announcements and links directly to your class sections.
            Copy pre-formatted broadcast messages formatted for student comprehension and privacy reassurance.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs px-3 py-1.5 bg-[#FEE2E2] text-[#B91C1C] rounded-lg font-medium border border-[#B91C1C]/20">
            {distributions.filter(d => d.status === 'Shared').length} of {distributions.length} Sections Shared
          </span>
        </div>
      </div>

      {/* Realistic Integration Disclaimer */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#171717]">Distribution Protocol & External Messaging:</p>
          <p className="leading-relaxed text-[#737373]">
            TeachReach generates verified links and approved broadcast copy. In line with institutional IT privacy guidelines,
            the platform does not inject direct scripts into third-party messaging networks (such as Facebook Messenger or Discord).
            Teachers copy the pre-formatted announcement below and paste it into their official DCC class group chat.
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

      {/* Distribution Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {distributions.map((dist) => {
          const isLinkCopied = copiedLinkMap[dist.id];
          const isMemoCopied = copiedMemoMap[dist.id];

          return (
            <div 
              key={dist.id} 
              className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E5E5E5]">
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#B91C1C] block">
                      {dist.subjectCode}
                    </span>
                    <h3 className="text-sm font-bold text-[#171717] mt-0.5">
                      {dist.section}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                    dist.status === 'Shared'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {dist.status}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="text-[11px] text-[#737373]">
                    <strong>Target Cycle:</strong> {dist.announcementTitle}
                  </div>

                  {/* Evaluation Link Field */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#737373] mb-1">
                      Official Student Evaluation Link:
                    </label>
                    <div className="flex items-center gap-2 bg-slate-50 border border-[#E5E5E5] rounded-lg p-2 font-mono text-[11px] text-[#171717]">
                      <span className="truncate flex-1">{dist.evaluationLink}</span>
                      <button
                        onClick={() => handleCopyLink(dist)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-sans font-medium text-slate-700 flex items-center gap-1 shrink-0 transition-colors"
                        title="Copy evaluation URL"
                      >
                        {isLinkCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Pre-formatted Group Chat Broadcast Box */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-medium text-[#737373]">
                        Ready-to-Post Class Group Chat Message:
                      </label>
                      <button
                        onClick={() => handleCopyMemo(dist)}
                        className="text-[11px] text-[#B91C1C] hover:underline font-semibold flex items-center gap-1"
                      >
                        {isMemoCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {isMemoCopied ? 'Copied Message' : 'Copy Full Message'}
                      </button>
                    </div>
                    <div className="p-3 bg-slate-50 border border-[#E5E5E5] rounded-lg text-slate-700 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                      {dist.preparedAnnouncementText}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Action Strip */}
              <div className="pt-3 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-[11px] text-[#737373]">
                  {dist.status === 'Shared' ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Shared on {dist.sharedDate || 'Messenger'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700">
                      <Clock className="w-3.5 h-3.5" />
                      Awaiting faculty distribution
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {dist.status !== 'Shared' ? (
                    <button
                      onClick={() => handleMarkShared(dist.id, 'Messenger Class GC')}
                      className="px-3 py-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Confirm Shared to GC
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkShared(dist.id, 'Messenger Reminder Sent')}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      Send Reminder Note
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
