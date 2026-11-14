<script setup lang="ts">
import { GraduationCap, ShieldCheck } from '@lucide/vue'
import type { AccountRole } from '../../types/admin'
const model = defineModel<AccountRole>({ required: true })
const options = [
  { value: 'participant' as const, label: 'مشارك (طالب)', description: 'حساب للمشارك بدون صلاحيات إشرافية.', icon: GraduationCap, color: 'bg-emerald-100 text-emerald-700' },
  { value: 'supervisor' as const, label: 'مشرف', description: 'حساب إشرافي مع أدوار فرعية قابلة للتخصيص.', icon: ShieldCheck, color: 'bg-indigo-100 text-indigo-600' },
]
</script>

<template>
  <fieldset>
    <legend class="mb-2.5 text-table font-bold text-slate-800">نوع الحساب</legend>
    <div class="grid gap-3 sm:grid-cols-2">
      <label v-for="option in options" :key="option.value" class="relative cursor-pointer">
        <input v-model="model" type="radio" name="account-type" :value="option.value" required class="peer sr-only" />
        <span class="flex min-h-[70px] items-center gap-3 rounded-[15px] border border-line p-3.5 transition-colors peer-checked:border-indigo-400 peer-checked:bg-indigo-50/60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-[11px]" :class="option.color"><component :is="option.icon" :size="18" aria-hidden="true" /></span>
          <span><span class="block text-table font-bold leading-5">{{ option.label }}</span><span class="mt-1 block text-fine font-light leading-4 text-muted">{{ option.description }}</span></span>
        </span>
      </label>
    </div>
  </fieldset>
</template>
