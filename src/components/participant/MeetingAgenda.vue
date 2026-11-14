<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <section class="rounded-3xl border border-line bg-white p-5" aria-labelledby="meeting-agenda-title">
    <h2 id="meeting-agenda-title" class="text-lg font-bold">جدول اللقاء</h2>
    <p class="mb-4 mt-2 text-sm font-light text-muted">توقيتات الجلسة لهذا الأسبوع</p>
    <ol class="space-y-3">
      <li v-for="(item, index) in items" :key="index" class="relative flex items-center gap-4">
        <span class="relative flex w-7 shrink-0 self-stretch items-center justify-center" aria-hidden="true"><span v-if="index < items.length - 1" class="absolute bottom-[-45px] top-1/2 w-px bg-line" /><span class="relative size-6 rounded-full border-4 border-white bg-brand p-1 shadow-sm"><span class="block size-full rounded-full bg-white" /></span></span>
        <p class="flex min-h-[66px] flex-1 items-center rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-base font-bold">{{ item }}</p>
      </li>
    </ol>
  </section>
</template>
