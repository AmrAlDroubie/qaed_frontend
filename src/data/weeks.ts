import type { TrainingWeek } from '../types/weeks'

// The design shows 12 planned weeks, 3 completed, and no linked assignments.
export function createWeekFixtures(): TrainingWeek[] {
  return Array.from({ length: 12 }, (_, index) => ({
    id: `week-${index + 1}`,
    number: index + 1,
    title: `الأسبوع ${index + 1}`,
    objective: '',
    status: [9, 11, 12].includes(index + 1) ? 'completed' : 'upcoming',
    archived: false,
    assignmentCount: 0,
    date: '', location: '', startTime: '', endTime: '',
    agenda: ['بدء اللقاء', 'الاجتماع الأول', 'استراحة', 'الاجتماع الثاني'].map((title, i) => ({ id: `week-${index + 1}-agenda-${i}`, title })),
  }))
}
