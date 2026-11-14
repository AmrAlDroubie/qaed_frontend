<script setup lang="ts">
import { Check, Clock3, X } from '@lucide/vue'
const rules = [
  { label: 'حضور طبيعي', score: '1.0 درجة', description: 'في حال كان التأخر إلى 15د', icon: Check, color: 'bg-emerald-50 text-brand' },
  { label: 'تأخر', score: '0.5 درجة', description: 'في حال كان التأخر بين 15 - 40د', icon: Clock3, color: 'bg-amber-50 text-amber-600' },
  { label: 'غياب', score: '0 درجة', description: 'في حال تجاوز التأخر أكثر من 40د', icon: X, color: 'bg-brand/8 text-slate-600' },
]
</script>

<template>
  <div class="space-y-2">
    <section class="flex flex-col gap-4 rounded-3xl border border-line bg-white p-4 2xl:flex-row 2xl:items-center" aria-labelledby="attendance-rules-title">
      <div class="shrink-0"><h2 id="attendance-rules-title" class="text-lg font-bold">كيف تُحتسب درجة الحضور؟</h2><p class="mt-1 text-sm font-light text-muted">حالة الحضور مرتبطة بوقت تسجيل الدخول</p></div>
      <dl class="grid flex-1 gap-3 sm:grid-cols-3"><div v-for="rule in rules" :key="rule.label" class="flex items-center gap-3 rounded-2xl border border-line p-3"><span class="flex min-h-16 w-10 shrink-0 items-center justify-center rounded-2xl" :class="rule.color"><component :is="rule.icon" :size="18" aria-hidden="true" /></span><div><dt class="text-xs text-muted">{{ rule.label }}</dt><dd class="mt-1 text-base font-bold">{{ rule.score }}</dd><dd class="mt-1 text-xs leading-5 text-muted">{{ rule.description }}</dd></div></div></dl>
    </section>
    <aside class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-2" aria-label="سياسة الحضور"><h2 class="text-base font-bold">سياسة مهمة</h2><div class="flex flex-wrap gap-3 text-sm"><span class="flex items-center gap-2 rounded-xl border border-line px-2 py-1"><span class="rounded-lg bg-amber-50 p-2 text-amber-600"><Clock3 :size="16" /></span>3 تأخرات = غياب</span><span class="flex items-center gap-2 rounded-xl border border-line px-2 py-1"><span class="rounded-lg bg-brand/8 p-2 text-slate-600"><X :size="16" /></span>3 غيابات = استبعاد</span></div></aside>
  </div>
</template>
