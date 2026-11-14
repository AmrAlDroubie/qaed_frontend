import { participantWeeks } from './participant'

export interface ParticipantMeeting {
  week: number
  label: string
  title: string
  date: string
  location: string
  startTime: string
  endTime: string
  agenda: string[]
  taskIds: string[]
}
const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع']
// Local preview fixtures; the supplied meeting design is the fourth meeting.
export const participantMeetings: ParticipantMeeting[] = participantWeeks.map(week => ({
  week: week.number,
  label: `اللقاء ${ordinals[week.number - 1]}`,
  title: week.number === 4 ? 'اكتشاف الذات' : week.title,
  date: new Date(Date.UTC(2026, 9, 8 + (week.number - 4) * 7)).toISOString().slice(0, 10),
  location: 'القاعة الأولى',
  startTime: '4:30 PM',
  endTime: '10:30 PM',
  agenda: ['بدء اللقاء', 'الاجتماع الأول', 'استراحة', 'الاجتماع الثاني'],
  taskIds: week.number === 4 ? ['journal', 'decision'] : [],
}))
