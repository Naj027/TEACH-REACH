export type UserRole = 
  | 'principal' 
  | 'guidance' 
  | 'coordinator' 
  | 'teacher' 
  | 'student' 
  | 'hr';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  department: string;
  avatarInitials: string;
}

// PROCESS 1 & 2: Evaluation Questions & Review
export type QuestionCategory = 
  | 'Instructional Competence'
  | 'Classroom Management'
  | 'Assessment & Feedback'
  | 'Student Engagement'
  | 'Professionalism & Ethics';

export type QuestionType = 'likert_5' | 'open_feedback';

export interface EvaluationQuestion {
  id: string;
  number: number;
  text: string;
  category: QuestionCategory;
  type: QuestionType;
  isActive: boolean;
  version: string;
  lastUpdated: string;
}

export type ReviewStatus = 'Draft' | 'Pending Review' | 'Approved' | 'Returned for Revision';

export interface QuestionnaireReview {
  id: string;
  evaluationPeriod: string;
  academicYear: string;
  semester: string;
  status: ReviewStatus;
  reviewedBy: string;
  reviewedDate?: string;
  recommendations: string;
  remarks: string;
  version: string;
  totalQuestions: number;
}

// PROCESS 3: Evaluation Schedule & Announcements
export type ScheduleStatus = 'Draft' | 'Scheduled' | 'Published' | 'Closed';

export interface EvaluationAnnouncement {
  id: string;
  memoNumber: string;
  title: string;
  academicYear: string;
  semester: string;
  targetAudience: string;
  gradeLevelOrDepartment: string;
  startDate: string;
  endDate: string;
  status: ScheduleStatus;
  dateCreated: string;
  publishedDate?: string;
  message: string;
  signatory: string;
  signatoryTitle: string;
}

// PROCESS 4: Google Forms Evaluation Links
export type LinkConfigStatus = 'Link Ready' | 'Not Configured' | 'Published';

export interface GoogleFormsLink {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectCode: string;
  subjectName: string;
  section: string;
  evaluationPeriod: string;
  googleFormsUrl: string;
  isValidated: boolean;
  status: LinkConfigStatus;
  dateGenerated: string;
  intendedAudience: string;
  responseCount: number;
}

// PROCESS 5: Evaluation Distribution (Teacher Class GC)
export type DistributionStatus = 'Shared' | 'Pending Distribution';

export interface EvaluationDistribution {
  id: string;
  teacherId: string;
  announcementId: string;
  announcementTitle: string;
  subjectCode: string;
  section: string;
  evaluationLink: string;
  status: DistributionStatus;
  sharedDate?: string;
  platformShared: string;
  reminderSent: boolean;
  preparedAnnouncementText: string;
}

// PROCESS 6: Student Evaluation Form & Submissions
export interface StudentEvaluationItem {
  questionId: string;
  rating: number; // 1 to 5
}

export interface StudentEvaluationSubmission {
  id: string;
  teacherId: string;
  subjectCode: string;
  academicYear: string;
  semester: string;
  timestamp: string;
  ratings: Record<string, number>; // questionId -> rating 1..5
  writtenFeedback?: string;
}

// PROCESS 7: Performance Ratings & Analytics
export interface CategoryScore {
  category: QuestionCategory;
  mean: number;
  benchmark: number;
  ratingCount: number;
}

export interface TeacherEvaluationResult {
  teacherId: string;
  teacherName: string;
  department: string;
  academicYear: string;
  semester: string;
  totalResponses: number;
  overallMean: number;
  qualitativeInterpretation: 'Outstanding' | 'Very Satisfactory' | 'Satisfactory' | 'Fair' | 'Needs Improvement';
  isReleasedToTeacher: boolean;
  releasedDate?: string;
  previousPeriodMean?: number;
  categoryScores: CategoryScore[];
  ratingDistribution: {
    stronglyAgree: number; // 5
    agree: number; // 4
    neutral: number; // 3
    disagree: number; // 2
    stronglyDisagree: number; // 1
  };
  strengths: string[];
  areasForImprovement: string[];
  anonymizedComments: {
    id: string;
    text: string;
    categorySentiment: 'Positive' | 'Constructive' | 'Neutral';
    date: string;
  }[];
}

