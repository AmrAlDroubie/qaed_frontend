<script setup lang="ts">
import { BadgeCheck, BookOpenCheck, CalendarClock, Check, ClipboardCheck, FilePlus2 } from '@lucide/vue'
import { supervisorRoles } from '../../data/supervisorRoles'
import type { SupervisorRole } from '../../types/admin'
const model = defineModel<SupervisorRole[]>({ required: true })
const appearances = {
  logbook: { icon: BookOpenCheck, color: 'bg-violet-50 text-violet-600' },
  assignments: { icon: ClipboardCheck, color: 'bg-rose-50 text-rose-500' },
  attendance: { icon: CalendarClock, color: 'bg-amber-50 text-amber-600' },
  content: { icon: FilePlus2, color: 'bg-slate-100 text-slate-600' },
  initiatives: { icon: BadgeCheck, color: 'bg-emerald-50 text-emerald-600' },
}
</script>

<template>
  <fieldset>
    <legend class="sr-only">تحديد الأدوار الفرعية للمشرف</legend>
    <div class="mb-3 flex items-center justify-between gap-3">
      <div><h3 class="text-table font-bold text-slate-800">تحديد الأدوار الفرعية للمشرف</h3><p class="mt-1 text-fine font-light text-muted">يمكنك تعيين أكثر من دور للمشرف نفسه.</p></div>
      <span aria-live="polite" class="shrink-0 rounded-full bg-indigo-100 px-2 py-1 text-fine font-bold text-indigo-800">{{ model.length }} أدوار</span>
    </div>
    <div class="grid gap-3 sm:grid-cols-2">
      <label v-for="role in supervisorRoles" :key="role.id" class="relative cursor-pointer" :class="{ 'sm:col-span-2': role.id === 'initiatives' }">
        <input v-model="model" type="checkbox" :value="role.id" class="peer sr-only" />
        <span class="flex min-h-[67px] items-center gap-3 rounded-[14px] border border-line p-3.5 transition-colors peer-checked:border-indigo-400 peer-checked:bg-indigo-50/60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-[11px]" :class="appearances[role.id].color"><component :is="appearances[role.id].icon" :size="18" aria-hidden="true" /></span>
          <span class="min-w-0 flex-1"><span class="block text-table font-bold leading-5">{{ role.label }}</span><span class="mt-1 block text-right text-fine font-light leading-4 text-muted" dir="ltr">{{ role.description }}</span></span>
          <Check v-if="model.includes(role.id)" :size="16" class="shrink-0 text-indigo-600" aria-hidden="true" />
        </span>
      </label>
    </div>
  </fieldset>
</template>
