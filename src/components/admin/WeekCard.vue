<script setup lang="ts">
import { Archive, ArchiveRestore, CircleCheck, ClipboardList, Clock3, Pencil, Radio } from '@lucide/vue'
import type { TrainingWeek } from '../../types/weeks'
defineProps<{ week: TrainingWeek }>()
defineEmits<{ edit: [week: TrainingWeek]; archive: [id: string] }>()
const statuses = {
  upcoming: { label: 'مستقبلي', icon: Clock3, color: 'bg-slate-200 text-slate-600' },
  active: { label: 'نشط حالياً', icon: Radio, color: 'bg-green-100 text-green-800' },
  completed: { label: 'مكتمل', icon: CircleCheck, color: 'bg-teal-100 text-brand' },
}
</script>

<template>
  <article class="flex min-w-0 flex-col gap-4 rounded-3xl bg-white p-5" :class="{ 'opacity-65': week.archived }" :aria-labelledby="`${week.id}-title`">
    <header class="flex items-start justify-between gap-2 pb-1">
      <div class="flex min-w-0 items-center gap-3"><span class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/5 text-sm font-bold text-brand">{{ week.number }}</span><div class="min-w-0"><p class="text-fine font-bold text-slate-400">الأسبوع</p><h3 :id="`${week.id}-title`" class="mt-0.5 break-words text-base font-bold leading-6">{{ week.title }}</h3></div></div>
      <span class="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-fine font-bold" :class="week.archived ? 'bg-slate-100 text-muted' : statuses[week.status].color"><component :is="week.archived ? Archive : statuses[week.status].icon" :size="14" aria-hidden="true" />{{ week.archived ? 'مؤرشف' : statuses[week.status].label }}</span>
    </header>
    <div class="rounded-2xl bg-slate-50 p-4"><p class="text-fine font-bold text-slate-400">الهدف المهاراتي</p><p class="mt-1 text-xs font-light leading-6 text-slate-600">{{ week.objective || 'سيتم تحديد الهدف المهاراتي لاحقاً.' }}</p></div>
    <dl class="grid grid-cols-2 gap-2">
      <div class="rounded-xl border border-line p-3"><dt class="text-caption font-bold text-slate-400">الفترة</dt><dd class="mt-1 text-fine font-bold text-slate-700"><span dir="ltr">{{ week.date || '—' }}</span><span v-if="week.startTime && week.endTime" class="mt-1 block" dir="ltr">{{ week.startTime }} – {{ week.endTime }}</span></dd></div>
      <div class="rounded-xl border border-line p-3"><dt class="text-caption font-bold text-slate-400">التكاليف المرتبطة</dt><dd class="mt-1 text-fine font-bold text-slate-700">{{ week.assignmentCount }} تكليف</dd></div>
    </dl>
    <div class="mt-auto flex items-center gap-2">
      <button type="button" class="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-muted hover:bg-slate-50 disabled:cursor-not-allowed" :disabled="week.archived" :aria-label="`تعديل ${week.title}`" @click="$emit('edit', week)"><Pencil :size="14" /></button>
      <RouterLink :to="{ path: '/admin/assignments', query: { week: week.id } }" class="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand/20 bg-brand/5 px-2 text-fine font-bold text-brand"><ClipboardList :size="14" aria-hidden="true" />التكاليف</RouterLink>
      <button type="button" class="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line px-2 text-fine font-bold text-muted hover:bg-slate-50" :aria-label="`${week.archived ? 'استعادة' : 'أرشفة'} ${week.title}`" @click="$emit('archive', week.id)"><component :is="week.archived ? ArchiveRestore : Archive" :size="14" aria-hidden="true" />{{ week.archived ? 'استعادة' : 'أرشفة' }}</button>
    </div>
  </article>
</template>
