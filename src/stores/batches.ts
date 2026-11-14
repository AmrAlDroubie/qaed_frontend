import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createWeekFixtures } from '../data/weeks'
import { useWeeksStore } from './weeks'
import type { Batch, BatchDraft } from '../types/batches'

export const useBatchesStore = defineStore('batches', () => {
  const batches = ref<Batch[]>([{
    id: 'batch-2030', name: 'دفعة قائد 2030', year: 2030, status: 'active',
    participants: 0, averageProgress: 0,
    weeks: createWeekFixtures().map(week => ({ ...week, status: 'completed' })),
  }])
  const current = computed(() => batches.value.find(batch => batch.status === 'active'))
  const latest = computed(() => current.value ?? batches.value[batches.value.length - 1]!)
  function archiveCurrent() {
    if (current.value) current.value.status = 'archived'
  }
  function launch(draft: BatchDraft) {
    if (!draft.name.trim()) return 'أدخل اسم الدفعة.'
    if (!Number.isInteger(draft.year) || draft.year < 2000 || draft.year > 2100) return 'أدخل سنة صحيحة بين 2000 و2100.'
    if (batches.value.some(batch => batch.name === draft.name.trim())) return 'يوجد بالفعل دفعة بهذا الاسم.'
    const source = batches.value.find(batch => batch.id === draft.sourceId)
    if (draft.mode === 'import' && !source) return 'اختر الدفعة التي تريد استيراد خطتها.'
    const weeks = draft.mode === 'import' && source ? source.weeks.filter(week => !week.archived).map(week => ({
      ...week, id: crypto.randomUUID(), status: 'upcoming' as const, archived: false,
      assignmentCount: 0, date: '', startTime: '', endTime: '',
      agenda: week.agenda.map(item => ({ ...item, id: crypto.randomUUID() })),
    })) : []
    archiveCurrent()
    const batch: Batch = { id: crypto.randomUUID(), name: draft.name.trim(), year: draft.year, status: 'active', participants: 0, averageProgress: 0, weeks }
    batches.value.push(batch)
    useWeeksStore().activateCohort(batch.year, weeks)
    return ''
  }
  return { batches, current, latest, archiveCurrent, launch }
})
