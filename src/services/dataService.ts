import {
  UserProfile,
  EvaluationQuestion,
  QuestionnaireReview,
  EvaluationAnnouncement,
  GoogleFormsLink,
  EvaluationDistribution,
  TeacherEvaluationResult,
  EvaluationDiscussion,
  InterventionProgram,
  ImprovementMonitoring,
  SeminarTraining,
  EmploymentIntervention,
  UserRole
} from '../types';

export const SYSTEM_ROLES: Record<UserRole, UserProfile> = {
  principal: {
    id: 'usr-principal-01',
    name: 'Dr. Maria Elena C. Santos, Ed.D.',
    email: 'm.santos@dcc.edu.ph',
    role: 'principal',
    title: 'School Principal & Academic Director',
    department: 'Office of the Principal',
    avatarInitials: 'MS'
  },
  guidance: {
    id: 'usr-guidance-01',
    name: 'Noel R. De Guzman, RGC',
    email: 'n.deguzman@dcc.edu.ph',
    role: 'guidance',
    title: 'Head, Guidance & Evaluation Center',
    department: 'Guidance and Testing Services',
    avatarInitials: 'ND'
  },
  coordinator: {
    id: 'usr-coordinator-01',
    name: 'Prof. Carmencita V. Alcantara, MAT',
    email: 'c.alcantara@dcc.edu.ph',
    role: 'coordinator',
    title: 'Academic Program Coordinator',
    department: 'College Academic Affairs',
    avatarInitials: 'CA'
  },
  teacher: {
    id: 'usr-teacher-01',
    name: 'Engr. Ronald P. Mendoza, MSIT',
    email: 'r.mendoza@dcc.edu.ph',
    role: 'teacher',
    title: 'Assistant Professor II',
    department: 'College of Information Technology',
    avatarInitials: 'RM'
  },
  student: {
    id: 'usr-student-01',
    name: 'Kristine Joy Dela Cruz',
    email: 'k.delacruz.2023@dcc.edu.ph',
    role: 'student',
    title: 'Student (BSIT 3-A)',
    department: 'College of Information Technology',
    avatarInitials: 'KD'
  },
  hr: {
    id: 'usr-hr-01',
    name: 'Ms. Victoria B. Ramos, CHRA',
    email: 'v.ramos@dcc.edu.ph',
    role: 'hr',
    title: 'Faculty Affairs & HR Officer',
    department: 'Human Resource Management Office',
    avatarInitials: 'VR'
  }
};

const INITIAL_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 'q-01',
    number: 1,
    text: 'Demonstrates deep mastery of the subject matter and explains complex concepts clearly.',
    category: 'Instructional Competence',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-02',
    number: 2,
    text: 'Relates lesson topics to real-world applications and modern industry practices in Davao and beyond.',
    category: 'Instructional Competence',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-03',
    number: 3,
    text: 'Organizes classroom instruction logically, following the syllabus approved by DCC Academic Affairs.',
    category: 'Instructional Competence',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-04',
    number: 4,
    text: 'Maintains an orderly, respectful, and engaging learning atmosphere during all class sessions.',
    category: 'Classroom Management',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-05',
    number: 5,
    text: 'Starts and dismisses classes punctually according to Davao Central College schedule guidelines.',
    category: 'Classroom Management',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-06',
    number: 6,
    text: 'Provides constructive and timely feedback on student examinations, projects, and assignments.',
    category: 'Assessment & Feedback',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-07',
    number: 7,
    text: 'Employs fair, transparent grading rubrics aligned with institutional assessment standards.',
    category: 'Assessment & Feedback',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-08',
    number: 8,
    text: 'Encourages critical thinking, classroom discourse, and active student participation.',
    category: 'Student Engagement',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-09',
    number: 9,
    text: 'Is accessible for academic consultation and assists students who require remedial guidance.',
    category: 'Student Engagement',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  },
  {
    id: 'q-10',
    number: 10,
    text: 'Manifests professional ethics, courtesy, and respect toward students irrespective of background.',
    category: 'Professionalism & Ethics',
    type: 'likert_5',
    isActive: true,
    version: 'AY2025-2026.v2',
    lastUpdated: '2026-03-15'
  }
];

const INITIAL_REVIEWS: QuestionnaireReview[] = [
  {
    id: 'rev-2026-01',
    evaluationPeriod: '2nd Semester, AY 2025-2026',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    status: 'Approved',
    reviewedBy: 'Dr. Maria Elena C. Santos (Principal) & Prof. Carmencita Alcantara (Academic Coordinator)',
    reviewedDate: '2026-03-20',
    recommendations: 'Recommended for institutional deployment across all collegiate programs with standard 5-point Likert measurement scale.',
    remarks: 'The 10-item instrument adheres to CHED and DepEd quality assurance criteria. All five dimensions are balanced.',
    version: 'AY2025-2026.v2',
    totalQuestions: 10
  },
  {
    id: 'rev-2026-02',
    evaluationPeriod: 'Summer Term, AY 2025-2026 (Draft Formulation)',
    academicYear: '2025-2026',
    semester: 'Summer Term',
    status: 'Pending Review',
    reviewedBy: 'Academic Coordinator Review Queue',
    recommendations: 'Pending review of item #4 regarding laboratory class pacing.',
    remarks: 'Submitted by Guidance Center for Academic Coordinator examination prior to Principal endorsement.',
    version: 'AY2025-2026.v3-Draft',
    totalQuestions: 12
  }
];

