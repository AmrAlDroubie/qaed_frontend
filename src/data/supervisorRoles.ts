import type { SupervisorRole } from '../types/admin'

export const supervisorRoles: { id: SupervisorRole; label: string; description: string; badge: string }[] = [
  { id: 'logbook', label: 'مشرف السجل القيادي', description: 'Logbook Grader', badge: 'السجل القيادي' },
  { id: 'assignments', label: 'مشرف تصحيح التكاليف', description: 'Assignments Grader', badge: 'تصحيح' },
  { id: 'attendance', label: 'مشرف الحضور والجدولة', description: 'Attendance Supervisor', badge: 'الحضور والجدولة' },
  { id: 'content', label: 'مشرف المحتوى', description: 'Content Builder', badge: 'إنشاء تكاليف' },
  { id: 'initiatives', label: 'مشرف المبادرات والبرنامج التمكيني', description: 'Initiatives Evaluator', badge: 'المبادرات' },
]
