// Mock dataset. Shaped like future REST responses so views stay
// source-agnostic — see src/repositories for the access layer.
import type {
  Achievement,
  AppNotification,
  Assignment,
  Course,
  GradeRow,
  Resource,
  ScheduleEvent,
  Student,
} from '@/types'

export const mockStudent: Student = {
  id: 'stu-arya',
  fullName: 'Arya Pratama',
  firstName: 'Arya',
  email: 'arya.pratama@northwood.school',
  studentId: 'NW-2026-1042',
  grade: 'Grade 10 · Science 1',
  school: 'Northwood High School',
  avatarColor: '#0b57d0',
}

export const mockCourses: Course[] = [
  {
    id: 'math',
    title: 'Mathematics',
    instructor: 'Mr. Daniel',
    description: 'Algebra, geometry and functions for grade 10.',
    progress: 82,
    lessonsTotal: 28,
    lessonsDone: 23,
    category: 'Science',
    accent: 'blue',
    icon: 'calculate',
    schedule: 'Mon · Wed · Fri — 09:00',
  },
  {
    id: 'geo',
    title: 'Advanced Geography',
    instructor: 'Ms. Linda',
    description: 'Climate zones, globalization and map skills.',
    progress: 65,
    lessonsTotal: 24,
    lessonsDone: 16,
    category: 'Social',
    accent: 'green',
    icon: 'public',
    schedule: 'Tue · Thu — 10:30',
  },
  {
    id: 'comm',
    title: 'Mass Communication',
    instructor: 'Mr. Jonathan',
    description: 'Public speaking, media literacy and debate.',
    progress: 48,
    lessonsTotal: 20,
    lessonsDone: 10,
    category: 'Language',
    accent: 'orange',
    icon: 'campaign',
    schedule: 'Mon · Thu — 13:00',
  },
  {
    id: 'eng',
    title: 'English Literature',
    instructor: 'Mrs. Clara',
    description: 'Classic and modern texts with essay writing.',
    progress: 74,
    lessonsTotal: 22,
    lessonsDone: 16,
    category: 'Language',
    accent: 'purple',
    icon: 'menu_book',
    schedule: 'Tue · Fri — 08:00',
  },
  {
    id: 'phy',
    title: 'Physics Lab',
    instructor: 'Mr. Daniel',
    description: 'Mechanics and energy through experiments.',
    progress: 35,
    lessonsTotal: 18,
    lessonsDone: 6,
    category: 'Science',
    accent: 'teal',
    icon: 'science',
    schedule: 'Wed — 13:00',
  },
  {
    id: 'art',
    title: 'Visual Arts',
    instructor: 'Ms. Sofia',
    description: 'Design basics, color theory and portfolio.',
    progress: 90,
    lessonsTotal: 16,
    lessonsDone: 14,
    category: 'Arts',
    accent: 'red',
    icon: 'palette',
    schedule: 'Fri — 14:00',
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-math',
    title: 'Outstanding Mathematics',
    description: 'Completed all mathematics modules.',
    courseName: 'Mathematics',
    date: 'Jun 12, 2026',
    accent: 'blue',
    icon: 'workspace_premium',
  },
  {
    id: 'ach-geo',
    title: 'Geography Explorer',
    description: 'Completed the advanced geography learning path.',
    courseName: 'Advanced Geography',
    date: 'May 28, 2026',
    accent: 'green',
    icon: 'explore',
  },
]

export const mockAssignments: Assignment[] = [
  { id: 'a1', title: 'Demo Speech', courseId: 'comm', courseName: 'Mass Communication', dueLabel: 'Due today', dueDate: '2026-09-23', kind: 'speech', done: false },
  { id: 'a2', title: 'Globalization Essay', courseId: 'geo', courseName: 'Advanced Geography', dueLabel: 'Due today', dueDate: '2026-09-23', kind: 'essay', done: false },
  { id: 'a3', title: 'Quiz: Quadratic Functions', courseId: 'math', courseName: 'Mathematics', dueLabel: 'Due Friday', dueDate: '2026-09-25', kind: 'quiz', done: false },
  { id: 'a4', title: 'Document Reaction Paper', courseId: 'geo', courseName: 'Advanced Geography', dueLabel: 'Due Sunday', dueDate: '2026-09-27', kind: 'paper', done: false },
  { id: 'a5', title: 'Photo Essay Project', courseId: 'art', courseName: 'Visual Arts', dueLabel: 'Due next week', dueDate: '2026-09-30', kind: 'project', done: false },
  { id: 'a6', title: 'Lab Report: Pendulum', courseId: 'phy', courseName: 'Physics Lab', dueLabel: 'Graded · 92/100', dueDate: '2026-09-18', kind: 'paper', done: true, score: 92, maxScore: 100 },
]

