<script setup lang="ts">
import { CalendarDays } from '@lucide/vue'
import type { AttendanceMeeting } from '../../../data/attendance'
import { downloadMeetingCalendar } from '../../../utils/meetingCalendar'
defineProps<{ meetings: AttendanceMeeting[] }>()
const dateFormat = new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
function timeLabel(time: string) {
  const [hours, minutes] = time.split(':')
  const hour = Number(hours)
  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'م' : 'ص'}`
}
</script>

<template>
  <section class="min-w-0 overflow-hidden rounded-3xl border border-line bg-white pb-10 sm:pb-20" aria-labelledby="attendance-meetings-title">
    <header class="flex flex-wrap items-center justify-between gap-4 p-6"><div><h2 id="attendance-meetings-title" class="text-base font-bold">قائمة اللقاءات</h2><p class="mt-1 text-xs font-light text-muted">كل اللقاءات المؤكدة والقادمة</p></div><button type="button" class="min-h-11 rounded-xl border border-line px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50" @click="downloadMeetingCalendar(meetings)">إضافة كل اللقاءات للتقويم</button></header>
    <div class="overflow-x-auto" tabindex="0" role="region" aria-label="جدول اللقاءات، يمكن تمريره أفقيًا">
      <table class="w-full min-w-[760px] border-collapse text-right"><caption class="sr-only">مواعيد اللقاءات ودرجات الحضور</caption><thead class="bg-slate-50 text-xs text-muted"><tr><th v-for="title in ['اللقاء', 'التاريخ', 'وقت الوصول', 'وقت الانصراف', 'الدرجة', 'إضافة اللقاء للتقويم']" :key="title" scope="col" class="whitespace-nowrap px-4 py-4 font-normal">{{ title }}</th></tr></thead>
        <tbody class="text-sm"><tr v-for="meeting in meetings" :key="meeting.id" class="border-t border-slate-100"><th scope="row" class="px-4 py-4 font-bold text-slate-600">{{ meeting.title }}</th><td class="whitespace-nowrap px-4 py-4"><time :datetime="meeting.date">{{ dateFormat.format(new Date(`${meeting.date}T00:00:00Z`)) }}</time></td><td class="whitespace-nowrap px-4 py-4">{{ timeLabel(meeting.arrival) }}</td><td class="whitespace-nowrap px-4 py-4"><span v-if="meeting.departure">{{ timeLabel(meeting.departure) }}</span><span v-else class="text-brand" aria-label="لم يُسجل وقت الانصراف">—</span></td><td class="px-4 py-4"><span v-if="meeting.score !== null" dir="ltr">{{ meeting.score }}/10</span><span v-else class="text-brand" aria-label="لم تُرصد الدرجة">—</span></td><td class="px-4 py-3"><button type="button" class="flex min-h-11 items-center gap-2 whitespace-nowrap rounded-2xl border border-line px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50" :aria-label="`إضافة ${meeting.title} للتقويم`" @click="downloadMeetingCalendar([meeting])"><CalendarDays :size="14" aria-hidden="true" />إضافة للتقويم</button></td></tr></tbody>
      </table>
    </div>
  </section>
</template>
