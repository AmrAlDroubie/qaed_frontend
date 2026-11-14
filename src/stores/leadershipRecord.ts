import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { leadershipSessions } from '../data/leadershipRecord'
export interface LeadershipAction { id: string; action: string; schedule: string; completion: string; notes: string }
export interface LeadershipDraft { learned: string; application: string; actions: LeadershipAction[] }
export function createLeadershipDraft(): LeadershipDraft {
  return { learned: '', application: '', actions: [
    { id: crypto.randomUUID(), action: 'تعليم الطلاب الأصغر سنًا', schedule: 'الخميس 3 سبتمبر', completion: 'نعم وبجدارة', notes: 'كانت تجربة شيقة' },
    { id: crypto.randomUUID(), action: 'مناقشة مناهج مع طلاب الدفعة السابقة', schedule: 'الخميس 3 سبتمبر', completion: 'قيد العمل', notes: 'أتوقع استنتاج مزيد من المعلومات' },
    { id: crypto.randomUUID(), action: '', schedule: '', completion: '', notes: '' },
  ] }
}
export const useLeadershipRecordStore = defineStore('leadership-record', () => {
  const drafts = ref<Record<string, LeadershipDraft>>({})
  const submittedIds = ref<string[]>([])
  const sessions = computed(() => leadershipSessions.map(session => ({ ...session, status: submittedIds.value.includes(session.id) ? 'review' as const : session.status })))
  function save(id: string, draft: LeadershipDraft, final = false) {
    const session = sessions.value.find(item => item.id === id)
    if (!session || !['available', 'overdue'].includes(session.status)) return false
    drafts.value[id] = { ...draft, actions: draft.actions.map(action => ({ ...action })) }
    if (final) submittedIds.value.push(id)
    return true
  }
  return { drafts, sessions, save }
})
