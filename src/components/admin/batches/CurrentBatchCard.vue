<script setup lang="ts">
import { computed } from 'vue'
import { Archive, LockKeyhole, Orbit, Radio } from '@lucide/vue'
import type { Batch } from '../../../types/batches'
const props = defineProps<{ batch: Batch }>()
defineEmits<{ archive: [] }>()
const weeks = computed(() => props.batch.weeks.filter(week => !week.archived))
const completed = computed(() => weeks.value.filter(week => week.status === 'completed').length)
const progress = computed(() => weeks.value.length ? Math.round(completed.value / weeks.value.length * 100) : 0)
</script>

<template>
  <section class="flex flex-col gap-6 rounded-3xl border border-brand/20 bg-white p-6" aria-labelledby="current-batch-title">
    <header class="flex items-start justify-between gap-3">
      <div><span class="mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-fine font-bold" :class="batch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-muted'"><component :is="batch.status === 'active' ? Radio : Archive" :size="14" />{{ batch.status === 'active' ? 'الدورة الحالية النشطة' : 'الدورة المؤرشفة' }}</span><h3 id="current-batch-title" class="text-2xl font-bold leading-8">{{ batch.name }}</h3><p class="mt-1 text-sm font-light leading-5 text-muted">{{ batch.status === 'active' ? 'الدورة الحالية المفعلة في النظام.' : 'تم إغلاق الدورة وحفظها في الأرشيف.' }}</p></div>
      <span class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand"><Orbit :size="28" aria-hidden="true" /></span>
    </header>
    <div class="mt-auto">
      <div class="mb-3 flex flex-wrap justify-between gap-2 text-sm font-bold"><span class="text-muted">الأسابيع المنجزة</span><span>{{ completed }} / {{ weeks.length }} أسبوعاً ({{ progress }}%)</span></div>
      <div role="progressbar" aria-label="الأسابيع المنجزة" :aria-valuenow="progress" :aria-valuemin="0" :aria-valuemax="100" class="h-3 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-teal-600 transition-all" :style="{ width: `${progress}%` }" /></div>
    </div>
    <dl class="grid grid-cols-3 gap-3">
      <div class="rounded-2xl bg-slate-50 p-3 sm:p-4"><dt class="text-fine font-bold text-slate-400">المشاركون</dt><dd class="mt-1 text-lg font-bold">{{ batch.participants }}</dd></div>
      <div class="rounded-2xl bg-slate-50 p-3 sm:p-4"><dt class="text-fine font-bold text-slate-400">متوسط الإنجاز</dt><dd class="mt-1 text-lg font-bold">{{ batch.averageProgress }}%</dd></div>
      <div class="rounded-2xl bg-slate-50 p-3 sm:p-4"><dt class="text-fine font-bold text-slate-400">الحالة</dt><dd class="mt-1 text-lg font-bold" :class="batch.status === 'active' ? 'text-emerald-600' : 'text-muted'">{{ batch.status === 'active' ? 'نشطة' : 'مؤرشفة' }}</dd></div>
    </dl>
    <button type="button" :disabled="batch.status === 'archived'" class="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-default disabled:bg-slate-100 disabled:text-muted" @click="$emit('archive')"><LockKeyhole :size="20" />{{ batch.status === 'active' ? 'إغلاق الدورة وترحيلها للأرشيف' : 'تم ترحيل الدورة للأرشيف' }}</button>
  </section>
</template>
