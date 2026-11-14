<script setup lang="ts">
import { Sparkles } from '@lucide/vue';
</script>

<template>
  <aside
    class="welcome-panel relative flex min-h-0 flex-col justify-between overflow-hidden px-6 py-4 text-white lg:p-10"
    aria-label="برنامج قائد">
    <div class="flex h-12 items-center gap-3">
      <div class="logo-window relative h-14 w-[34px] shrink-0 overflow-hidden">
        <img src="/assets/auth/logo.png" alt="شعار قائد" class="absolute top-0 h-full max-w-none" />
      </div>
      <div>
        <p class="text-lg font-bold leading-7">برنامج قائد</p>
        <p class="text-fine font-medium leading-[16.5px] text-white/70">اكتشاف . تأهيل . تمكين</p>
      </div>
    </div>

    <div class="welcome-content relative hidden flex-col items-start gap-5 lg:flex">
      <div class="circle circle-small" aria-hidden="true" />
      <div class="circle circle-large" aria-hidden="true" />
      <div
        class="relative flex h-[30px] items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 text-xs font-medium leading-4">
        <Sparkles :size="14" aria-hidden="true" />
        <span class="border border-white/15">رحلة قيادية متكاملة</span>
      </div>
      <h2 class="relative text-4xl font-bold leading-[1.15] sm:text-5xl sm:leading-[48px]">
        مرحبًا بك في<br /><span class="text-mint">رحلتك القيادية</span>
      </h2>
      <p class="relative pb-3 text-sm font-light leading-8 text-white/75">
        منصة واحدة تجمع التعلّم، التطبيق، التأمل، وقياس الأثر. ابدأ من هنا، وابنِ نسختك القيادية خطوة بخطوة.
      </p>
    </div>
    <div class="hidden h-4 lg:block" aria-hidden="true" />
  </aside>
</template>

<style scoped>
.welcome-panel {
  background: linear-gradient(122.78deg, var(--color-brand) 14.644%, var(--color-brand-dark) 85.356%);
}

.logo-window img {
  width: 230.38%;
  left: -0.52%;
}

.circle {
  position: absolute;
  border: 0.8px solid rgb(255 255 255 / 10%);
  border-radius: 50%;
  pointer-events: none;
}

.circle-small {
  width: 160px;
  height: 160px;
  right: -40px;
  top: -48px;
}

.circle-large {
  width: 224px;
  height: 224px;
  left: -64px;
  top: 122px;
}
</style>
