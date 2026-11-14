<script setup lang="ts">
import { MessageCircle } from '@lucide/vue'
import type { PublicProfile } from '../../data/publicProfiles'
import { rosterRoleLabels } from '../../types/roster'
defineProps<{ profile: PublicProfile }>()
</script>

<template>
  <header class="flex flex-col justify-between gap-6 bg-gradient-to-br from-brand to-[#2a8c82] p-6 text-white sm:flex-row sm:items-center">
    <div class="flex items-center gap-4"><img :src="profile.avatar" :alt="profile.name" width="54" height="54" class="size-14 rounded-2xl border border-white/60 object-cover" /><div><p class="mb-2 text-xs font-light text-white/65">{{ rosterRoleLabels[profile.role] }}</p><h2 class="text-2xl font-bold">{{ profile.name }}</h2><div class="mt-3 flex flex-wrap gap-2"><span v-if="profile.mbti" class="rounded-full bg-white/15 px-3 py-1.5 text-xs" dir="ltr">{{ profile.mbti }}</span><span class="rounded-full bg-white/15 px-3 py-1.5 text-xs">مجتمع قائد</span></div></div></div>
    <button type="button" disabled title="رقم التواصل غير متوفر في البيانات الحالية" class="inline-flex min-h-12 cursor-default! items-center justify-center gap-3 self-start rounded-2xl bg-white px-5 py-3 text-sm font-bold text-brand sm:self-auto"><MessageCircle :size="18" aria-hidden="true" />تواصل عبر WhatsApp</button>
  </header>
</template>
