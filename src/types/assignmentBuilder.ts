import type { ManagedAssignmentType } from '../stores/assignmentManagement'
export type QuestionType = 'boolean' | 'choice' | 'essay'
export interface AssignmentQuestion { id: string; type: QuestionType; text: string; points: number; correct: number; options: string[]; maxWords: number; attachments: boolean }
export interface AssignmentDefinition { title: string; type: ManagedAssignmentType; week: number; bonusWeight: number; questions: AssignmentQuestion[]; submissionTypes: string[]; publishAt: string; deadline: string; latePolicy: 'deduct' | 'close'; aiDisclosure: boolean }
export const questionLabels = { boolean: 'صح وخطأ', choice: 'اختيار من متعدد', essay: 'سؤال مقالي' }
export function newQuestion(type: QuestionType): AssignmentQuestion { return { id: crypto.randomUUID(), type, text: '', points: 1, correct: 0, options: ['', '', '', ''], maxWords: 250, attachments: true } }
export function initialAssignment(): AssignmentDefinition {
  const first = newQuestion('boolean'); first.text = 'تعتبر مرحلة تحليل المخاطر هي الخطوة الأولى المباشرة في نموذج اتخاذ القرار القيادي تحت الضغط.'
  const second = newQuestion('choice'); second.text = 'ما هي الركيزة الأساسية التي يعتمد عليها القائد عند تفعيل خيار التفويض الفعال في أوقات الأزمات؟'; second.correct = 1; second.options = ['توزيع المهام دون تحديد الصلاحيات', 'وضوح الهدف والصلاحيات مع الثقة والمتابعة', 'الاحتفاظ بجميع القرارات لدى القائد', 'إلغاء المتابعة بعد تفويض المهمة']
  const third = newQuestion('essay'); third.text = 'بناءً على الفصل الثاني من الكتاب المقرر، اشرح باختصار موقفاً قيادياً طبقت فيه آلية الموازنة بين الحزم والتمكين، موضّحاً النتيجة المباشرة.'
  return { title: 'اختبار التكليف القرائي - الأسبوع الرابع: صناعة القرار', type: 'reading', week: 4, bonusWeight: 20, questions: [first, second, third], submissionTypes: ['text', 'file', 'link'], publishAt: '', deadline: '', latePolicy: 'deduct', aiDisclosure: true }
}
export function assignmentWeight(draft: AssignmentDefinition) { return draft.type === 'reading' ? 15 / 12 : draft.type === 'listening' ? 2.5 : draft.bonusWeight }

export function cloneAssignment(draft: AssignmentDefinition): AssignmentDefinition { return { ...draft, submissionTypes: [...draft.submissionTypes], questions: draft.questions.map(question => ({ ...question, options: [...question.options] })) } }
