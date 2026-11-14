export type AssignmentStatus = 'graded' | 'review' | 'available' | 'upcoming' | 'overdue'
export interface ParticipantAssignment {
  id: string
  kind: 'reading' | 'listening' | 'journal'
  label?: string
  title: string
  date: string
  status: AssignmentStatus
  score?: number
  maximum?: number
}
