<script setup lang="ts">
import { Activity, Archive, LockKeyhole, Play } from '@lucide/vue'
defineProps<{ archived: boolean }>()
const steps = [{ label: 'إطلاق', icon: Play }, { label: 'تشغيل', icon: Activity }, { label: 'إغلاق', icon: LockKeyhole }, { label: 'أرشفة', icon: Archive }]
</script>

<template>
  <section class="flex flex-col justify-between gap-6 rounded-3xl border border-line bg-white p-6 shadow-sm xl:flex-row xl:items-center" aria-labelledby="lifecycle-title">
    <div class="shrink-0"><h3 id="lifecycle-title" class="text-sm font-bold">تسلسل دورة الحياة</h3><p class="mt-1 text-xs font-light text-muted">التدفق الإداري الموصى به لكل دورة.</p></div>
    <ol class="relative isolate grid w-full grid-cols-4 gap-2 xl:max-w-[560px] before:absolute before:inset-x-[12.5%] before:top-5 before:-z-10 before:h-0.5 before:bg-line">
      <li v-for="(step, index) in steps" :key="step.label" class="flex flex-col items-center gap-2 text-center" :aria-current="index === (archived ? 3 : 1) ? 'step' : undefined"><span class="flex size-10 items-center justify-center rounded-full" :class="index <= (archived ? 3 : 1) ? 'bg-brand text-white' : 'bg-line text-muted'"><component :is="step.icon" :size="16" /></span><span class="text-fine font-bold text-slate-600">{{ step.label }}</span></li>
    </ol>
  </section>
</template>