export const mockSchedule: ScheduleEvent[] = [
  { id: 's1', title: 'Mathematics', courseName: 'Mathematics', date: '2026-09-23', start: '09:00', end: '10:30', room: 'Room 10-A', accent: 'blue' },
  { id: 's2', title: 'Mass Communication', courseName: 'Mass Communication', date: '2026-09-23', start: '13:00', end: '14:30', room: 'Hall B', accent: 'orange' },
  { id: 's3', title: 'Advanced Geography', courseName: 'Advanced Geography', date: '2026-09-24', start: '10:30', end: '12:00', room: 'Room 10-C', accent: 'green' },
  { id: 's4', title: 'English Literature', courseName: 'English Literature', date: '2026-09-25', start: '08:00', end: '09:30', room: 'Room 10-A', accent: 'purple' },
  { id: 's5', title: 'Mathematics', courseName: 'Mathematics', date: '2026-09-25', start: '09:45', end: '11:15', room: 'Room 10-A', accent: 'blue' },
  { id: 's6', title: 'Physics Lab', courseName: 'Physics Lab', date: '2026-09-26', start: '13:00', end: '15:00', room: 'Lab 2', accent: 'teal' },
]

export const mockGrades: GradeRow[] = [
  { courseId: 'math', courseName: 'Mathematics', instructor: 'Mr. Daniel', score: 92, grade: 'A', credits: 4 },
  { courseId: 'eng', courseName: 'English Literature', instructor: 'Mrs. Clara', score: 88, grade: 'A−', credits: 3 },
  { courseId: 'geo', courseName: 'Advanced Geography', instructor: 'Ms. Linda', score: 85, grade: 'B+', credits: 3 },
  { courseId: 'art', courseName: 'Visual Arts', instructor: 'Ms. Sofia', score: 94, grade: 'A', credits: 2 },
  { courseId: 'comm', courseName: 'Mass Communication', instructor: 'Mr. Jonathan', score: 81, grade: 'B', credits: 2 },
  { courseId: 'phy', courseName: 'Physics Lab', instructor: 'Mr. Daniel', score: 78, grade: 'B−', credits: 3 },
]

export const mockResources: Resource[] = [
  { id: 'r1', title: 'Quadratic Functions — Slide Deck', courseName: 'Mathematics', kind: 'slides', meta: '24 slides · PDF', accent: 'blue' },
  { id: 'r2', title: 'Climate Zones Explained', courseName: 'Advanced Geography', kind: 'video', meta: '12 min · Video', accent: 'green' },
  { id: 'r3', title: 'Rhetoric 101 Reading Pack', courseName: 'Mass Communication', kind: 'doc', meta: '8 pages · DOC', accent: 'orange' },
  { id: 'r4', title: 'Shakespeare Study Guide', courseName: 'English Literature', kind: 'link', meta: 'External link', accent: 'purple' },
  { id: 'r5', title: 'Pendulum Lab Worksheet', courseName: 'Physics Lab', kind: 'doc', meta: '4 pages · DOC', accent: 'teal' },
  { id: 'r6', title: 'Color Theory Basics', courseName: 'Visual Arts', kind: 'video', meta: '9 min · Video', accent: 'red' },
]

export const mockNotifications: AppNotification[] = [
  { id: 'n1', title: 'Demo Speech due today', body: 'Mass Communication · Hall B, 13:00', time: '2h ago', read: false },
  { id: 'n2', title: 'New grade posted', body: 'Physics Lab report — 92/100', time: 'Yesterday', read: false },
  { id: 'n3', title: 'Certificate issued', body: 'Outstanding Mathematics is ready', time: '2 days ago', read: true },
]
