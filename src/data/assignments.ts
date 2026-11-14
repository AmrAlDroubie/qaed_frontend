import type { ParticipantAssignment } from '../types/assignments'

// Preview states follow the supplied design, independently of today's date.
export const requiredAssignments: ParticipantAssignment[] = [
  { id: 'required-listening', kind: 'listening', title: 'تكليف سماعي — استماع التحيزات المعرفية', date: '2026-09-05', status: 'graded', score: 3.3, maximum: 4 },
  { id: 'required-session-01', kind: 'reading', title: 'الجلسة 01 — التواصل المؤثر', date: '2026-09-12', status: 'review' },
  { id: 'required-session-03', kind: 'reading', title: 'الجلسة 03 — العمل مع الفريق', date: '2026-09-19', status: 'available' },
  { id: 'required-session-04', kind: 'reading', title: 'الجلسة 04 — القرار والمسؤولية', date: '2026-09-26', status: 'upcoming' },
]
