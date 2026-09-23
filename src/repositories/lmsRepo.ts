// Repository: async access layer over (mock) data.
// To switch to REST later, re-implement these functions with HTTP calls —
// views and components must not change.
import {
  mockAchievements,
  mockAssignments,
  mockCourses,
  mockGrades,
  mockNotifications,
  mockResources,
  mockSchedule,
  mockStudent,
} from '@/data/mockData'
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

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const lmsRepo = {
  getStudent: (): Promise<Student> => delay({ ...mockStudent }),
  getCourses: (): Promise<Course[]> => delay(mockCourses.map((c) => ({ ...c }))),
  getCourse: (id: string): Promise<Course | undefined> =>
    delay(mockCourses.find((c) => c.id === id)),
  getAssignments: (onlyOpen = false): Promise<Assignment[]> =>
    delay(mockAssignments.filter((a) => !onlyOpen || !a.done).map((a) => ({ ...a }))),
  getSchedule: (): Promise<ScheduleEvent[]> => delay(mockSchedule.map((s) => ({ ...s }))),
  getAchievements: (): Promise<Achievement[]> =>
    delay(mockAchievements.map((a) => ({ ...a }))),
  getGrades: (): Promise<GradeRow[]> => delay(mockGrades.map((g) => ({ ...g }))),
  getResources: (): Promise<Resource[]> => delay(mockResources.map((r) => ({ ...r }))),
  getNotifications: (): Promise<AppNotification[]> =>
    delay(mockNotifications.map((n) => ({ ...n }))),

  // Mock auth: any well-formed credentials sign in as the demo student.
  // Replace with POST /api/auth/login when the backend is available.
  signIn: (email: string): Promise<Student> =>
    delay({ ...mockStudent, email: email.trim() || mockStudent.email }),
  signUp: (fullName: string, email: string): Promise<Student> => {
    const first = fullName.trim().split(/\s+/)[0] || 'Student'
    return delay({ ...mockStudent, fullName: fullName.trim(), firstName: first, email })
  },
}
