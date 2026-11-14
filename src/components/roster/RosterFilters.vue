<script setup lang="ts">
import { Search } from '@lucide/vue'
import type { RosterFilter } from '../../types/roster'

const search = defineModel<string>('search', { required: true })
const role = defineModel<RosterFilter>('role', { required: true })
const filters: { value: RosterFilter; label: string }[] = [
  { value: 'all', label: 'الكل' },
  { value: 'participant', label: 'مشارك' },
  { value: 'supervisor', label: 'مشرف' },
]
</script>

<template>
  <div class="flex flex-col gap-3 rounded-[24px] border border-line bg-white px-5 py-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center">
    <label class="flex min-w-0 flex-1 items-center gap-2 rounded-[13px] border border-line bg-slate-50 px-3 text-muted">
      <Search :size="16" aria-hidden="true" />
      <span class="sr-only">ابحث بالاسم أو الدور أو MBTI</span>
      <input v-model="search" type="search" class="h-11 w-full min-w-0 bg-transparent text-xs text-ink outline-none placeholder:text-muted" placeholder="ابحث بالاسم أو الدور أو MBTI..." />
    </label>
    <div class="flex shrink-0 gap-1" role="group" aria-label="تصفية حسب الدور">
      <button v-for="filter in filters" :key="filter.value" type="button" :aria-pressed="role === filter.value" class="min-h-11 flex-1 rounded-[14px] border px-4 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" :class="role === filter.value ? 'border-brand bg-brand text-white' : 'border-line bg-white text-slate-600 hover:bg-slate-100'" @click="role = filter.value">{{ filter.label }}</button>
    </div>
  </div>
</template>
