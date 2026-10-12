import React, { useState } from 'react';
import { ImprovementMonitoring, ImprovementStatus } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Clock, 
  UserCheck, 
  FileCheck, 
  X,
  Save,
  ArrowUpRight
} from 'lucide-react';

export const Process10ImprovementMonitoring: React.FC = () => {
  const [improvements, setImprovements] = useState<ImprovementMonitoring[]>(() => dataService.getImprovements());
  const [selectedRecord, setSelectedRecord] = useState<ImprovementMonitoring>(improvements[0]);
  const [isAddObservationOpen, setIsAddObservationOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New observation state
  const [obsObserver, setObsObserver] = useState('Prof. Carmencita V. Alcantara');
  const [obsSummary, setObsSummary] = useState('');
  const [obsRating, setObsRating] = useState<number>(4.0);

  const handleSelectRecord = (rec: ImprovementMonitoring) => {
    setSelectedRecord(rec);
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord || !obsSummary.trim()) return;

    const newObs = {
      date: new Date().toISOString().split('T')[0],
      observer: obsObserver,
      observationSummary: obsSummary.trim(),
      ratingGiven: obsRating
    };

    const updatedObservations = [...selectedRecord.followUpObservations, newObs];
    
    // Recalculate updated mean
    const totalRatings = updatedObservations.map(o => o.ratingGiven);
    const newMean = totalRatings.reduce((acc, curr) => acc + curr, 0) / totalRatings.length;

    const updatedRecord: ImprovementMonitoring = {
      ...selectedRecord,
      followUpObservations: updatedObservations,
      updatedMeanScore: parseFloat(newMean.toFixed(2)),
      progressStatus: newMean >= 4.0 ? 'Completed' : 'Improvement Observed',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    dataService.saveImprovement(updatedRecord);
    setImprovements(dataService.getImprovements());
    setSelectedRecord(updatedRecord);
    setIsAddObservationOpen(false);
    setObsSummary('');
    showNotice('Classroom follow-up observation logged successfully.');
  };

  const handleUpdateStatus = (rec: ImprovementMonitoring, status: ImprovementStatus) => {
    const updated = { ...rec, progressStatus: status, lastUpdated: new Date().toISOString().split('T')[0] };
    dataService.saveImprovement(updated);
    setImprovements(dataService.getImprovements());
    setSelectedRecord(updated);
    showNotice(`Progress status updated to "${status}".`);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusColor = (st: ImprovementStatus) => {
    switch (st) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800';
      case 'Improvement Observed': return 'bg-blue-100 text-blue-800';
      case 'Further Support Needed': return 'bg-amber-100 text-amber-800';
      case 'In Progress': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Process Context */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="font-semibold text-[#B91C1C]">DFD Process 10.0</span>
            <span>·</span>
            <span>Academic Affairs & Guidance Center Monitoring</span>
            <span>·</span>
            <span className="font-mono">Longitudinal Progress</span>
          </div>
          <h2 className="text-xl font-bold text-[#171717] mt-1">Improvement Monitoring & Verification</h2>
          <p className="text-xs text-[#737373] mt-1 max-w-2xl">
            Track pedagogical progress following intervention programs. Document post-intervention classroom observations,
            re-evaluate instructional metrics, and verify sustained teaching quality.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddObservationOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Log Classroom Observation
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

      {/* Monitoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Faculty Monitoring Trackers */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-[#171717] mb-3 pb-2 border-b border-[#E5E5E5]">
              Monitored Faculty Cases ({improvements.length})
            </h3>

            <div className="space-y-2.5">
              {improvements.map((rec) => {
                const isSelected = selectedRecord?.id === rec.id;

                return (
                  <div
                    key={rec.id}
                    onClick={() => handleSelectRecord(rec)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/25 ring-1 ring-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-xs text-[#171717]">{rec.teacherName}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${getStatusColor(rec.progressStatus)}`}>
                        {rec.progressStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-[11px] font-mono">
                      <span className="text-[#737373]">Baseline: {rec.originalMeanScore.toFixed(2)}</span>
                      {rec.updatedMeanScore && (
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          Updated: {rec.updatedMeanScore.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Case Progress File & Timeline */}
        <div className="lg:col-span-8 space-y-4">
          {selectedRecord && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
              {/* Profile Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-3">
                <div>
                  <span className="text-xs font-mono text-[#737373]">Faculty Follow-up Tracker</span>
                  <h3 className="text-lg font-bold text-[#171717] mt-0.5">{selectedRecord.teacherName}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(['Not Started', 'In Progress', 'Improvement Observed', 'Further Support Needed', 'Completed'] as ImprovementStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedRecord, st)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        selectedRecord.progressStatus === st
                          ? 'bg-[#B91C1C] text-white font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Baseline vs Current Score Comparison Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[11px] text-[#737373] block">Initial Baseline Score:</span>
                  <div className="text-xl font-bold font-mono text-[#171717] mt-0.5 tabular-nums">
                    {selectedRecord.originalMeanScore.toFixed(2)} / 5.00
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-[#737373] block">Updated Post-Observation Mean:</span>
                  <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5 tabular-nums flex items-center gap-1">
                    {selectedRecord.updatedMeanScore ? `${selectedRecord.updatedMeanScore.toFixed(2)} / 5.00` : 'Pending'}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-[#737373] block">Progress Status:</span>
                  <span className={`inline-block mt-1 font-semibold px-2 py-0.5 rounded text-xs ${getStatusColor(selectedRecord.progressStatus)}`}>
                    {selectedRecord.progressStatus}
                  </span>
                </div>
              </div>

              {/* Original Finding & Objectives */}
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
                  <span className="font-semibold text-amber-900 block mb-0.5">Original Evaluation Finding:</span>
                  <p className="text-amber-950 leading-relaxed">{selectedRecord.originalFinding}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-[#E5E5E5] rounded-lg space-y-1.5">
                    <span className="font-semibold text-[#171717] block">Agreed Improvement Objectives:</span>
                    <ul className="space-y-1 text-slate-700">
                      {selectedRecord.agreedObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#B91C1C] font-bold">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-white border border-[#E5E5E5] rounded-lg space-y-1.5">
                    <span className="font-semibold text-[#171717] block">Intervention Activities Completed:</span>
                    <ul className="space-y-1 text-slate-700">
                      {selectedRecord.activitiesCompleted.map((act, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Classroom Follow-Up Observations Timeline */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                  <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Classroom Follow-Up Observations ({selectedRecord.followUpObservations.length})
                  </h4>
                  <button
                    onClick={() => setIsAddObservationOpen(true)}
                    className="text-xs text-[#B91C1C] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Log Observation Visit
                  </button>
                </div>

                <div className="space-y-2.5">
                  {selectedRecord.followUpObservations.map((obs, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#171717]">{obs.observer}</span>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-[#737373]">{obs.date}</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Rating: {obs.ratingGiven.toFixed(2)} / 5.00
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pt-1">{obs.observationSummary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Observation Modal */}
      {isAddObservationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-[#E5E5E5] w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-sm text-[#171717]">Log Classroom Observation Visit</h3>
              <button onClick={() => setIsAddObservationOpen(false)} className="p-1 text-[#737373]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddObservation} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#171717] mb-1">Assigned Observer / Supervisor</label>
                <input
                  type="text"
                  value={obsObserver}
                  onChange={(e) => setObsObserver(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Classroom Observation Rating (1.0 to 5.0)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1.0"
                  max="5.0"
                  value={obsRating}
                  onChange={(e) => setObsRating(parseFloat(e.target.value) || 4.0)}
                  className="w-32 px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#171717] mb-1">
                  Classroom Observation Findings & Notes
                </label>
                <textarea
                  rows={4}
                  value={obsSummary}
                  onChange={(e) => setObsSummary(e.target.value)}
                  placeholder="Detail instructional pacing, student engagement, rubric review with students, and classroom atmosphere observed..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#E5E5E5] rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddObservationOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg font-semibold"
                >
                  Save Observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
