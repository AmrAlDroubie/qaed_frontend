<script setup lang="ts">
import { BookOpen, Check, ChevronLeft, Clock3, FileText, Timer } from '@lucide/vue'
import type { ParticipantTask } from '../../data/participant'
defineProps<{ task: ParticipantTask; submitted?: boolean }>()
defineEmits<{ open: [] }>()
</script>

<template>
  <button type="button" :disabled="submitted" class="flex min-h-[220px] w-full flex-col gap-2 rounded-2xl border border-line bg-white p-3 text-right transition-colors hover:border-brand/40 hover:bg-brand/[0.02] disabled:cursor-default" :aria-label="`${submitted ? 'تم تسليم' : 'فتح تسليم'}: ${task.title}`" @click="$emit('open')">
    <span class="mb-1 flex w-full items-center justify-between gap-2"><span class="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-muted"><component :is="task.journal ? BookOpen : FileText" :size="16" /></span><span class="rounded-full border border-line bg-slate-100 px-2 py-1.5 text-xs text-slate-600">{{ task.category }}</span></span>
    <span class="text-sm font-bold leading-6">{{ task.title }}</span>
    <span class="text-xs text-muted">الوزن: <strong class="text-slate-600">{{ task.weight }}%</strong></span>
    <span v-if="submitted" class="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-xs text-brand"><Check :size="14" />تم التسليم — بانتظار التقييم</span>
    <span v-else-if="task.journal" class="flex w-full items-center justify-center gap-1 rounded-xl border border-brand/10 bg-brand/5 p-2 text-xs text-brand"><Timer :size="12" />باقي ٣ أيام و٥ ساعات على إغلاق التسليم</span>
    <span v-else class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-muted"><Clock3 :size="12" />بانتظار التسليم</span>
    <span class="mt-auto flex w-full items-center justify-between border-t border-slate-100 pt-2 text-xs font-light text-slate-400">{{ task.deadline }}<ChevronLeft :size="12" /></span>
  </button>
</template>
