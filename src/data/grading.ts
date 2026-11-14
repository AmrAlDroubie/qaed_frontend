export type GradingStatus = 'pending' | 'graded' | 'resubmit'
export type GradingType = 'journal' | 'reading' | 'listening' | 'optional' | 'video'
export interface GradingSubmission {
  id: string
  participant: string
  group: string
  title: string
  type: GradingType
  status: GradingStatus
  aiLevel: number
  aiDeduction: number
  submittedAt: string
  answer: string
  attachment: string
  manualScore: number
  maxManualScore: number
  automaticScore: number
  automaticMaxScore: number
  manualGrade?: number
  supervisorNotes?: string
  aiOverride?: boolean
}

export const gradingTypes: { id: GradingType; label: string }[] = [
  { id: 'journal', label: 'السجل القيادي' }, { id: 'reading', label: 'قراءة' },
  { id: 'listening', label: 'استماع' }, { id: 'optional', label: 'اختياري' }, { id: 'video', label: 'فيديو' },
]
export const gradingStatuses: { id: GradingStatus; label: string }[] = [
  { id: 'pending', label: 'بانتظار التقييم' }, { id: 'graded', label: 'مُقيَّم' }, { id: 'resubmit', label: 'إعادة التسليم' },
]
// Summary and visible sample rows are independent fixtures from the supplied design.
export const gradingSummary = { pending: 7, graded: 2, resubmit: 1, average: '86.0%' }
export const gradingSubmissions: GradingSubmission[] = [
  { id: 'journal-1', title: 'السجل القيادي — قرار الأسبوع', type: 'journal', status: 'pending', aiLevel: 1, aiDeduction: 0 },
  { id: 'listening-1', title: 'استماع: التحيزات المعرفية', type: 'listening', status: 'graded', aiLevel: 3, aiDeduction: 25 },
  { id: 'reading-1', title: 'قراءة: صناعة القرار تحت الضغط', type: 'reading', status: 'graded', aiLevel: 1, aiDeduction: 0 },
  { id: 'journal-2', title: 'السجل القيادي — قرار الأسبوع', type: 'journal', status: 'pending', aiLevel: 1, aiDeduction: 0 },
].map(item => ({ ...item, participant: 'عبدالرحمن العتيبي', group: 'A', submittedAt: '2026-10-02T20:40:00', answer: 'مررت بموقف اضطررت فيه إلى اتخاذ قرار سريع أثناء ضغط الفريق. حددت الهدف الأساسي، ووزعت الصلاحيات، وحددت نقطة مراجعة بعد ساعتين. النتيجة المباشرة كانت استمرار العمل دون تعطيل مع وضوح أكبر في المسؤوليات.', attachment: 'ملاحظات الفصل الثاني.pdf', manualScore: 2.5, maxManualScore: 3, automaticScore: 3, automaticMaxScore: 3 }) as GradingSubmission)
