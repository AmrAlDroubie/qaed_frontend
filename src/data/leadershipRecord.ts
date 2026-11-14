import type { ParticipantAssignment } from '../types/assignments'

export const leadershipSessions: ParticipantAssignment[] = [
  { id: 'journal-session-01', kind: 'journal', label: 'الجلسة الأولى', title: 'الجلسة 01 — الانطلاقة', date: '2026-09-05', status: 'graded', score: 3.3, maximum: 4 },
  { id: 'journal-session-02', kind: 'journal', label: 'الجلسة الثانية', title: 'الجلسة 02 — التواصل المؤثر', date: '2026-09-12', status: 'review' },
  { id: 'journal-session-03', kind: 'journal', label: 'الجلسة الثالثة', title: 'الجلسة 03 — العمل مع الفريق', date: '2026-09-19', status: 'available' },
  { id: 'journal-session-04', kind: 'journal', label: 'الجلسة الرابعة', title: 'الجلسة 04 — القرار والمسؤولية', date: '2026-09-26', status: 'upcoming' },
]
