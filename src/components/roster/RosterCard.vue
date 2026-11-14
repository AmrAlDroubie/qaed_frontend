<script setup lang="ts">
import { ChevronLeft } from '@lucide/vue'
import { rosterRoleLabels, type RosterMember } from '../../types/roster'
defineProps<{ member: RosterMember }>()
</script>

<template>
  <RouterLink :to="{ name: 'public-profile', params: { id: member.id } }"
    class="group flex min-h-[186px] flex-col items-center justify-center gap-[11px] rounded-[22px] border bg-white px-[17px] py-[19px] text-center transition-shadow hover:ring-[3px] hover:ring-brand focus-visible:ring-[3px] focus-visible:ring-brand"
    :class="member.role === 'supervisor' ? 'border-brand ring-[3px] ring-inset ring-brand' : 'border-line'"
    :aria-label="`عرض الملف العام: ${member.name}، ${rosterRoleLabels[member.role]}`">
    <img :src="member.avatar" alt="" width="78" height="78" class="size-[78px] rounded-[15px] object-cover" />
    <div>
      <h2 class="text-label font-bold leading-6">{{ member.name }}</h2>
      <p class="mt-1 text-fine font-light leading-5 text-muted">{{ member.bio }}</p>
    </div>
    <span class="inline-flex items-center justify-center gap-3 text-fine text-muted group-hover:text-brand">
      عرض الملف العام <ChevronLeft :size="13" aria-hidden="true" />
    </span>
  </RouterLink>
</template>
