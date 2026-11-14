export interface AttendanceMeeting {
  id: string
  title: string
  date: string
  arrival: string
  departure: string | null
  score: number | null
}

// Dates and attendance values mirror the supplied overview mockup.
export const attendanceMeetings: AttendanceMeeting[] = [
  { id: 'attendance-1', title: 'اكتشاف الذات', date: '2026-09-03', arrival: '16:30', departure: '19:30', score: 9.5 },
  { id: 'attendance-2', title: 'اكتشاف الذات', date: '2026-09-03', arrival: '16:30', departure: '20:30', score: 9.5 },
  { id: 'attendance-3', title: 'اكتشاف الذات', date: '2026-09-03', arrival: '16:30', departure: '19:30', score: 9.5 },
  { id: 'attendance-4', title: 'اكتشاف الذات', date: '2026-09-03', arrival: '16:30', departure: null, score: null },
]
