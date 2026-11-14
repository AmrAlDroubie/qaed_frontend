<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff, LockKeyhole, Mail } from '@lucide/vue'

defineProps<{
  id: string
  label: string
  placeholder?: string
  password?: boolean
  autocomplete: string
  error?: string
}>()
const model = defineModel<string>({ required: true })
const visible = ref(false)
</script>

<template>
  <div class="auth-field min-h-20">
    <label :for="id" class="mb-[11px] block text-xs font-bold leading-4 text-slate-700">{{ label }}</label>
    <div class="relative">
      <component :is="password ? LockKeyhole : Mail" :size="16" aria-hidden="true" class="pointer-events-none absolute right-3 top-4 text-slate-400" />
      <input
        :id="id" v-model="model" :name="id"
        :type="password && !visible ? 'password' : 'text'"
        :autocomplete="autocomplete" :placeholder="placeholder" required
        :aria-invalid="!!error" :aria-describedby="error ? `${id}-error` : undefined"
        class="h-12 w-full rounded-2xl border border-line bg-slate-50 pr-[42px] pl-10 text-right text-sm font-light leading-5 placeholder:text-gray-400 focus:outline-none"
      />
      <button v-if="password" type="button" class="absolute left-2 top-2 flex size-8 items-center justify-center rounded-lg hover:bg-slate-200/60"
        :aria-label="`${visible ? 'إخفاء' : 'إظهار'} ${label}`" :aria-pressed="visible" :aria-controls="id" @click="visible = !visible">
        <component :is="visible ? Eye : EyeOff" :size="16" aria-hidden="true" class="text-slate-400" />
      </button>
    </div>
    <p v-if="error" :id="`${id}-error`" class="mt-1 text-xs text-red-700">{{ error }}</p>
  </div>
</template>
