<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowRight, Clock3 } from '@lucide/vue'
import ProgramSectionTabs from '../components/admin/ProgramSectionTabs.vue'

const route = useRoute()
const title = computed(() => String(route.meta.pageTitle || 'هذه الصفحة'))
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px]" dir="rtl">
    <ProgramSectionTabs v-if="route.meta.programSection" />
    <section class="flex min-h-[60dvh] flex-col items-center justify-center rounded-3xl border border-line bg-white px-6 py-12 text-center" aria-labelledby="coming-soon-title">
      <span class="mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-brand"><Clock3 :size="32" aria-hidden="true" /></span>
      <p class="mb-2 text-sm font-bold text-brand">{{ title }}</p>
      <h1 id="coming-soon-title" class="text-3xl font-bold">قريبًا</h1>
      <p class="mt-4 max-w-md text-base leading-7 text-muted">سيتم تطوير هذه الصفحة وإتاحتها لاحقًا. نعمل على استكمال أقسام منصة قائد.</p>
      <RouterLink :to="String(route.meta.homePath || '/admin')" class="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark"><ArrowRight :size="18" aria-hidden="true" />العودة إلى الصفحة الرئيسية</RouterLink>
    </section>
  </div>
</template>
