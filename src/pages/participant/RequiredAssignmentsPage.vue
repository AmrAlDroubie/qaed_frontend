<script setup lang="ts">
import { computed, ref } from 'vue'
import { BookOpenText } from '@lucide/vue'
import TabBar from '../../components/ui/TabBar.vue'
import RequiredAssignmentsOverview from '../../components/participant/assignments/RequiredAssignmentsOverview.vue'
import ParticipantAssignmentRow from '../../components/participant/assignments/ParticipantAssignmentRow.vue'
import { requiredAssignments } from '../../data/assignments'
const filter = ref('all')
const filters = [{ id: 'all', label: 'الكل' }, { id: 'available', label: 'التكاليف المتاحة' }, { id: 'overdue', label: 'التكاليف المتأخرة' }]
const assignments = computed(() => requiredAssignments.filter(assignment => filter.value === 'all' || assignment.status === filter.value))
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] space-y-8 px-0 pb-8 pt-5 sm:px-3" dir="rtl">
    <RequiredAssignmentsOverview :score="9" :maximum="10" :weight="17.5" />
    <section aria-labelledby="assignment-list-title">
      <header class="mb-6 flex flex-col justify-between gap-4 2xl:flex-row 2xl:items-center">
        <div class="flex items-center gap-3"><span class="rounded-xl bg-brand/5 p-2 text-brand"><BookOpenText :size="22" aria-hidden="true" /></span><div><p class="text-xs font-bold text-brand">رحلتك أسبوعاً بعد أسبوع</p><h2 id="assignment-list-title" class="mt-1 text-lg font-bold">قائمة التكاليف الإلزامية</h2></div></div>
        <div class="flex flex-wrap items-center gap-3"><TabBar v-model="filter" :items="filters" label="تصفية التكاليف الإلزامية" stretch class="max-w-full rounded-full border border-line bg-white p-1" /><span role="status" class="rounded-full border border-line bg-white px-4 py-2 text-xs text-muted">{{ assignments.length }} جلسات معروضة</span></div>
      </header>
      <div class="space-y-4"><ParticipantAssignmentRow v-for="assignment in assignments" :key="assignment.id" :assignment="assignment" /></div>
    </section>
  </div>
</template>
