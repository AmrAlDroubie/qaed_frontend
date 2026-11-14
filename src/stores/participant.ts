import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { participantMeetings } from '../data/meetings'
import { participantTasks } from '../data/participant'

export const useParticipantStore = defineStore('participant', () => {
  const attendance = ref<Record<number, boolean>>({})
  const arrivalTimes = ref<Record<number, string>>({})
  const departureTimes = ref<Record<number, string>>({})
  function attend(week: number) {
    if (!participantMeetings.some(meeting => meeting.week === week) || attendance.value[week]) return
    attendance.value[week] = true
    arrivalTimes.value[week] = new Date().toISOString()
  }
  function depart(week: number) {
    if (!attendance.value[week] || departureTimes.value[week]) return
    departureTimes.value[week] = new Date().toISOString()
  }
  const submissions = ref<Record<string, { text: string; fileName: string }>>({})
  const pendingTasks = computed(() => participantTasks.filter(task => !submissions.value[task.id]))
  function submit(id: string, text: string, fileName: string) {
    if (!participantTasks.some(task => task.id === id) || (!text.trim() && !fileName)) return
    submissions.value[id] = { text: text.trim(), fileName }
  }
  return { pendingTasks, submissions, submit, attendance, attend, arrivalTimes, departureTimes, depart }
})