const INITIAL_ANNOUNCEMENTS: EvaluationAnnouncement[] = [
  {
    id: 'ann-2026-01',
    memoNumber: 'DCC-VPAA-MEMO-2026-042',
    title: '2nd Semester Student Evaluation of Faculty Teaching Performance (AY 2025-2026)',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    targetAudience: 'All Enrolled College & Senior High School Students',
    gradeLevelOrDepartment: 'Collegiate & SHS Departments',
    startDate: '2026-04-01',
    endDate: '2026-04-20',
    status: 'Published',
    dateCreated: '2026-03-22',
    publishedDate: '2026-03-25',
    message: 'Pursuant to Davao Central College Quality Assurance Mandates, all students are requested to complete the anonymous Teacher Evaluation for their enrolled courses. Your honest feedback fosters instructional excellence and professional development across all DCC faculties.',
    signatory: 'Noel R. De Guzman, RGC',
    signatoryTitle: 'Head, Guidance and Evaluation Center'
  },
  {
    id: 'ann-2026-02',
    memoNumber: 'DCC-VPAA-MEMO-2026-043',
    title: 'Midterm Modular Evaluation for Selected Laboratory Courses',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    targetAudience: 'Engineering and IT Laboratory Sections',
    gradeLevelOrDepartment: 'College of Information Technology',
    startDate: '2026-04-10',
    endDate: '2026-04-25',
    status: 'Scheduled',
    dateCreated: '2026-03-28',
    message: 'Targeted mid-period evaluation focusing on laboratory equipment utilization, programming workshop facilitation, and project guidance.',
    signatory: 'Prof. Carmencita V. Alcantara, MAT',
    signatoryTitle: 'Academic Program Coordinator'
  }
];

const INITIAL_GOOGLE_FORMS_LINKS: GoogleFormsLink[] = [
  {
    id: 'gfl-01',
    teacherId: 'usr-teacher-01',
    teacherName: 'Engr. Ronald P. Mendoza',
    subjectCode: 'IT 312',
    subjectName: 'Web Systems and Technologies II',
    section: 'BSIT 3-A',
    evaluationPeriod: '2nd Semester, AY 2025-2026',
    googleFormsUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_IT312_Mendoza/viewform',
    isValidated: true,
    status: 'Link Ready',
    dateGenerated: '2026-03-26',
    intendedAudience: 'BSIT 3-A Students (38 Enrolled)',
    responseCount: 34
  },
  {
    id: 'gfl-02',
    teacherId: 'usr-teacher-01',
    teacherName: 'Engr. Ronald P. Mendoza',
    subjectCode: 'CS 221',
    subjectName: 'Data Structures and Algorithms',
    section: 'BSCS 2-B',
    evaluationPeriod: '2nd Semester, AY 2025-2026',
    googleFormsUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_CS221_Mendoza/viewform',
    isValidated: true,
    status: 'Published',
    dateGenerated: '2026-03-26',
    intendedAudience: 'BSCS 2-B Students (32 Enrolled)',
    responseCount: 29
  },
  {
    id: 'gfl-03',
    teacherId: 'usr-teacher-02',
    teacherName: 'Prof. Aniceto G. Morales',
    subjectCode: 'GENED 104',
    subjectName: 'Mathematics in the Modern World',
    section: 'BSED 1-A',
    evaluationPeriod: '2nd Semester, AY 2025-2026',
    googleFormsUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_GENED104_Morales/viewform',
    isValidated: true,
    status: 'Link Ready',
    dateGenerated: '2026-03-27',
    intendedAudience: 'BSED 1-A Students (42 Enrolled)',
    responseCount: 38
  },
  {
    id: 'gfl-04',
    teacherId: 'usr-teacher-03',
    teacherName: 'Dr. Teresa L. Delos Reyes',
    subjectCode: 'EDUC 301',
    subjectName: 'Curriculum Development and Evaluation',
    section: 'BEED 3-A',
    evaluationPeriod: '2nd Semester, AY 2025-2026',
    googleFormsUrl: '',
    isValidated: false,
    status: 'Not Configured',
    dateGenerated: '2026-03-28',
    intendedAudience: 'BEED 3-A Students (35 Enrolled)',
    responseCount: 0
  }
];

