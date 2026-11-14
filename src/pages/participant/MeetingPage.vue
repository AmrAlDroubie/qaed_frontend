<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight } from '@lucide/vue'
import { participantMeetings } from '../../data/meetings'
import { participantTasks, type ParticipantTask } from '../../data/participant'
import { useParticipantStore } from '../../stores/participant'
import AttendanceConfirmationDialog from '../../components/participant/attendance/AttendanceConfirmationDialog.vue'
import MeetingDetails from '../../components/participant/MeetingDetails.vue'
import MeetingAgenda from '../../components/participant/MeetingAgenda.vue'
import PendingTaskCard from '../../components/participant/PendingTaskCard.vue'
import TaskSubmissionDialog from '../../components/participant/TaskSubmissionDialog.vue'
const route = useRoute()
const store = useParticipantStore()
const meeting = computed(() => participantMeetings.find(item => String(item.week) === route.params.week))
const tasks = computed(() => meeting.value?.taskIds.flatMap(id => {
  const task = participantTasks.find(item => item.id === id)
  return task ? [task] : []
}) ?? [])
const selected = ref<ParticipantTask | null>(null)
const notice = ref('')
const attendanceAction = ref<'attendance' | 'departure' | null>(null)
watch(() => route.params.week, () => { selected.value = null; attendanceAction.value = null; notice.value = '' })
function attend() {
  if (!meeting.value || store.departureTimes[meeting.value.week]) return
  attendanceAction.value = store.attendance[meeting.value.week] ? 'departure' : 'attendance'
}
function confirmAttendance() {
  if (!meeting.value || !attendanceAction.value) return
  if (attendanceAction.value === 'departure') {
    store.depart(meeting.value.week)
    notice.value = 'تم تسجيل انصرافك لهذا اللقاء محليًا.'
  } else {
    store.attend(meeting.value.week)
    notice.value = 'تم تسجيل حضورك لهذا اللقاء محليًا.'
  }
  attendanceAction.value = null
}
function submit(text: string, fileName: string) {
  if (!selected.value) return
  store.submit(selected.value.id, text, fileName)
  selected.value = null
  notice.value = 'تم حفظ تسليمك محليًا، وبانتظار التقييم.'
}
</script>

<template>
  <div v-if="meeting" class="mx-auto w-full max-w-[1440px] space-y-4 pb-4" dir="rtl">
    <header class="pb-5">
      <RouterLink to="/participant" aria-label="العودة إلى اللوحة الرئيسية" class="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-white text-muted hover:text-brand"><ChevronRight :size="18" /></RouterLink>
      <div class="pb-3 text-center"><p class="text-sm font-bold text-brand">{{ meeting.label }}</p><h1 class="mt-2 text-4xl font-bold leading-tight">{{ meeting.title }}</h1></div>
    </header>
    <MeetingDetails :meeting="meeting" :attended="Boolean(store.attendance[meeting.week])" :departed="Boolean(store.departureTimes[meeting.week])" @attend="attend" />
    <p v-if="notice" role="status" class="rounded-xl border border-brand/10 bg-brand/5 p-3 text-sm text-brand">{{ notice }}</p>
    <MeetingAgenda :items="meeting.agenda" />
    <section class="rounded-3xl border border-line bg-white p-5" aria-labelledby="weekly-tasks-title">
      <header class="mb-5 flex items-center justify-between gap-3"><div><h2 id="weekly-tasks-title" class="text-lg font-bold">تكاليف الأسبوع</h2><p class="mt-2 text-sm font-light text-muted">انقر على أي بطاقة لفتح نافذة التسليم</p></div><span class="rounded-full border border-line bg-slate-100 px-3 py-1.5 text-xs text-slate-600">{{ tasks.length }} تكاليف</span></header>
      <div v-if="tasks.length" class="grid gap-3 md:grid-cols-2"><PendingTaskCard v-for="task in tasks" :key="task.id" :task="task" :submitted="Boolean(store.submissions[task.id])" @open="selected = task" /></div>
      <p v-else class="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-muted">لا توجد تكاليف مضافة لهذا الأسبوع حاليًا.</p>
    </section>
    <AttendanceConfirmationDialog v-if="attendanceAction" :action="attendanceAction" @close="attendanceAction = null" @confirm="confirmAttendance" />
    <TaskSubmissionDialog v-if="selected" :task="selected" @close="selected = null" @submit="submit" />
  </div>
  <section v-else class="rounded-3xl border border-line bg-white p-10 text-center" dir="rtl"><h1 class="text-2xl font-bold">اللقاء غير موجود</h1><p class="my-4 text-base text-muted">اختر أسبوعًا من خارطة الأسابيع.</p><RouterLink to="/participant" class="text-base font-bold text-brand">العودة إلى اللوحة الرئيسية</RouterLink></section>
</template>
