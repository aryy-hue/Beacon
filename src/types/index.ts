// Domain models. UI components depend only on these interfaces —
// the repository layer (mock today, REST tomorrow) is the single seam.

export interface Teacher {
  id: string
  name: string
  subject: string
}

export interface Student {
  id: string
  fullName: string
  firstName: string
  email: string
  studentId: string
  grade: string
  school: string
  avatarColor: string
}

export type Accent = 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'teal'

export interface Course {
  id: string
  title: string
  instructor: string
  description: string
  progress: number // 0–100
  lessonsTotal: number
  lessonsDone: number
  category: string
  accent: Accent
  icon: string // Material Symbol name
  schedule: string
}

export interface Assignment {
  id: string
  title: string
  courseId: string
  courseName: string
  dueLabel: string // "Due today" | "Due Friday" | ...
  dueDate: string // ISO date
  kind: 'speech' | 'essay' | 'quiz' | 'paper' | 'project'
  done: boolean
  score?: number
  maxScore?: number
}

export interface ScheduleEvent {
  id: string
  title: string
  courseName: string
  date: string // ISO date
  start: string // "09:00"
  end: string
  room: string
  accent: Accent
}

export interface Achievement {
  id: string
  title: string
  description: string
  courseName: string
  date: string
  accent: Accent
  icon: string
}

export interface GradeRow {
  courseId: string
  courseName: string
  instructor: string
  score: number
  grade: string
  credits: number
}

export interface Resource {
  id: string
  title: string
  courseName: string
  kind: 'slides' | 'video' | 'doc' | 'link'
  meta: string
  accent: Accent
}

export interface AppNotification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
}