const INITIAL_DISTRIBUTIONS: EvaluationDistribution[] = [
  {
    id: 'dist-01',
    teacherId: 'usr-teacher-01',
    announcementId: 'ann-2026-01',
    announcementTitle: '2nd Semester Student Evaluation of Faculty Teaching Performance',
    subjectCode: 'IT 312 (Web Systems & Tech II)',
    section: 'BSIT 3-A Class Group Chat',
    evaluationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_IT312_Mendoza/viewform',
    status: 'Shared',
    sharedDate: '2026-04-02 08:30',
    platformShared: 'Facebook Messenger Class GC & Google Classroom Stream',
    reminderSent: true,
    preparedAnnouncementText: `Good day, BSIT 3-A! Please be informed that the DCC Student Evaluation of Faculty Teaching Performance for 2nd Semester AY 2025-2026 is now OPEN. Kindly complete the evaluation form for IT 312 through this link: https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_IT312_Mendoza/viewform. Note: Submissions are strictly confidential and anonymous under Guidance Office management.`
  },
  {
    id: 'dist-02',
    teacherId: 'usr-teacher-01',
    announcementId: 'ann-2026-01',
    announcementTitle: '2nd Semester Student Evaluation of Faculty Teaching Performance',
    subjectCode: 'CS 221 (Data Structures)',
    section: 'BSCS 2-B Official Section GC',
    evaluationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_CS221_Mendoza/viewform',
    status: 'Pending Distribution',
    platformShared: 'Messenger Class Group Chat',
    reminderSent: false,
    preparedAnnouncementText: `Good day, BSCS 2-B! The official DCC Faculty Teaching Evaluation for CS 221 is currently active. Please take 5 minutes to submit your honest appraisal at: https://docs.google.com/forms/d/e/1FAIpQLScDCC_Evaluation_CS221_Mendoza/viewform. Your input helps us continuously improve our instruction.`
  }
];

const INITIAL_TEACHER_RESULTS: TeacherEvaluationResult[] = [
  {
    teacherId: 'usr-teacher-01',
    teacherName: 'Engr. Ronald P. Mendoza',
    department: 'College of Information Technology',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    totalResponses: 63,
    overallMean: 4.58,
    qualitativeInterpretation: 'Very Satisfactory',
    isReleasedToTeacher: true,
    releasedDate: '2026-04-22',
    previousPeriodMean: 4.38,
    categoryScores: [
      { category: 'Instructional Competence', mean: 4.65, benchmark: 4.0, ratingCount: 63 },
      { category: 'Classroom Management', mean: 4.52, benchmark: 4.0, ratingCount: 63 },
      { category: 'Assessment & Feedback', mean: 4.41, benchmark: 4.0, ratingCount: 63 },
      { category: 'Student Engagement', mean: 4.68, benchmark: 4.0, ratingCount: 63 },
      { category: 'Professionalism & Ethics', mean: 4.64, benchmark: 4.0, ratingCount: 63 }
    ],
    ratingDistribution: {
      stronglyAgree: 41,
      agree: 18,
      neutral: 4,
      disagree: 0,
      stronglyDisagree: 0
    },
    strengths: [
      'Exceptional practical demonstrations of modern web frameworks and reactive programming.',
      'Always encourages students to ask questions and explore industry problems.',
      'Maintains an encouraging, highly professional rapport with students.'
    ],
    areasForImprovement: [
      'Graded programming assignments can be returned more promptly with line-by-line code review.',
      'Provide supplementary video recordings for students with limited home internet connectivity.'
    ],
    anonymizedComments: [
      {
        id: 'cm-01',
        text: 'Sir Mendoza makes web architecture enjoyable! His real-world IT industry experiences make the lectures very engaging.',
        categorySentiment: 'Positive',
        date: '2026-04-15'
      },
      {
        id: 'cm-02',
        text: 'Very approachable during lab hours. He helped our project group debug complex database state issues without making us feel intimidated.',
        categorySentiment: 'Positive',
        date: '2026-04-16'
      },
      {
        id: 'cm-03',
        text: 'Would appreciate faster turnaround on milestone rubrics before major project submissions.',
        categorySentiment: 'Constructive',
        date: '2026-04-18'
      }
    ]
  },
  {
    teacherId: 'usr-teacher-02',
    teacherName: 'Prof. Aniceto G. Morales',
    department: 'College of Teacher Education',
    academicYear: '2025-2026',
    semester: '2nd Semester',
    totalResponses: 78,
    overallMean: 3.42,
    qualitativeInterpretation: 'Satisfactory',
    isReleasedToTeacher: false, // Under discussion review
    previousPeriodMean: 3.51,
    categoryScores: [
      { category: 'Instructional Competence', mean: 3.85, benchmark: 4.0, ratingCount: 78 },
      { category: 'Classroom Management', mean: 3.20, benchmark: 4.0, ratingCount: 78 },
      { category: 'Assessment & Feedback', mean: 3.10, benchmark: 4.0, ratingCount: 78 },
      { category: 'Student Engagement', mean: 3.35, benchmark: 4.0, ratingCount: 78 },
      { category: 'Professionalism & Ethics', mean: 3.60, benchmark: 4.0, ratingCount: 78 }
    ],
    ratingDistribution: {
      stronglyAgree: 12,
      agree: 28,
      neutral: 24,
      disagree: 10,
      stronglyDisagree: 4
    },
    strengths: [
      'Strong academic mastery of pure mathematical theory.',
      'Consistent attendance and punctual arrival for scheduled classes.'
    ],
    areasForImprovement: [
      'Assessment results and exam answer sheets should be discussed with students.',
      'Adopt active learning strategies to prevent passive note-taking in large lecture groups.'
    ],
    anonymizedComments: [
      {
        id: 'cm-04',
        text: 'Mastery of math is evident, but the pace is often too swift for non-STEM students.',
        categorySentiment: 'Constructive',
        date: '2026-04-14'
      },
      {
        id: 'cm-05',
        text: 'We rarely get to see which problems we got wrong in quizzes until midterm grades are posted.',
        categorySentiment: 'Constructive',
        date: '2026-04-17'
      }
    ]
  }
];

