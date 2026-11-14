<script setup lang="ts">
import { Check, LogIn, LogOut } from '@lucide/vue'
import type { ParticipantMeeting } from '../../data/meetings'
defineProps<{ meeting: ParticipantMeeting; attended: boolean; departed: boolean }>()
defineEmits<{ attend: [] }>()
</script>

<template>
  <section aria-label="تفاصيل اللقاء والحضور" class="grid gap-2 rounded-3xl border border-line bg-white p-3 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr]">
    <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:col-span-2 xl:col-span-1">
      <h2 class="text-sm text-muted">تاريخ ووقت اللقاء</h2>
      <div class="flex flex-wrap items-center gap-1.5"><span class="rounded-lg bg-slate-600 px-3 py-2 text-sm font-bold text-white" dir="ltr">{{ meeting.startTime }} → {{ meeting.endTime }}</span><time :datetime="meeting.date" class="rounded-lg bg-brand px-3 py-2 text-sm font-bold text-white" dir="ltr">{{ meeting.date.split('-').reverse().join(' / ') }}</time></div>
    </div>
    <div class="flex flex-col justify-center rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"><h2 class="text-sm text-muted">مكان اللقاء</h2><p class="mt-1 text-base font-bold">{{ meeting.location }}</p></div>
    <button type="button" :disabled="departed" class="flex min-h-[72px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-bold text-white disabled:cursor-default disabled:bg-brand/10 disabled:text-brand" :class="attended && !departed ? 'bg-[#dd5353] hover:bg-red-600' : 'bg-brand hover:bg-brand-dark'" @click="$emit('attend')"><component :is="departed ? Check : attended ? LogOut : LogIn" :size="20" />{{ departed ? 'تم تسجيل الانصراف' : attended ? 'تسجيل الانصراف' : 'تسجيل الحضور' }}</button>
  </section>
</template>
