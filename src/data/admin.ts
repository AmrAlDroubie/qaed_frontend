import type { Account, TabItem } from '../types/admin'

// Local design fixtures only. Replace with API data when authentication is connected.
export const accountFixtures: Account[] = [
  { id: '015', name: 'عبدالرحمن العتيبي', email: 'asdasdas@gmail.com', role: 'supervisor', subrole: 'تصحيح', createdAt: '2026/09/09', status: 'pending' },
  { id: '016', name: 'عبدالرحمن العتيبي', email: 'asdasdas@gmail.com', role: 'supervisor', subrole: 'إنشاء تكاليف', createdAt: '2026/09/09', status: 'active' },
  { id: '017', name: 'عبدالرحمن العتيبي', email: 'asdasdas@gmail.com', role: 'participant', subrole: '', createdAt: '2026/09/09', status: 'active' },
]

export const programSections: TabItem[] = [
  { id: 'accounts', label: 'إدارة الحسابات والدعوات والأدوار' },
  { id: 'weeks', label: 'إدارة الاسابيع والتفاصيل' },
  { id: 'launch', label: 'دورة حياة وإطلاق الدفعات' },
  { id: 'archive', label: 'سجل وأرشيف الدفعات' },
]