const INITIAL_DISCUSSIONS: EvaluationDiscussion[] = [
  {
    id: 'disc-01',
    teacherId: 'usr-teacher-01',
    teacherName: 'Engr. Ronald P. Mendoza',
    discussionDate: '2026-04-24',
    participants: [
      'Dr. Maria Elena C. Santos (Principal)',
      'Prof. Carmencita V. Alcantara (Academic Coordinator)',
      'Engr. Ronald P. Mendoza (Faculty)'
    ],
    status: 'Conducted',
    meetingNotes: 'Post-evaluation conference conducted in the Academic Conference Room. Commended for outstanding student engagement scores (4.68/5.00). Discussed feedback turnaround times.',
    recommendations: 'Adopt DCC LMS automated rubric grading workflow to streamline assignment return times within 7 working days.',
    remarks: 'Faculty member demonstrated high receptiveness and agreed with the constructive observations.',
    feedbackToTeacher: 'Maintain high pedagogical enthusiasm. Explore peer mentoring role for junior instructors in the College of IT.',
    improvementReportSummary: 'Teacher exceeded institutional benchmarks across 5 categories. No remedial intervention required; nominated for Faculty Research & Innovation Grant.',
    followUpStatus: 'Resolved',
    isConfidential: true,
    academicCoordinatorSignoff: true,
    principalSignoff: true
  },
  {
    id: 'disc-02',
    teacherId: 'usr-teacher-02',
    teacherName: 'Prof. Aniceto G. Morales',
    discussionDate: '2026-04-28',
    participants: [
      'Dr. Maria Elena C. Santos (Principal)',
      'Prof. Carmencita V. Alcantara (Academic Coordinator)',
      'Noel R. De Guzman, RGC (Guidance Center Head)'
    ],
    status: 'Scheduled',
    meetingNotes: 'Pre-conference alignment between Academic Affairs and Guidance Office regarding 2nd Semester evaluation findings in Classroom Management and Assessment.',
    recommendations: 'Formulate supportive pedagogical enhancement intervention under the Guidance Office & Faculty Development Program.',
    remarks: 'Focus will be on constructive instructional assistance, peer co-teaching, and student assessment rubrics.',
    feedbackToTeacher: 'Draft feedback prepared emphasizing supportive development.',
    improvementReportSummary: 'Formal intervention plan to be created following the bilateral consultation.',
    followUpStatus: 'Intervention Required',
    isConfidential: true,
    academicCoordinatorSignoff: true,
    principalSignoff: false
  }
];

