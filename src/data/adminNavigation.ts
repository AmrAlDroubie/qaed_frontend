export const upcomingAdminPages = [
  { path: 'grading', title: 'اللوحة الموحدة للتصحيح' },
  { path: 'attendance', title: 'رصد وإدارة الحضور والسفرة' },
  { path: 'evaluation', title: 'تقييم المعايير المباشرة' },
  { path: 'assignments', title: 'إضافة تكليف والجدولة' },
  { path: 'notifications', title: 'مركز الإشعارات والتنبيهات' },
  { path: 'audit-log', title: 'سجل التدقيق' },
  { path: 'participants', title: 'الروستر وملفات المشاركين' },
  { path: 'launch', title: 'دورة حياة وإطلاق الدفعات', programSection: 'launch' },
  { path: 'archive', title: 'سجل وأرشيف الدفعات', programSection: 'archive' },
]

export const programSectionPaths: Record<string, string> = {
  accounts: '/admin',
  weeks: '/admin/weeks',
  launch: '/admin/launch',
  archive: '/admin/archive',
}
