<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight } from '@lucide/vue'
import { publicProfiles } from '../../data/publicProfiles'
import PublicProfileBanner from '../../components/profile/PublicProfileBanner.vue'
import PublicProfileDetails from '../../components/profile/PublicProfileDetails.vue'
const route = useRoute()
const profile = computed(() => publicProfiles.find(member => member.id === route.params.id))
</script>

<template>
  <div v-if="profile" class="mx-auto w-full max-w-[1440px] pb-8 pt-5" dir="rtl">
    <header class="mb-6"><RouterLink to="/roster" class="mb-3 inline-flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3 text-xs font-bold text-slate-600 hover:text-brand"><ChevronRight :size="16" aria-hidden="true" />العودة</RouterLink><h1 class="text-3xl font-bold leading-tight">بروفايل {{ profile.name }}</h1></header>
    <article class="overflow-hidden rounded-3xl border border-line bg-white"><PublicProfileBanner :profile="profile" /><PublicProfileDetails :profile="profile" /></article>
  </div>
</template>