const INITIAL_INTERVENTIONS: InterventionProgram[] = [
  {
    id: 'int-01',
    teacherId: 'usr-teacher-02',
    teacherName: 'Prof. Aniceto G. Morales',
    identifiedArea: 'Assessment Feedback Transparency & Student Engagement in Lecture Classes',
    type: 'Pedagogical Workshop',
    objectives: [
      'Master formative assessment techniques and rubric formulation.',
      'Implement prompt grade return protocols within 7 calendar days of submission.',
      'Incorporate interactive classroom questioning strategies.'
    ],
    recommendedActivities: [
      'Participation in DCC Faculty Seminar on Formative Assessment (Module B).',
      'One-on-one instructional mentoring with Dean of Education.',
      'Bi-weekly syllabus pacing check-in with Academic Coordinator.'
    ],
    seminarOrTrainingTitle: 'DCC Seminar: Contemporary Classroom Assessment & Formative Rubrics',
    guidanceReferralNotes: 'Endorsed by Guidance Center for supportive professional consultation and teacher wellness check-in.',
    assignedPersonnel: 'Prof. Carmencita V. Alcantara (Academic Coordinator) & Guidance Center',
    startDate: '2026-05-02',
    targetCompletionDate: '2026-06-15',
    status: 'In Progress',
    expectedOutcomes: 'Improved student satisfaction on assessment clarity, visible rubric usage, and increased classroom engagement.',
    followUpSchedule: 'May 16, May 30, and June 12, 2026'
  },
  {
    id: 'int-02',
    teacherId: 'usr-teacher-04',
    teacherName: 'Instructor Leo M. Bautista',
    identifiedArea: 'Classroom Management in Large Enrollment Multi-Media Rooms',
    type: 'Classroom Mentoring',
    objectives: [
      'Establish consistent classroom norms and student attendance protocols.',
      'Utilize DCC audio-visual facilities smoothly to prevent instructional downtime.'
    ],
    recommendedActivities: [
      'Peer observation sessions with Senior Faculty Mentor.',
      'Classroom management workshop simulation.'
    ],
    seminarOrTrainingTitle: 'Advanced Classroom Facilitation & Tech Integration',
    assignedPersonnel: 'Engr. Ronald P. Mendoza (Faculty Mentor)',
    startDate: '2026-03-01',
    targetCompletionDate: '2026-04-15',
    status: 'Completed',
    expectedOutcomes: 'Significant reduction in classroom disturbances and improved pacing.',
    followUpSchedule: 'Completed final observation report on April 14, 2026.'
  }
];

const INITIAL_IMPROVEMENTS: ImprovementMonitoring[] = [
  {
    id: 'imp-01',
    teacherId: 'usr-teacher-02',
    teacherName: 'Prof. Aniceto G. Morales',
    originalFinding: 'Assessment & Feedback rated at 3.10/5.00 due to delayed exam feedback and limited rubric orientation.',
    originalMeanScore: 3.10,
    agreedObjectives: [
      'Distribute rubric criteria alongside every quiz assignment.',
      'Return graded papers within one week of examination date.'
    ],
    activitiesCompleted: [
      'Attended Day 1 of Formative Assessment Workshop.',
      'Submitted draft assessment rubrics for Math in the Modern World to Academic Coordinator.'
    ],
    followUpObservations: [
      {
        date: '2026-05-18',
        observer: 'Prof. Carmencita V. Alcantara',
        observationSummary: 'Observed discussion of Quiz #3. Teacher provided written answer keys and spent 15 minutes reviewing common errors.',
        ratingGiven: 3.90
      }
    ],
    updatedMeanScore: 3.82,
    improvementReport: 'Observed significant instructional growth in prompt test return and rubric presentation. Mean rating elevated by +0.72 points.',
    progressStatus: 'Improvement Observed',
    remainingAreas: [
      'Continue integrating active student polling tools during virtual/hybrid lectures.'
    ],
    recommendationsForFurtherSupport: 'Maintain ongoing co-teaching observation until end of semester; progress is very promising.',
    lastUpdated: '2026-05-20'
  },
  {
    id: 'imp-02',
    teacherId: 'usr-teacher-04',
    teacherName: 'Instructor Leo M. Bautista',
    originalFinding: 'Classroom management delays and inconsistent technology setup in AVR rooms.',
    originalMeanScore: 3.25,
    agreedObjectives: [
      'Complete AV equipment orientation and establish firm start-of-class routines.'
    ],
    activitiesCompleted: [
      'Completed peer observation with Engr. Mendoza.',
      'Implemented standardized class opener routine.'
    ],
    followUpObservations: [
      {
        date: '2026-04-10',
        observer: 'Engr. Ronald P. Mendoza',
        observationSummary: 'Class started promptly at 08:00 AM. Projection system configured smoothly. Students attentive.',
        ratingGiven: 4.40
      }
    ],
    updatedMeanScore: 4.35,
    improvementReport: 'Successfully eliminated technology bottlenecks in AVR classrooms. Punctuality and classroom management exceed targets.',
    progressStatus: 'Completed',
    remainingAreas: [],
    recommendationsForFurtherSupport: 'Successful resolution. No further remedial intervention required.',
    lastUpdated: '2026-04-15'
  }
];

