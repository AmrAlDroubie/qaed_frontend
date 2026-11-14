import type { TrainingWeek } from './weeks'

export type BatchPlanMode = 'import' | 'empty'
export interface Batch {
  id: string
  name: string
  year: number
  status: 'active' | 'archived'
  participants: number
  averageProgress: number
  weeks: TrainingWeek[]
}
export interface BatchDraft {
  name: string
  year: number
  mode: BatchPlanMode
  sourceId: string
}
