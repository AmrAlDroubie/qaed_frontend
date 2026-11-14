<script setup lang="ts">
import { ref } from 'vue'
import { CircleCheck } from '@lucide/vue'
import WeekRoadmap from '../../components/participant/WeekRoadmap.vue'
import PerformanceSummary from '../../components/participant/PerformanceSummary.vue'
import PendingTaskCard from '../../components/participant/PendingTaskCard.vue'
import TaskSubmissionDialog from '../../components/participant/TaskSubmissionDialog.vue'
import { useParticipantStore } from '../../stores/participant'
import type { ParticipantTask } from '../../data/participant'
const store = useParticipantStore()
const selected = ref<ParticipantTask | null>(null)
const notice = ref('')
function submit(text: string, fileName: string) {
  if (!selected.value) return
  store.submit(selected.value.id, text, fileName)
  selected.value = null
  notice.value = 'تم حفظ تسليمك محليًا، وبانتظار التقييم.'
}
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] space-y-4 pb-8 pt-4" dir="rtl">
    <header class="pb-5"><p class="text-sm font-bold text-brand">رحلتي القيادية</p><h1 class="my-1 text-4xl font-bold leading-tight">اللوحة الرئيسية</h1><p class="mt-2 text-lg font-light leading-7 text-muted">ملخص يوضح مدى التقدم والمهام المتبقية ودرجاتك في جميع المعايير</p></header>
    <WeekRoadmap />
    <div class="grid items-start gap-4 xl:grid-cols-[minmax(300px,0.32fr)_minmax(0,0.68fr)]">
      <PerformanceSummary />
      <section aria-labelledby="pending-title" class="rounded-3xl border border-line bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] xl:min-h-[568px]">
        <header class="mb-5 flex items-center justify-between gap-3"><div><h2 id="pending-title" class="text-base font-bold">المهام المتبقية</h2><p class="mt-2 text-sm font-light text-muted">انقر على أي بطاقة لفتح نافذة التسليم</p></div><span class="rounded-full border border-line bg-slate-100 px-3 py-1.5 text-xs text-slate-600">{{ store.pendingTasks.length }} تكاليف</span></header>
        <p v-if="notice" role="status" class="mb-4 rounded-xl bg-brand/5 p-3 text-sm text-brand">{{ notice }}</p>
        <div v-if="store.pendingTasks.length" class="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3"><PendingTaskCard v-for="task in store.pendingTasks" :key="task.id" :task="task" @open="selected = task" /></div>
        <div v-else class="flex flex-col items-center gap-3 py-16 text-center"><CircleCheck :size="40" class="text-brand" /><h3 class="text-xl font-bold">أكملت جميع المهام المتبقية</h3><p class="text-base text-muted">تسليماتك بانتظار التقييم.</p></div>
      </section>
    </div>
    <TaskSubmissionDialog v-if="selected" :task="selected" @close="selected = null" @submit="submit" />
  </div>
</template>