const INITIAL_SEMINARS: SeminarTraining[] = [
  {
    id: 'sem-01',
    title: 'Modern Constructivist Pedagogy & Technology-Enhanced Learning',
    skillsGapAddressed: 'Active Student Engagement and Digital Classroom Tools',
    objectives: [
      'Equip college faculty with blended learning design principles.',
      'Utilize digital student response systems for continuous formative feedback.',
      'Align instructional tasks with DCC Institutional Learning Outcomes.'
    ],
    description: 'A 2-day hands-on professional development seminar organized by the Office of the Principal and Guidance Center for all full-time and part-time DCC faculty.',
    schedule: 'May 8-9, 2026 | 8:30 AM - 4:30 PM',
    venue: 'Davao Central College Audio-Visual Theater (AVR-1) & Online Hybrid Room',
    facilitator: 'Dr. Clarita S. Villanueva, Ph.D. (Regional Center for Higher Education Development)',
    targetParticipants: 'All Faculty Members (Collegiate & Senior High School)',
    maxAttendees: 60,
    enrolledTeachers: ['Engr. Ronald P. Mendoza', 'Prof. Aniceto G. Morales', 'Dr. Teresa L. Delos Reyes', 'Instructor Leo M. Bautista'],
    attendanceStatus: 'Planned',
    postTrainingFollowUp: 'Participants will submit an enhanced 4-week module incorporating formative digital rubrics.',
    outcomeNotes: 'Approved by Dr. Maria Elena C. Santos, Principal. Materials will be archived in the DCC Faculty Portal.'
  },
  {
    id: 'sem-02',
    title: 'Designing Validated Assessment Rubrics & Constructive Feedback Mechanisms',
    skillsGapAddressed: 'Assessment Transparency and Prompt Feedback Delivery',
    objectives: [
      'Formulate objective criterion-referenced rubrics for subjective assessments.',
      'Establish manageable workflow habits for timely student evaluation turnaround.'
    ],
    description: 'Intensive workshop focusing on authentic assessments, performance task scoring guides, and transparent student consultation.',
    schedule: 'May 22, 2026 | 1:00 PM - 5:00 PM',
    venue: 'DCC Faculty Development Center, 3rd Floor Administration Hall',
    facilitator: 'Prof. Carmencita V. Alcantara, MAT (Academic Coordinator)',
    targetParticipants: 'General Education & Professional Education Instructors',
    maxAttendees: 40,
    enrolledTeachers: ['Prof. Aniceto G. Morales', 'Instructor Leo M. Bautista'],
    attendanceStatus: 'Planned',
    postTrainingFollowUp: 'Classroom observation visits scheduled 2 weeks post-workshop.',
    outcomeNotes: 'In response to 2nd Semester student feedback patterns on assessment clarity.'
  }
];

const INITIAL_HR_EMPLOYMENT_RECORDS: EmploymentIntervention[] = [
  {
    id: 'hr-case-2026-01',
    caseNumber: 'DCC-HR-FAC-2026-004',
    teacherId: 'usr-teacher-09',
    teacherName: 'Instructor Danilo S. Ramos',
    department: 'College of Arts and Sciences',
    dateReferred: '2026-03-10',
    referralSource: 'Principal & Academic Coordinator Referral',
    documentedConcerns: [
      'Documented chronicle of unexcused absences and missed syllabus milestones over three consecutive terms.',
      'Unresolved student complaints regarding non-submission of midterm and final grades, violating registrar deadlines.',
      'Prior non-completion of two scheduled Guidance Office pedagogical assistance programs.'
    ],
    stage: 'Administrative Conference Scheduled',
    facultyManualArticles: [
      'DCC Faculty Manual Section 4.2 (Attendance & Punctuality Norms)',
      'DCC Faculty Manual Section 7.5 (Submission of Scholastic Records)',
      'Philippine Labor Code Due Process Standards (Twin Notice Rule)'
    ],
    humanReviewNotes: 'First Notice of Explanation (Show-Cause Memorandum) duly served and acknowledged on March 18, 2026. Faculty member submitted written explanation on March 25. Administrative conference with HR Committee, Principal, and faculty member scheduled for April 29, 2026. Under strict manual human review; no automated personnel actions allowed.',
    assignedHRReviewer: 'Ms. Victoria B. Ramos, CHRA (HR Officer)',
    dueProcessNoticeDate: '2026-03-18',
    conferenceDate: '2026-04-29',
    isActionAutomated: false,
    humanReviewerSignoff: true
  }
];

const STORAGE_KEYS = {
  QUESTIONS: 'teachreach_dcc_questions',
  REVIEWS: 'teachreach_dcc_reviews',
  ANNOUNCEMENTS: 'teachreach_dcc_announcements',
  GOOGLE_FORMS: 'teachreach_dcc_google_forms',
  DISTRIBUTIONS: 'teachreach_dcc_distributions',
  RESULTS: 'teachreach_dcc_results',
  DISCUSSIONS: 'teachreach_dcc_discussions',
  INTERVENTIONS: 'teachreach_dcc_interventions',
  IMPROVEMENTS: 'teachreach_dcc_improvements',
  SEMINARS: 'teachreach_dcc_seminars',
  HR_EMPLOYMENT: 'teachreach_dcc_hr_employment',
  CURRENT_ROLE: 'teachreach_dcc_current_role'
};

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error saving to localStorage', err);
  }
}

