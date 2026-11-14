<script setup lang="ts">
import { Archive, Radio } from '@lucide/vue'
import type { Batch } from '../../../types/batches'
defineProps<{ batch: Batch }>()
</script>

<template>
  <section class="flex flex-col justify-between gap-5 rounded-3xl border border-line bg-white p-5 xl:flex-row xl:items-center" aria-labelledby="batches-title">
    <div>
      <div class="mb-3 flex flex-wrap items-center gap-2"><span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-fine font-bold" :class="batch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-600'"><component :is="batch.status === 'active' ? Radio : Archive" :size="14" aria-hidden="true" />{{ batch.status === 'active' ? 'دورة نشطة' : 'دورة مؤرشفة' }}</span><span class="text-xs font-bold text-slate-400">{{ batch.name }}</span></div>
      <h1 id="batches-title" class="text-2xl font-bold leading-8">دورة حياة وإطلاق الدفعات</h1>
      <p class="mt-2 text-sm font-light leading-6 text-muted">إدارة تشغيل الدورة النشطة، إغلاقها بأمان، وإطلاق دفعات مستقبلية.</p>
    </div>
    <dl class="grid shrink-0 grid-cols-3 gap-2">
      <div class="rounded-2xl bg-slate-50 px-4 py-3"><dt class="text-fine font-bold text-slate-400">الدفعة</dt><dd class="mt-1 text-sm font-bold">{{ batch.year }}</dd></div>
      <div class="rounded-2xl bg-slate-50 px-4 py-3"><dt class="text-fine font-bold text-slate-400">الأسابيع</dt><dd class="mt-1 text-sm font-bold">{{ batch.weeks.filter(week => !week.archived).length }}</dd></div>
      <div class="rounded-2xl bg-slate-50 px-4 py-3"><dt class="text-fine font-bold text-slate-400">الحالة</dt><dd class="mt-1 text-sm font-bold" :class="batch.status === 'active' ? 'text-emerald-600' : 'text-muted'">{{ batch.status === 'active' ? 'نشطة' : 'مؤرشفة' }}</dd></div>
    </dl>
  </section>
</template>
