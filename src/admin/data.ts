export type AdminUser = {
  id: string
  name: string
  email: string
  joinedAt: string
  activeCourse: string
  streak: number
  totalXP: number
  lessonsCompleted: number
  accuracy: number
  status: 'active' | 'inactive'
}

export type AdminStats = {
  totalUsers: number
  activeToday: number
  lessonsPublished: number
  avgAccuracy: number
  totalXPEarned: number
  newUsersThisWeek: number
}

export const ADMIN_USERS: AdminUser[] = [
  { id: 'u1', name: 'Sophie Marchand', email: 'sophie.m@email.com', joinedAt: '2024-03-12', activeCourse: 'French A2', streak: 4, totalXP: 850, lessonsCompleted: 12, accuracy: 87, status: 'active' },
  { id: 'u2', name: 'James Okafor', email: 'james.o@email.com', joinedAt: '2024-04-01', activeCourse: 'Spanish A1', streak: 12, totalXP: 1240, lessonsCompleted: 18, accuracy: 91, status: 'active' },
  { id: 'u3', name: 'Yuki Tanaka', email: 'yuki.t@email.com', joinedAt: '2024-02-18', activeCourse: 'Japanese A1', streak: 0, totalXP: 420, lessonsCompleted: 6, accuracy: 74, status: 'inactive' },
  { id: 'u4', name: 'Clara Benson', email: 'clara.b@email.com', joinedAt: '2024-05-09', activeCourse: 'French A2', streak: 7, totalXP: 1050, lessonsCompleted: 15, accuracy: 89, status: 'active' },
  { id: 'u5', name: 'Rafael Torres', email: 'r.torres@email.com', joinedAt: '2024-01-22', activeCourse: 'German B1', streak: 21, totalXP: 3400, lessonsCompleted: 44, accuracy: 93, status: 'active' },
  { id: 'u6', name: 'Aisha Ndiaye', email: 'aisha.n@email.com', joinedAt: '2024-06-03', activeCourse: 'Spanish A1', streak: 2, totalXP: 190, lessonsCompleted: 3, accuracy: 68, status: 'active' },
  { id: 'u7', name: 'Tom Eriksson', email: 'tom.e@email.com', joinedAt: '2024-03-27', activeCourse: 'French A2', streak: 0, totalXP: 610, lessonsCompleted: 9, accuracy: 81, status: 'inactive' },
]

export const ADMIN_STATS: AdminStats = {
  totalUsers: 247,
  activeToday: 84,
  lessonsPublished: 38,
  avgAccuracy: 82,
  totalXPEarned: 184200,
  newUsersThisWeek: 12,
}

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', sessions: 72 },
  { day: 'Tue', sessions: 89 },
  { day: 'Wed', sessions: 95 },
  { day: 'Thu', sessions: 84 },
  { day: 'Fri', sessions: 61 },
  { day: 'Sat', sessions: 48 },
  { day: 'Sun', sessions: 53 },
]

export const COURSE_BREAKDOWN = [
  { name: 'French A2', flag: '🇫🇷', users: 98, color: '#2EC4B6' },
  { name: 'Spanish A1', flag: '🇪🇸', users: 76, color: '#E84855' },
  { name: 'Japanese A1', flag: '🇯🇵', users: 43, color: '#FFD60A' },
  { name: 'German B1', flag: '🇩🇪', users: 30, color: '#9B5DE5' },
]
