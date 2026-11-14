<script setup lang="ts">
import { ExternalLink, Globe } from '@lucide/vue'
import type { PublicProfile } from '../../data/publicProfiles'
defineProps<{ profile: PublicProfile }>()
const links = ['LinkedIn', 'Instagram', 'Website']
</script>

<template>
  <div class="grid md:grid-cols-[0.4fr_0.6fr]">
    <section class="p-6" aria-labelledby="public-profile-bio"><h2 id="public-profile-bio" class="text-lg font-bold">نبذة</h2><p class="mt-4 text-sm font-light leading-7 text-muted">{{ profile.bio }}</p><div class="mt-5 grid gap-5 sm:grid-cols-2"><section><h3 class="text-sm font-bold">المهارات</h3><ul class="mt-3 flex flex-wrap gap-2"><li v-for="skill in profile.skills" :key="skill" class="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-600">{{ skill }}</li></ul></section><section v-if="profile.hobbies.length"><h3 class="text-sm font-bold">الهوايات</h3><ul class="mt-3 flex flex-wrap gap-2"><li v-for="hobby in profile.hobbies" :key="hobby" class="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-600">{{ hobby }}</li></ul></section></div></section>
    <section class="border-t border-slate-100 p-6 md:border-r md:border-t-0" aria-labelledby="public-profile-links"><h2 id="public-profile-links" class="mb-4 text-sm font-bold">روابط التواصل</h2><ul class="space-y-2"><li v-for="label in links" :key="label"><button type="button" disabled :aria-label="`${label} — الرابط غير متوفر`" title="الرابط غير متوفر في البيانات الحالية" class="grid min-h-11 w-full cursor-default! grid-cols-[20px_1fr_20px] items-center gap-3 rounded-2xl border border-line px-3 py-2 text-xs font-bold text-ink"><span><Globe v-if="label === 'Website'" :size="16" aria-hidden="true" /></span><span dir="ltr">{{ label }}</span><ExternalLink :size="14" aria-hidden="true" /></button></li></ul></section>
  </div>
</template>
