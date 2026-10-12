import React, { useState } from 'react';
import { 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Users, 
  Database, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DfdProcessInfo {
  number: string;
  name: string;
  actor: string;
  input: string;
  output: string;
  dataStore: string;
  description: string;
  pageId: string;
}

const DFD_PROCESSES: DfdProcessInfo[] = [
  {
    number: '1.0',
    name: 'Creating Evaluation Questions',
    actor: 'Principal / Academic Coordinator',
    input: 'Curriculum Standards & Teaching Criteria',
    output: 'Draft Classroom Questionnaire (Versioned)',
    dataStore: 'D1: Evaluation Questions Store',
    description: 'Authorized personnel formulate, calibrate, and structure the 5-point Likert question instrument across 5 pedagogical dimensions.',
    pageId: 'process_1'
  },
  {
    number: '2.0',
    name: 'Evaluating Evaluation Questions',
    actor: 'Principal & Academic Coordinator',
    input: 'Draft Questionnaire Pool',
    output: 'Approved Questionnaire & Endorsement Memo',
    dataStore: 'D1: Evaluation Questions Store',
    description: 'Rigorous institutional review of evaluation criteria, ensuring balance, clarity, and DepEd/CHED quality assurance alignment.',
    pageId: 'process_2'
  },
  {
    number: '3.0',
    name: 'Announcing Evaluation Schedule',
    actor: 'Guidance Counselor / Guidance Office',
    input: 'Academic Calendar & Approved Questionnaire',
    output: 'Official Evaluation Memorandum',
    dataStore: 'D2: Evaluation Schedules & Memos',
    description: 'Guidance Center establishes evaluation cycles, opening/closing dates, and dispatches formal institutional directives to students and faculty.',
    pageId: 'process_3'
  },
  {
    number: '4.0',
    name: 'Generating Google Forms Evaluation Link',
    actor: 'Guidance Counselor',
    input: 'Approved Questionnaire & Faculty Course Allocations',
    output: 'Validated Google Forms URL per Subject/Section',
    dataStore: 'D3: Evaluation Links Store',
    description: 'Configures and validates unique evaluation form links for each teacher section, preparing them for faculty group chat distribution.',
    pageId: 'process_4'
  },
  {
    number: '5.0',
    name: 'Posting Evaluation Link in Class Group Chat',
    actor: 'Teacher / Faculty',
    input: 'Evaluation Announcement & Verified Form Link',
    output: 'Broadcasted GC Announcement & Student Link Access',
    dataStore: 'D3: Evaluation Links Store',
    description: 'Teachers copy pre-formatted, privacy-reassuring notices into Messenger/Teams class group chats so enrolled students can participate.',
    pageId: 'process_5'
  },
  {
    number: '6.0',
    name: 'Answering Evaluation Form',
    actor: 'Student',
    input: 'Classroom Experience & Student Appraisal',
    output: 'Anonymous 5-Point Likert Evaluation Submission',
    dataStore: 'D4: Raw Evaluation Responses',
    description: 'Students complete the 5-point Likert questionnaire under strictly enforced anonymity. Personal identities are completely stripped at submission.',
    pageId: 'process_6'
  },
  {
    number: '7.0',
    name: 'Generating Teaching Performance Overall Rating',
    actor: 'Guidance Counselor',
    input: 'Aggregated Student Submissions',
    output: 'Overall Mean Score, Category Breakdown, Analytics',
    dataStore: 'D5: Performance Ratings Store',
    description: 'Guidance Center computes mean scores, identifies strengths and growth areas, and prepares print-friendly evaluation dossiers.',
    pageId: 'process_7'
  },
  {
    number: '8.0',
    name: 'Discussing Evaluation Results',
    actor: 'Principal & Academic Coordinator (with Guidance)',
    input: 'Faculty Performance Dossier & Rating Breakdown',
    output: 'Conference Minutes, Recommendations, Feedback',
    dataStore: 'D6: Discussion Minutes & Reports',
    description: 'Bilateral post-evaluation conference with the faculty member to discuss strengths, constructive suggestions, and mutual objectives.',
    pageId: 'process_8'
  },
  {
    number: '9.0',
    name: 'Creating Intervention Program',
    actor: 'Guidance Counselor & Academic Coordinator',
    input: 'Discussion Recommendations & Identified Skills Gap',
    output: 'Intervention Plan (Workshop/Mentoring/Wellness)',
    dataStore: 'D7: Intervention Programs Store',
    description: 'Formulates supportive, collegiate growth programs—such as pedagogical seminars or peer mentoring—to address specific instructional needs.',
    pageId: 'process_9'
  },
  {
    number: '10.0',
    name: 'Checking Improvement',
    actor: 'Academic Coordinator & Principal',
    input: 'Intervention Milestones & Classroom Observations',
    output: 'Updated Observation Scores & Improvement Report',
    dataStore: 'D8: Improvement Monitoring Records',
    description: 'Evaluates teaching enhancement through supervisory classroom visits and updated performance evaluations over subsequent cycles.',
    pageId: 'process_10'
  },
  {
    number: '11.0',
    name: 'Conducting Seminar / Employment Intervention',
    actor: 'Principal / HR Staff',
    input: 'Skills Gap Trends OR Documented Severe Non-Performance',
    output: 'Training Completion Record OR Due Process Docket',
    dataStore: 'D9: Seminars / HR Personnel Files',
    description: 'Dual pathway: Faculty-wide developmental seminars under the Principal, OR strictly manual statutory HR due process review under HR Staff.',
    pageId: 'process_11_seminars'
  }
];

interface Props {
  onNavigate: (pageId: string) => void;
}

export const DfdWorkflowExplorer: React.FC<Props> = ({ onNavigate }) => {
  const [activeProcessNum, setActiveProcessNum] = useState<string>('1.0');

  const selectedProc = DFD_PROCESSES.find(p => p.number === activeProcessNum) || DFD_PROCESSES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-[#737373] mb-1">
          <span className="font-semibold text-[#B91C1C]">System Architecture</span>
          <span>·</span>
          <span>Davao Central College Specification</span>
          <span>·</span>
          <span className="font-mono">DFD Reference Mapping</span>
        </div>
        <h2 className="text-xl font-bold text-[#171717]">TeachReach Data Flow Diagram (DFD) Explorer</h2>
        <p className="text-xs text-[#737373] mt-1 max-w-3xl leading-relaxed">
          TeachReach directly mirrors the official Davao Central College 11-Process Data Flow Diagram.
          Trace the continuous lifecycle from initial question formulation (Process 1.0) through student evaluation,
          guidance rating analytics, developmental conferences, and HR due process verification (Process 11.0).
        </p>
      </div>

      {/* Grid: Process Stepper & Detailed Flow Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 11 Processes List */}
        <div className="lg:col-span-5 space-y-2">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-3">
              11 DFD Processes
            </h3>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {DFD_PROCESSES.map((proc) => {
                const isSelected = proc.number === activeProcessNum;

                return (
                  <button
                    key={proc.number}
                    onClick={() => setActiveProcessNum(proc.number)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#B91C1C] bg-[#FEE2E2]/30 ring-1 ring-[#B91C1C] font-semibold text-[#B91C1C]'
                        : 'border-[#E5E5E5] hover:bg-slate-50 text-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-xs font-bold shrink-0 w-8">
                        P{proc.number}
                      </span>
                      <span className="truncate">{proc.name}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#B91C1C]' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Flow Inspection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
              <div>
                <span className="font-mono text-xs font-bold text-[#B91C1C]">
                  DFD PROCESS {selectedProc.number}
                </span>
                <h3 className="text-lg font-bold text-[#171717] mt-0.5">
                  {selectedProc.name}
                </h3>
              </div>

              <button
                onClick={() => onNavigate(selectedProc.pageId)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <span>Open Module</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedProc.description}
            </p>

            {/* Input / Process / Output Pipeline Box */}
            <div className="p-4 bg-slate-50 border border-[#E5E5E5] rounded-xl space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider block">
                  Authorized Actor / Role:
                </span>
                <span className="font-bold text-[#171717] mt-0.5 block">
                  {selectedProc.actor}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E5E5E5]/60">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                    Data Input Flow:
                  </span>
                  <p className="text-slate-800 mt-0.5">{selectedProc.input}</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
                    Data Output Flow:
                  </span>
                  <p className="text-slate-800 mt-0.5">{selectedProc.output}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E5E5]/60">
                <span className="text-[11px] font-semibold text-[#B91C1C] uppercase tracking-wider block">
                  Associated Data Store:
                </span>
                <span className="font-mono text-xs text-[#171717] font-semibold mt-0.5 block">
                  {selectedProc.dataStore}
                </span>
              </div>
            </div>

            {/* DFD Actors Summary Table */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] space-y-2 text-xs">
              <span className="font-semibold text-[#171717] block">
                6 Authorized Roles Defined in the DCC DFD:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#171717] block">1. Principal</span>
                  <span className="text-[#737373]">Approval, Ratings, Conf.</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#171717] block">2. Guidance Center</span>
                  <span className="text-[#737373]">Schedules, Links, Mean Calc</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#171717] block">3. Academic Coord.</span>
                  <span className="text-[#737373]">Review, Conf., Monitor</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#171717] block">4. Teacher</span>
                  <span className="text-[#737373]">GC Distribution, Results</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#171717] block">5. Student</span>
                  <span className="text-[#737373]">Anonymous 5-pt Likert</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#171717] block">6. HR Staff</span>
                  <span className="text-[#737373]">Statutory Due Process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
