import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { assignmentWeight, cloneAssignment, type AssignmentDefinition } from '../types/assignmentBuilder'
export type ManagedAssignmentType = 'reading' | 'listening' | 'optional'
export interface ManagedAssignment {
  id: string
  title: string
  book: string
  type: ManagedAssignmentType
  week: number
  status: 'published' | 'scheduled' | 'archived'
  publishDate: string
  deadline: string
  weight: number
  submissions: number
  participants: number
  definition?: AssignmentDefinition
}
export const assignmentTypeLabels = { reading: 'تكليف قرائي', listening: 'تكليف سماعي', optional: 'تكليف اختياري (بونص)' }
function fixtures(): ManagedAssignment[] {
  const sources = [
    { title: 'تكليف اختياري - مقال قيادي عن إدارة التغيير', book: '', type: 'optional' as const, week: 6, submissions: 9 },
    { title: 'قراءة: صناعة القرار تحت الضغط', book: 'صناعة القرار تحت الضغط', type: 'reading' as const, week: 4, submissions: 26 },
    { title: 'استماع: التحيزات المعرفية', book: '', type: 'listening' as const, week: 4, submissions: 30 },
    { title: 'قراءة: العمل مع الفريق', book: 'العمل مع الفريق', type: 'reading' as const, week: 3, submissions: 22 },
  ]
  return sources.flatMap((source, index) => [
    { ...source, id: `published-${index}`, status: 'published' as const, publishDate: '2026-09-05T09:00', deadline: '2026-10-05', weight: 20, participants: 35 },
    { ...source, id: `scheduled-${index}`, status: 'scheduled' as const, publishDate: '2026-10-02T09:00', deadline: '2026-10-20', weight: 20, submissions: 0, participants: 35 },
  ])
}
export const useAssignmentManagementStore = defineStore('assignment-management', () => {
  const assignments = ref(fixtures())
  const builderDraft = ref<AssignmentDefinition | null>(null)
  function saveBuilderDraft(draft: AssignmentDefinition) { builderDraft.value = cloneAssignment(draft) }
  function createAssignment(draft: AssignmentDefinition) {
    const publishDate = draft.publishAt ? new Date(draft.publishAt).toISOString() : new Date().toISOString()
    assignments.value.unshift({ id: crypto.randomUUID(), title: draft.title.trim(), book: '', type: draft.type, week: draft.week, status: new Date(publishDate).getTime() > Date.now() ? 'scheduled' : 'published', publishDate, deadline: draft.deadline, weight: assignmentWeight(draft), submissions: 0, participants: 35, definition: cloneAssignment(draft) })
    builderDraft.value = null
  }
  const active = computed(() => assignments.value.filter(item => item.status !== 'archived'))
  const statistics = computed(() => ({ total: active.value.length, published: active.value.filter(item => item.status === 'published').length, scheduled: active.value.filter(item => item.status === 'scheduled').length, submissions: assignments.value.reduce((sum, item) => sum + item.submissions, 0) }))
  function publish(id: string) { const item = assignments.value.find(item => item.id === id); if (item?.status === 'scheduled') { item.status = 'published'; item.publishDate = new Date().toISOString() } }
  function archive(id: string) { const item = assignments.value.find(item => item.id === id); if (item?.status === 'published') item.status = 'archived' }
  function remove(id: string) { assignments.value = assignments.value.filter(item => item.id !== id || item.status !== 'scheduled') }
  return { active, statistics, publish, archive, remove, builderDraft, saveBuilderDraft, createAssignment }
})
