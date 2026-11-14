import { BookOpen, CalendarCheck, ClipboardCheck, Lightbulb, Sparkles, Star, UserCheck, Zap } from '@lucide/vue'

export const participantSections = [
  { path: 'attendance', title: 'اللقاءات والحضور', icon: CalendarCheck },
  { path: 'leadership-log', title: 'السجل القيادي', icon: BookOpen },
  { path: 'required-assignments', title: 'التكاليف الإلزامية', icon: ClipboardCheck },
  { path: 'optional-assignments', title: 'التكاليف الاختيارية', icon: Sparkles },
  { path: 'empowerment', title: 'البرنامج التمكيني', icon: Zap },
  { path: 'initiatives', title: 'المبادرات', icon: Lightbulb },
  { path: 'self-evaluation', title: 'تقييم القائد الذاتي', icon: Star },
  { path: 'supervisor-evaluation', title: 'تقييم المشرفين', icon: UserCheck },
]
export const participantWeeks = ['اكتشاف الذات', 'صناعة الأثر', 'تمكين الآخرين', 'التمكين المسؤول', 'المبادرة', 'التأثير الأخلاقي', 'القدرة على التكيّف'].map((title, index) => ({ number: index + 1, title, reached: index < 3 }))
export const performanceCriteria = [
  { title: 'الحضور والغياب', weight: 10, score: 8.5, maximum: 9 },
  { title: 'السجل القيادي', weight: 25, score: 16, maximum: 18 },
  { title: 'التكاليف الإلزامية', weight: 17.5, score: 13.8, maximum: 15.5 },
  { title: 'التكاليف الاختيارية', weight: 7.5, score: 6.2, maximum: 7.5 },
  { title: 'البرنامج التمكيني', weight: 20, score: 17.5, maximum: 20 },
  { title: 'المبادرات', weight: 10, score: 8.2, maximum: 10 },
  { title: 'تقييم القائد الذاتي', weight: 5, score: 4.4, maximum: 5 },
  { title: 'تقييم المشرفين', weight: 5, score: 4.5, maximum: 5 },
]
export interface ParticipantTask {
  id: string
  category: string
  title: string
  weight: string
  deadline: string
  journal?: boolean
}
export const participantTasks: ParticipantTask[] = [
  { id: 'decision', category: 'تكليف اختياري', title: 'قراءة: صناعة القرار تحت الضغط', weight: '3.0', deadline: 'الأربعاء 2 أكتوبر' },
  { id: 'initiative', category: 'مبادرات', title: 'استماع: التحيزات المعرفية', weight: '0.5', deadline: 'الأسبوع الرابع' },
  { id: 'listening', category: 'استماع', title: 'استماع: التحيزات المعرفية', weight: '0.5', deadline: 'الخميس 3 أكتوبر' },
  { id: 'journal', category: 'سجل قيادي', title: 'السجل القيادي — قرار الأسبوع', weight: '4.0', deadline: 'مفتوح دائمًا خلال الأسبوع', journal: true },
]
