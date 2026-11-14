import { ref } from 'vue'
import { defineStore } from 'pinia'

// Local preview context until authenticated session data is connected.
export const useWorkspaceStore = defineStore('workspace', () => {
  const role = ref<'admin' | 'supervisor' | 'participant'>('admin')
  const sidebarExpanded = ref(true)
  return { role, sidebarExpanded }
})
