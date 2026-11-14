<script setup lang="ts">
defineProps<{ label: string; score: number; maximum: number; weight: string | number }>()
</script>

<template>
  <div class="rounded-2xl border border-brand/15 bg-gradient-to-br from-white via-brand/15 to-white p-4">
    <div class="mb-3 flex items-center gap-3 text-sm font-bold"><span class="rounded-full border border-line bg-slate-100 px-3 py-1 text-slate-600">{{ weight }}</span><span class="flex-1">{{ label }}</span><span dir="ltr">{{ score }}/{{ maximum }}</span></div>
    <div role="progressbar" :aria-label="`درجة ${label}`" :aria-valuenow="score" :aria-valuemin="0" :aria-valuemax="maximum" class="h-2.5 overflow-hidden rounded-full bg-white"><div class="h-full rounded-full bg-brand" :style="{ width: `${maximum ? score / maximum * 100 : 0}%` }" /></div>
  </div>
</template>