// Data Service API (Simulating REST / PostgreSQL data layer)
export const dataService = {
  // Authentication & Demo Role Switching
  getCurrentRole(): UserRole {
    return getStored<UserRole>(STORAGE_KEYS.CURRENT_ROLE, 'principal');
  },
  setCurrentRole(role: UserRole): void {
    setStored(STORAGE_KEYS.CURRENT_ROLE, role);
  },
  getUserProfile(role: UserRole): UserProfile {
    return SYSTEM_ROLES[role];
  },

  // Reset to factory sample data
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.GOOGLE_FORMS);
    localStorage.removeItem(STORAGE_KEYS.DISTRIBUTIONS);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.DISCUSSIONS);
    localStorage.removeItem(STORAGE_KEYS.INTERVENTIONS);
    localStorage.removeItem(STORAGE_KEYS.IMPROVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.SEMINARS);
    localStorage.removeItem(STORAGE_KEYS.HR_EMPLOYMENT);
  },

  // PROCESS 1: Evaluation Questions
  getQuestions(): EvaluationQuestion[] {
    return getStored(STORAGE_KEYS.QUESTIONS, INITIAL_QUESTIONS);
  },
  saveQuestion(question: Partial<EvaluationQuestion> & { text: string }): EvaluationQuestion {
    const list = this.getQuestions();
    if (question.id) {
      const idx = list.findIndex(q => q.id === question.id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...question,
          lastUpdated: new Date().toISOString().split('T')[0]
        } as EvaluationQuestion;
        setStored(STORAGE_KEYS.QUESTIONS, list);
        return list[idx];
      }
    }
    const newQ: EvaluationQuestion = {
      id: `q-${Date.now()}`,
      number: list.length + 1,
      text: question.text,
      category: question.category || 'Instructional Competence',
      type: question.type || 'likert_5',
      isActive: question.isActive !== undefined ? question.isActive : true,
      version: 'AY2025-2026.v2',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    list.push(newQ);
    setStored(STORAGE_KEYS.QUESTIONS, list);
    return newQ;
  },
  toggleQuestionActive(id: string): void {
    const list = this.getQuestions();
    const q = list.find(item => item.id === id);
    if (q) {
      q.isActive = !q.isActive;
      q.lastUpdated = new Date().toISOString().split('T')[0];
      setStored(STORAGE_KEYS.QUESTIONS, list);
    }
  },

  // PROCESS 2: Question Reviews
  getQuestionReviews(): QuestionnaireReview[] {
    return getStored(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },
  updateQuestionReview(review: QuestionnaireReview): void {
    const list = this.getQuestionReviews();
    const idx = list.findIndex(r => r.id === review.id);
    if (idx !== -1) {
      list[idx] = review;
      setStored(STORAGE_KEYS.REVIEWS, list);
    }
  },

  // PROCESS 3: Evaluation Announcements & Schedule
  getAnnouncements(): EvaluationAnnouncement[] {
    return getStored(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  },
  saveAnnouncement(ann: Partial<EvaluationAnnouncement>): EvaluationAnnouncement {
    const list = this.getAnnouncements();
    if (ann.id) {
      const idx = list.findIndex(a => a.id === ann.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...ann } as EvaluationAnnouncement;
        setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);
        return list[idx];
      }
    }
    const newAnn: EvaluationAnnouncement = {
      id: `ann-${Date.now()}`,
      memoNumber: ann.memoNumber || `DCC-MEMO-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: ann.title || 'Faculty Evaluation Announcement',
      academicYear: ann.academicYear || '2025-2026',
      semester: ann.semester || '2nd Semester',
      targetAudience: ann.targetAudience || 'All Enrolled Students',
      gradeLevelOrDepartment: ann.gradeLevelOrDepartment || 'Collegiate Departments',
      startDate: ann.startDate || new Date().toISOString().split('T')[0],
      endDate: ann.endDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: ann.status || 'Draft',
      dateCreated: new Date().toISOString().split('T')[0],
      message: ann.message || '',
      signatory: ann.signatory || 'Noel R. De Guzman, RGC',
      signatoryTitle: ann.signatoryTitle || 'Head, Guidance and Evaluation Center'
    };
    list.unshift(newAnn);
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);
    return newAnn;
  },

  // PROCESS 4: Google Forms Links
  getGoogleFormsLinks(): GoogleFormsLink[] {
    return getStored(STORAGE_KEYS.GOOGLE_FORMS, INITIAL_GOOGLE_FORMS_LINKS);
  },
  saveGoogleFormsLink(link: GoogleFormsLink): void {
    const list = this.getGoogleFormsLinks();
    const idx = list.findIndex(l => l.id === link.id);
    if (idx !== -1) {
      list[idx] = link;
    } else {
      list.push(link);
    }
    setStored(STORAGE_KEYS.GOOGLE_FORMS, list);
  },

  // PROCESS 5: Evaluation Distribution (Class GC)
  getDistributions(): EvaluationDistribution[] {
    return getStored(STORAGE_KEYS.DISTRIBUTIONS, INITIAL_DISTRIBUTIONS);
  },
  markDistributionShared(id: string, platform: string): void {
    const list = this.getDistributions();
    const item = list.find(d => d.id === id);
    if (item) {
      item.status = 'Shared';
      item.sharedDate = new Date().toLocaleString();
      item.platformShared = platform;
      setStored(STORAGE_KEYS.DISTRIBUTIONS, list);
    }
  },

  // PROCESS 6: Student Submissions
  submitStudentEvaluation(submission: {
    teacherId: string;
    subjectCode: string;
    ratings: Record<string, number>;
    writtenFeedback?: string;
  }): void {
    // Increment response count in corresponding Google Forms link and update teacher rating
    const links = this.getGoogleFormsLinks();
    const link = links.find(l => l.teacherId === submission.teacherId);
    if (link) {
      link.responseCount += 1;
      setStored(STORAGE_KEYS.GOOGLE_FORMS, links);
    }

    // Update teacher results
    const results = this.getTeacherResults();
    const teacherResult = results.find(r => r.teacherId === submission.teacherId);
    if (teacherResult) {
      teacherResult.totalResponses += 1;
      if (submission.writtenFeedback && submission.writtenFeedback.trim()) {
        teacherResult.anonymizedComments.unshift({
          id: `cm-${Date.now()}`,
          text: submission.writtenFeedback.trim(),
          categorySentiment: 'Positive',
          date: new Date().toISOString().split('T')[0]
        });
      }
      setStored(STORAGE_KEYS.RESULTS, results);
    }
  },

  // PROCESS 7: Performance Ratings
  getTeacherResults(): TeacherEvaluationResult[] {
    return getStored(STORAGE_KEYS.RESULTS, INITIAL_TEACHER_RESULTS);
  },
  toggleReleaseToTeacher(teacherId: string): void {
    const list = this.getTeacherResults();
    const r = list.find(item => item.teacherId === teacherId);
    if (r) {
      r.isReleasedToTeacher = !r.isReleasedToTeacher;
      if (r.isReleasedToTeacher) {
        r.releasedDate = new Date().toISOString().split('T')[0];
      }
      setStored(STORAGE_KEYS.RESULTS, list);
    }
  },

  // PROCESS 8: Discussions
  getDiscussions(): EvaluationDiscussion[] {
    return getStored(STORAGE_KEYS.DISCUSSIONS, INITIAL_DISCUSSIONS);
  },
  saveDiscussion(discussion: EvaluationDiscussion): void {
    const list = this.getDiscussions();
    const idx = list.findIndex(d => d.id === discussion.id);
    if (idx !== -1) {
      list[idx] = discussion;
    } else {
      list.unshift(discussion);
    }
    setStored(STORAGE_KEYS.DISCUSSIONS, list);
  },

  // PROCESS 9: Interventions
  getInterventions(): InterventionProgram[] {
    return getStored(STORAGE_KEYS.INTERVENTIONS, INITIAL_INTERVENTIONS);
  },
  saveIntervention(intervention: InterventionProgram): void {
    const list = this.getInterventions();
    const idx = list.findIndex(i => i.id === intervention.id);
    if (idx !== -1) {
      list[idx] = intervention;
    } else {
      list.unshift(intervention);
    }
    setStored(STORAGE_KEYS.INTERVENTIONS, list);
  },

  // PROCESS 10: Improvement Monitoring
  getImprovements(): ImprovementMonitoring[] {
    return getStored(STORAGE_KEYS.IMPROVEMENTS, INITIAL_IMPROVEMENTS);
  },
  saveImprovement(imp: ImprovementMonitoring): void {
    const list = this.getImprovements();
    const idx = list.findIndex(i => i.id === imp.id);
    if (idx !== -1) {
      list[idx] = imp;
    } else {
      list.unshift(imp);
    }
    setStored(STORAGE_KEYS.IMPROVEMENTS, list);
  },

  // PROCESS 11: Seminars & Training + HR Due Process
  getSeminars(): SeminarTraining[] {
    return getStored(STORAGE_KEYS.SEMINARS, INITIAL_SEMINARS);
  },
  saveSeminar(sem: SeminarTraining): void {
    const list = this.getSeminars();
    const idx = list.findIndex(s => s.id === sem.id);
    if (idx !== -1) {
      list[idx] = sem;
    } else {
      list.unshift(sem);
    }
    setStored(STORAGE_KEYS.SEMINARS, list);
  },
  getHREmploymentRecords(): EmploymentIntervention[] {
    return getStored(STORAGE_KEYS.HR_EMPLOYMENT, INITIAL_HR_EMPLOYMENT_RECORDS);
  },
  saveHREmploymentRecord(rec: EmploymentIntervention): void {
    const list = this.getHREmploymentRecords();
    const idx = list.findIndex(r => r.id === rec.id);
    if (idx !== -1) {
      list[idx] = rec;
    } else {
      list.unshift(rec);
    }
    setStored(STORAGE_KEYS.HR_EMPLOYMENT, list);
  }
};
