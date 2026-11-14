<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { AudioLines, BookOpen, CalendarDays, CircleCheck, Clock3, FileText, PencilLine, Star } from '@lucide/vue'
import type { AssignmentStatus, ParticipantAssignment } from '../../../types/assignments'
defineProps<{ assignment: ParticipantAssignment }>()
const descriptions: Record<AssignmentStatus, string> = {
  graded: 'مكتملة ومقيمة', review: 'التدوينة قيد المراجعة', available: 'متاحة الآن', upcoming: 'متاحة قريباً', overdue: 'متأخرة عن التسليم',
}
const dateFormat = new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-latn', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
</script>

<template>
  <component :is="RouterLink" :to="{ name: assignment.kind === 'journal' ? 'participant-leadership-detail' : 'participant-required-detail', params: { id: assignment.id } }" class="flex flex-col justify-between gap-5 rounded-2xl border border-line bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:flex-row lg:items-center">
    <div class="flex min-w-0 items-center gap-4"><span class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand/5 text-brand"><component :is="assignment.kind === 'journal' ? BookOpen : assignment.kind === 'listening' ? AudioLines : FileText" :size="24" aria-hidden="true" /></span><div class="min-w-0"><p class="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted"><span>{{ assignment.label ?? (assignment.kind === 'listening' ? 'تكليف سماعي' : 'تكليف قرائي') }}</span><span aria-hidden="true">·</span><span :class="{ 'font-bold text-brand': assignment.status === 'available' || assignment.status === 'upcoming' }">{{ descriptions[assignment.status] }}</span></p><h2 class="text-base font-bold leading-7">{{ assignment.title }}</h2><p class="mt-2 flex items-center gap-2 text-xs text-muted"><CalendarDays :size="14" aria-hidden="true" /><time :datetime="assignment.date">{{ dateFormat.format(new Date(`${assignment.date}T00:00:00Z`)) }}</time></p></div></div>
    <div class="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
      <template v-if="assignment.status === 'graded'"><span class="inline-flex items-center gap-1.5 rounded-full border border-brand/10 bg-brand/5 px-3 py-1.5 text-xs font-bold text-slate-600"><Star :size="14" aria-hidden="true" /><span dir="ltr">{{ assignment.score?.toFixed(1) }} / {{ assignment.maximum?.toFixed(1) }}</span></span><span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700"><CircleCheck :size="14" aria-hidden="true" />تم التسليم</span></template>
      <span v-else-if="assignment.status === 'review'" class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700"><Clock3 :size="14" aria-hidden="true" />قيد المراجعة</span>
      <template v-else>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand"><PencilLine :size="14" aria-hidden="true" />متاح للتسليم</span><span class="text-xs font-light text-muted">اضغط للتدوين</span>
      </template>
    </div>
  </component>
</template>
