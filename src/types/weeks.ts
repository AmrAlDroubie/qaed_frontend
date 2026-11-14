export type WeekStatus = 'upcoming' | 'active' | 'completed'

export interface TrainingWeek {
  id: string
  number: number
  title: string
  objective: string
  status: WeekStatus
  archived: boolean
  assignmentCount: number
  date: string
  location: string
  startTime: string
  endTime: string
  agenda: { id: string; title: string }[]
}

export type WeekDraft = Pick<TrainingWeek, 'title' | 'date' | 'location' | 'startTime' | 'endTime' | 'agenda'>