// PROCESS 8: Discussion & Follow-up
export type MeetingStatus = 'Scheduled' | 'Conducted' | 'Pending Follow-up';

export interface EvaluationDiscussion {
  id: string;
  teacherId: string;
  teacherName: string;
  discussionDate: string;
  participants: string[];
  status: MeetingStatus;
  meetingNotes: string;
  recommendations: string;
  remarks: string;
  feedbackToTeacher: string;
  improvementReportSummary: string;
  followUpStatus: 'Open' | 'Resolved' | 'Intervention Required';
  isConfidential: boolean;
  academicCoordinatorSignoff: boolean;
  principalSignoff: boolean;
}

// PROCESS 9: Intervention Programs
export type InterventionType = 
  | 'Pedagogical Workshop'
  | 'Classroom Mentoring'
  | 'Guidance Office Referral'
  | 'Curriculum Alignment'
  | 'Instructional Materials Development';

export type ProgramStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface InterventionProgram {
  id: string;
  teacherId: string;
  teacherName: string;
  identifiedArea: string;
  type: InterventionType;
  objectives: string[];
  recommendedActivities: string[];
  seminarOrTrainingTitle?: string;
  guidanceReferralNotes?: string;
  assignedPersonnel: string;
  startDate: string;
  targetCompletionDate: string;
  status: ProgramStatus;
  expectedOutcomes: string;
  followUpSchedule: string;
}

// PROCESS 10: Improvement Monitoring
export type ImprovementStatus = 
  | 'Not Started'
  | 'In Progress'
  | 'Improvement Observed'
  | 'Further Support Needed'
  | 'Completed';

export interface ImprovementMonitoring {
  id: string;
  teacherId: string;
  teacherName: string;
  originalFinding: string;
  originalMeanScore: number;
  agreedObjectives: string[];
  activitiesCompleted: string[];
  followUpObservations: {
    date: string;
    observer: string;
    observationSummary: string;
    ratingGiven: number;
  }[];
  updatedMeanScore?: number;
  improvementReport: string;
  progressStatus: ImprovementStatus;
  remainingAreas: string[];
  recommendationsForFurtherSupport: string;
  lastUpdated: string;
}

// PROCESS 11: Seminars & Training (Pedagogical) + HR Employment Due Process
export interface SeminarTraining {
  id: string;
  title: string;
  skillsGapAddressed: string;
  objectives: string[];
  description: string;
  schedule: string;
  venue: string;
  facilitator: string;
  targetParticipants: string;
  maxAttendees: number;
  enrolledTeachers: string[];
  attendanceStatus: 'Planned' | 'In Progress' | 'Completed';
  postTrainingFollowUp: string;
  outcomeNotes: string;
}

export type DueProcessStage = 
  | 'Authorized Referral Received'
  | 'Notice of Explanation Issued'
  | 'Administrative Conference Scheduled'
  | 'Under Human Evaluation'
  | 'Executive Decision Documented';

export interface EmploymentIntervention {
  id: string;
  caseNumber: string;
  teacherId: string;
  teacherName: string;
  department: string;
  dateReferred: string;
  referralSource: 'Principal & Academic Coordinator Referral' | 'Guidance Office Endorsement';
  documentedConcerns: string[];
  stage: DueProcessStage;
  facultyManualArticles: string[];
  humanReviewNotes: string;
  assignedHRReviewer: string;
  dueProcessNoticeDate?: string;
  conferenceDate?: string;
  isActionAutomated: false; // Mandatory hardcoded constraint
  humanReviewerSignoff: boolean;
}
