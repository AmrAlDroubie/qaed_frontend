<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
defineProps<{ total: number; shown: number; pages: number }>()
const page = defineModel<number>({ required: true })
</script>

<template>
  <footer class="flex items-center justify-between border-t border-line bg-slate-50/70 px-6 py-4 text-xs text-muted">
    <p>عرض {{ shown }} من {{ total }} حساباً</p>
    <div class="flex items-center gap-2">
      <button type="button" aria-label="الصفحة السابقة" :disabled="page <= 1" class="flex size-9 items-center justify-center rounded-lg border border-line bg-white disabled:cursor-not-allowed disabled:opacity-40" @click="page--"><ChevronRight :size="16" /></button>
      <span class="flex h-8 min-w-7 items-center justify-center rounded-lg bg-brand px-2 font-bold text-white" aria-current="page">{{ page }}</span>
      <button type="button" aria-label="الصفحة التالية" :disabled="page >= pages" class="flex size-9 items-center justify-center rounded-lg border border-line bg-white disabled:cursor-not-allowed disabled:opacity-40" @click="page++"><ChevronLeft :size="16" /></button>
    </div>
  </footer>
</template>
