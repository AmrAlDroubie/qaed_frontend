<script setup lang="ts">
import { ref } from 'vue'
import { Info } from '@lucide/vue'
import { performanceCriteria } from '../../data/participant'
import PerformanceInfoDialog from './PerformanceInfoDialog.vue'

const infoOpen = ref(false)
</script>

<template>
  <section class="rounded-3xl border border-line bg-white px-3 py-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]" aria-labelledby="performance-title">
    <header class="mb-5 flex items-center justify-between gap-2"><div><h2 id="performance-title" class="text-base font-bold">معايير قياس الأداء</h2><p class="mt-2 text-sm font-light text-muted">المعايير الثمانية</p></div><button type="button" class="rounded-xl border border-brand/70 bg-brand/5 p-2 text-brand hover:bg-brand/10" aria-label="عرض آلية احتساب الدرجات" aria-haspopup="dialog" :aria-expanded="infoOpen" :aria-controls="infoOpen ? 'performance-info-dialog' : undefined" @click="infoOpen = true"><Info :size="20" aria-hidden="true" /></button></header>
    <div class="mb-3 flex items-center justify-between gap-2 rounded-[18px] border border-brand/10 bg-gradient-to-br from-white via-brand/15 to-white p-3">
      <div><p class="text-base font-light text-muted">الدرجة الكلية</p><p class="mt-1 text-lg font-bold" dir="ltr">34 / 40</p></div>
      <div role="img" aria-label="نسبة التقدم 73 بالمئة" class="flex size-16 shrink-0 items-center justify-center rounded-full" style="background: conic-gradient(var(--color-brand) 73%, #e2e8f0 0)"><span class="flex size-12 items-center justify-center rounded-full bg-white text-sm font-bold text-brand">73%</span></div>
    </div>
    <ul class="space-y-1.5">
      <li v-for="criterion in performanceCriteria" :key="criterion.title" class="rounded-xl border border-slate-100 bg-slate-50 p-3">
        <div class="mb-2 flex flex-wrap items-center gap-1.5 text-xs font-bold"><span class="rounded-full border border-line bg-slate-100 px-1.5 py-0.5 text-slate-600">{{ criterion.weight }}%</span><span class="flex-1">{{ criterion.title }}</span><span class="shrink-0" dir="ltr">{{ criterion.score }}/{{ criterion.maximum }}</span></div>
        <div role="progressbar" :aria-label="criterion.title" :aria-valuenow="criterion.score" :aria-valuemin="0" :aria-valuemax="criterion.maximum" class="h-1.5 overflow-hidden rounded-full bg-slate-200"><div class="h-full rounded-full bg-brand" :style="{ width: `${criterion.score / criterion.maximum * 100}%` }" /></div>
      </li>
    </ul>
  </section>
  <PerformanceInfoDialog v-if="infoOpen" @close="infoOpen = false" />
</template>
