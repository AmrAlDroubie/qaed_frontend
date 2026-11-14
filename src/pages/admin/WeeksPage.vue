<script setup lang="ts">
import { ref } from 'vue'
import { Layers, Plus } from '@lucide/vue'
import { useWeeksStore } from '../../stores/weeks'
import { useAdminStore } from '../../stores/admin'
import type { TrainingWeek, WeekDraft } from '../../types/weeks'
import ProgramSectionTabs from '../../components/admin/ProgramSectionTabs.vue'
import WeeksOverview from '../../components/admin/WeeksOverview.vue'
import WeekStatistics from '../../components/admin/WeekStatistics.vue'
import WeekCard from '../../components/admin/WeekCard.vue'
import WeekDetailsDialog from '../../components/admin/WeekDetailsDialog.vue'

const store = useWeeksStore()
const admin = useAdminStore()
const editing = ref<TrainingWeek>()
const creating = ref(false)
function edit(week: TrainingWeek) { creating.value = false; editing.value = week }
function create() {
  creating.value = true
  const number = Math.max(0, ...store.weeks.map(week => week.number)) + 1
  editing.value = { id: '', number, title: `الأسبوع ${number}`, objective: '', status: 'upcoming', archived: false, assignmentCount: 0, date: '', location: '', startTime: '', endTime: '', agenda: [] }
}
function save(draft: WeekDraft) {
  if (!editing.value) return
  const week = creating.value ? store.addWeek() : editing.value
  store.updateWeek(week.id, draft)
  editing.value = undefined
  admin.notice = 'تم حفظ الأسبوع في المعاينة المحلية.'
}
function archive(id: string) { store.toggleArchive(id); admin.notice = 'تم تحديث أرشفة الأسبوع محليًا. يمكنك استعادته من بطاقته.' }
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px]">
    <ProgramSectionTabs />
    <div class="space-y-6 lg:ps-0 lg:pe-8">
      <WeeksOverview :year="store.cohortYear" :count="store.currentWeeks.length" />
      <section aria-labelledby="weeks-hub-title">
        <header class="mb-6 flex flex-col justify-between gap-4 2xl:flex-row 2xl:items-end">
          <div><p class="text-xs font-bold text-brand">HUB 02</p><h2 id="weeks-hub-title" class="my-1 text-xl font-bold leading-7">إدارة الأسابيع والتفاصيل</h2><p class="text-sm font-light leading-5 text-muted">تخطيط الدورة أسبوعاً بأسبوع وربط الأهداف والتكاليف بمواعيد واضحة.</p></div>
          <div class="flex flex-wrap items-center gap-2"><span class="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-fine font-bold text-brand"><Layers :size="14" />عدد الأسابيع المحددة للدورة: {{ store.currentWeeks.length }}</span><button type="button" class="flex min-h-11 items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-brand-dark" @click="create"><Plus :size="20" />إضافة أسبوع جديد للدورة الحالية</button></div>
        </header>
        <WeekStatistics v-bind="store.statistics" />
        <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><WeekCard v-for="week in store.weeks" :key="week.id" :week="week" @edit="edit" @archive="archive" /></div>
      </section>
    </div>
    <WeekDetailsDialog v-if="editing" :week="editing" :creating="creating" @close="editing = undefined" @save="save" />
  </div>
</template>
