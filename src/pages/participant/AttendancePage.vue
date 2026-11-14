<script setup lang="ts">
import AssignmentScoreCard from '../../components/participant/assignments/AssignmentScoreCard.vue'
import AttendanceRules from '../../components/participant/attendance/AttendanceRules.vue'
import AttendanceMeetingsTable from '../../components/participant/attendance/AttendanceMeetingsTable.vue'
import { attendanceMeetings } from '../../data/attendance'
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] space-y-5 pb-8 pt-4 sm:px-2" dir="rtl">
    <header class="flex flex-col justify-between gap-5 pb-1 sm:flex-row sm:items-center"><div><p class="text-xs font-bold text-brand">اللقاءات والجدولة</p><h1 class="mt-2 text-3xl font-bold leading-tight">الحضور، المواعيد، والانضباط</h1><p class="mt-3 text-sm font-light leading-6 text-muted">تأكد من حضورك، وأضف اللقاءات إلى تقويمك لتبقى في المسار.</p></div><AssignmentScoreCard label="الحضور" :score="9" :maximum="10" weight="25%" class="w-full shrink-0 sm:w-[260px]" /></header>
    <AttendanceRules />
    <AttendanceMeetingsTable :meetings="attendanceMeetings" />
  </div>
</template>
