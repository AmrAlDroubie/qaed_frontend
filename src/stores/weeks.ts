import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createWeekFixtures } from '../data/weeks'
import type { TrainingWeek, WeekDraft } from '../types/weeks'

export const useWeeksStore = defineStore('weeks', () => {
  const weeks = ref(createWeekFixtures())
  const cohortYear = ref(2027)
  let previewPlan = createWeekFixtures()
  const currentWeeks = computed(() => weeks.value.filter(week => !week.archived))
  const statistics = computed(() => ({
    completed: currentWeeks.value.filter(week => week.status === 'completed').length,
    active: currentWeeks.value.filter(week => week.status === 'active').length,
    upcoming: currentWeeks.value.filter(week => week.status === 'upcoming').length,
    assignments: currentWeeks.value.reduce((total, week) => total + week.assignmentCount, 0),
  }))
  function addWeek() {
    const number = Math.max(0, ...weeks.value.map(week => week.number)) + 1
    const week: TrainingWeek = { id: crypto.randomUUID(), number, title: `الأسبوع ${number}`, objective: '', status: 'upcoming', archived: false, assignmentCount: 0, date: '', location: '', startTime: '', endTime: '', agenda: [] }
    weeks.value.push(week)
    return week
  }
  function updateWeek(id: string, draft: WeekDraft) {
    const week = weeks.value.find(item => item.id === id)
    if (week) Object.assign(week, draft, { agenda: draft.agenda.map(item => ({ ...item })) })
  }
  function toggleArchive(id: string) {
    const week = weeks.value.find(item => item.id === id)
    if (week) week.archived = !week.archived
  }
  function activateCohort(year: number, plan: TrainingWeek[]) {
    cohortYear.value = year
    weeks.value = plan
    previewPlan = plan.map(week => ({ ...week, agenda: week.agenda.map(item => ({ ...item })) }))
  }
  function resetPreview() {
    weeks.value.splice(0, weeks.value.length, ...previewPlan.map(week => ({ ...week, agenda: week.agenda.map(item => ({ ...item })) })))
  }
  return { weeks, cohortYear, currentWeeks, statistics, addWeek, updateWeek, toggleArchive, resetPreview, activateCohort }
})
