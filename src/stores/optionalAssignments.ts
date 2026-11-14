import { ref } from 'vue'
import { defineStore } from 'pinia'
import { optionalAssignments } from '../data/optionalAssignments'

export const useOptionalAssignmentsStore = defineStore('optional-assignments', () => {
  const favoriteIds = ref<string[]>([])
  function toggleFavorite(id: string) {
    if (!optionalAssignments.some(assignment => assignment.id === id)) return
    favoriteIds.value = favoriteIds.value.includes(id) ? favoriteIds.value.filter(item => item !== id) : [...favoriteIds.value, id]
  }
  return { favoriteIds, toggleFavorite }
})
