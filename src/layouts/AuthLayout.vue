<script setup lang="ts">
import AuthWelcome from '../components/auth/AuthWelcome.vue'
</script>

<template>
  <main class="h-dvh overflow-hidden" dir="rtl">
    <div class="auth-shell grid h-full overflow-hidden bg-canvas">
      <AuthWelcome />
      <section class="auth-form-panel flex min-h-0 min-w-0 items-center justify-center px-5 py-4 sm:px-10" aria-labelledby="login-title">
        <slot />
      </section>
    </div>
  </main>
</template>

<style scoped>
.auth-shell { grid-template-rows: auto minmax(0, 1fr); }
@media (min-width: 1024px) {
  .auth-shell { grid-template-columns: 46% 54%; grid-template-rows: minmax(0, 1fr); }
}
@media (max-height: 600px) and (min-width: 640px) {
  .auth-shell { grid-template-columns: 40% 60%; grid-template-rows: minmax(0, 1fr); }
  .auth-form-panel { padding: 8px 20px; }
}
</style>
