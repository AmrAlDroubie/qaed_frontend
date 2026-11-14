<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import AuthField from './AuthField.vue'

const emit = defineEmits<{ submit: [credentials: { identifier: string; password: string }] }>()
const identifier = ref('')
const password = ref('')
const attempted = ref(false)
const identifierError = computed(() => {
  if (!attempted.value) return ''
  const value = identifier.value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\+?[\d\s()-]{7,20}$/.test(value)
    ? '' : 'أدخل بريدًا إلكترونيًا أو رقم جوال صحيحًا.'
})
function submit() {
  attempted.value = true
  emit('submit', { identifier: identifier.value.trim(), password: password.value })
}
</script>

<template>
  <form class="login-form rounded-3xl border border-line bg-white p-6 shadow-form" @submit.prevent="submit">
    <div class="flex flex-col gap-3">
      <AuthField id="identifier" v-model="identifier" label="البريد الإلكتروني أو رقم الجوال"
        placeholder="example@email.com أو  xxxxxxxx" autocomplete="username" :error="identifierError" />
      <AuthField id="password" v-model="password" label="كلمة المرور" placeholder="••••••••"
        autocomplete="current-password" password />
    </div>
    <button type="submit"
      class="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 text-sm font-bold leading-5 text-white shadow-button transition-colors hover:bg-brand-dark">
      <span>تسجيل الدخول</span>
      <ArrowLeft :size="16" aria-hidden="true" />
    </button>
  </form>
</template>
