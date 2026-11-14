<script setup lang="ts">
import AssignmentScoreCard from './AssignmentScoreCard.vue'
defineProps<{ score: number; maximum: number; weight: number }>()
</script>

<template>
  <section class="flex flex-col justify-between gap-6 rounded-[28px] border border-line bg-white p-5 shadow-sm sm:p-7 xl:flex-row xl:items-center" aria-labelledby="required-assignments-title">
    <div><div class="mb-4 flex flex-wrap items-center gap-3"><span class="rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand">التكاليف الإلزامية</span><span class="text-xs font-light text-muted">القرائية والسماعية</span></div><h1 id="required-assignments-title" class="text-3xl font-bold leading-tight sm:text-4xl">أنجز ما يثري رحلتك</h1></div>
    <AssignmentScoreCard label="التكاليف الإلزامية" :score="score" :maximum="maximum" :weight="weight" class="w-full shrink-0 !p-5 xl:w-[310px]" />
  </section>
</template>
