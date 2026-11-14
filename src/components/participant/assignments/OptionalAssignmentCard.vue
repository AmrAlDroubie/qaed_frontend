<script setup lang="ts">
import { ChevronLeft, Clock3, Heart, RefreshCw, Sparkles } from '@lucide/vue'
import type { OptionalAssignment } from '../../../data/optionalAssignments'
defineProps<{ assignment: OptionalAssignment; favorite: boolean }>()
defineEmits<{ favorite: [] }>()
</script>

<template>
  <article class="flex min-h-[200px] flex-col gap-4 rounded-[24px] border border-line bg-white p-4">
    <div class="flex items-start justify-between gap-3">
      <span class="flex size-10 items-center justify-center rounded-xl bg-brand/8 text-brand"><Sparkles :size="18" aria-hidden="true" /></span>
      <div class="flex items-center gap-2"><button type="button" :aria-pressed="favorite" :aria-label="`${favorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}: ${assignment.title}`" class="flex size-10 items-center justify-center rounded-xl border border-line transition-colors hover:border-brand/40" :class="favorite ? 'bg-brand/10 text-brand' : 'bg-white text-slate-600'" @click="$emit('favorite')"><Heart :size="17" :fill="favorite ? 'currentColor' : 'none'" aria-hidden="true" /></button><span class="flex min-h-10 items-center rounded-full border border-amber-200 bg-amber-50 px-2 text-xs font-bold text-amber-700">{{ assignment.weight }}%</span></div>
    </div>
    <h2 class="text-base font-bold leading-7"><RouterLink :to="{ name: 'participant-optional-detail', params: { id: assignment.id } }" class="hover:text-brand">{{ assignment.title }}</RouterLink></h2>
    <ul class="flex flex-wrap gap-2 text-xs text-slate-600" aria-label="نوع التكليف ومستوى الصعوبة"><li class="rounded-full bg-slate-100 px-3 py-1.5">{{ assignment.category }}</li><li class="rounded-full bg-slate-100 px-3 py-1.5">{{ assignment.difficulty }}</li></ul>
    <div class="mt-auto flex items-center justify-between gap-2"><span class="inline-flex items-center gap-1 rounded-full border border-line bg-slate-100 px-2 py-1.5 text-xs text-muted"><component :is="assignment.status === 'review' ? RefreshCw : Clock3" :size="12" aria-hidden="true" />{{ assignment.status === 'review' ? 'قيد المراجعة' : 'بانتظار التسليم' }}</span><RouterLink :to="{ name: 'participant-optional-detail', params: { id: assignment.id } }" :aria-label="`تفاصيل ${assignment.title}`" class="flex size-8 items-center justify-center rounded-xl border border-line text-slate-600 hover:text-brand"><ChevronLeft :size="16" /></RouterLink></div>
    <button v-if="assignment.status === 'review'" disabled type="button" class="flex min-h-11 cursor-default! items-center justify-center gap-2 rounded-xl border border-slate-100 text-sm text-slate-300"><RefreshCw :size="14" />قيد المراجعة</button>
  </article>
</template>
