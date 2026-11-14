<script setup lang="ts">
import { Radio } from '@lucide/vue'
defineProps<{ year: number; count: number }>()
</script>

<template>
  <section class="flex flex-col justify-between gap-5 rounded-3xl border border-line bg-white p-5 xl:flex-row xl:items-center" aria-labelledby="weeks-title">
    <div>
      <div class="mb-3 flex flex-wrap items-center gap-2"><span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-fine font-bold text-green-800"><Radio :size="14" aria-hidden="true" />دورة نشطة</span><span class="text-xs font-bold text-slate-400">دفعة قائد {{ year }}</span></div>
      <h1 id="weeks-title" class="text-2xl font-bold leading-8">إدارة الأسابيع والخطط التدريبية</h1>
      <p class="mt-2 text-sm font-light leading-6 text-muted">أدِر بنية الأسابيع، أهداف التعلم، المواعيد والتكاليف المرتبطة بالدورة الحالية.</p>
    </div>
    <dl class="grid shrink-0 grid-cols-3 gap-2">
      <div class="rounded-2xl bg-slate-50 px-4 py-3"><dt class="text-fine font-bold text-slate-400">الدفعة</dt><dd class="mt-1 text-sm font-bold text-slate-800">{{ year }}</dd></div>
      <div class="rounded-2xl bg-slate-50 px-4 py-3"><dt class="text-fine font-bold text-slate-400">الأسابيع</dt><dd class="mt-1 text-sm font-bold text-slate-800">{{ count }}</dd></div>
      <div class="rounded-2xl bg-slate-50 px-4 py-3"><dt class="text-fine font-bold text-slate-400">الحالة</dt><dd class="mt-1 text-sm font-bold text-emerald-600">نشطة</dd></div>
    </dl>
  </section>
</template>
