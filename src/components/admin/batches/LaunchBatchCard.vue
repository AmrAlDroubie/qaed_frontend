<script setup lang="ts">
import { CopyCheck, FilePlus2, Rocket, Sparkles } from '@lucide/vue'
import type { BatchPlanMode } from '../../../types/batches'
const mode = defineModel<BatchPlanMode>({ required: true })
defineEmits<{ launch: [] }>()
const options = [
  { value: 'empty' as const, title: 'خطة فارغة', description: 'ابدأ بتصميم الأسابيع والمهام بشكل مستقل.', icon: FilePlus2 }
]
</script>

<template>
  <section class="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6" aria-labelledby="launch-title">
    <header class="flex items-start justify-between gap-3">
      <div><span
          class="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-fine font-bold text-brand">
          <Sparkles :size="14" />مساحة إطلاق جديدة
        </span>
        <h3 id="launch-title" class="text-2xl font-bold leading-8">إطلاق دورة تدريبية جديدة</h3>
        <p class="mt-1 text-sm font-light leading-5 text-muted">ابدأ دفعة جديدة مع إعادة استخدام الخطة أو بناء خطة من
          الصفر.</p>
      </div><span class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Rocket :size="24" />
      </span>
    </header>
    <fieldset class=" space-y-3">
      <legend class="sr-only">خطة الدورة الجديدة</legend>
      <label v-for="option in options" :key="option.value"
        class="flex cursor-pointer items-center gap-3 rounded-2xl border bg-slate-50 p-4 transition-colors focus-within:ring-2 focus-within:ring-brand/30"
        :class="mode === option.value ? 'border-brand/40' : 'border-line'">
        <input v-model="mode" type="radio" name="batch-plan" :value="option.value" class="sr-only" />
        <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600">
          <component :is="option.icon" :size="20" />
        </span>
        <span><span class="block text-sm font-bold text-slate-800">{{ option.title }}</span><span
            class="mt-1 block text-xs font-light leading-5 text-muted">{{ option.description }}</span></span>
      </label>
    </fieldset>
    <button type="button"
      class="flex min-h-12 mt-auto items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brand-dark"
      @click="$emit('launch')">
      <Rocket :size="20" />إطلاق دورة جديدة (دفعة جديدة)
    </button>
  </section>
</template>
