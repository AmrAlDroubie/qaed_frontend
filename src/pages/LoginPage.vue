<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginForm from '../components/auth/LoginForm.vue'

const submitted = ref(false)
</script>

<template>
  <AuthLayout>
    <div class="login-content w-full max-w-md">
      <header class="login-header mb-5 flex flex-col gap-2 pb-2">
        <p class="text-xs font-bold leading-4 text-brand">تسجيل الدخول</p>
        <h1 id="login-title" class="text-3xl font-bold leading-9 tracking-[-0.8px]">أهلاً بك من جديد</h1>
        <p class="text-sm font-light leading-6 text-muted">أدخل بيانات الدخول للوصول إلى رحلة قائد الخاصة بك.</p>
      </header>
      <LoginForm @submit="submitted = true" />
      <p v-if="submitted" role="status" class="mt-5 text-sm leading-6 text-brand">
        تم التحقق من البيانات محليًا. خدمة تسجيل الدخول غير متصلة بعد.
      </p>
    </div>
  </AuthLayout>
</template>
