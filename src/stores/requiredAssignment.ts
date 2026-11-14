import { ref } from 'vue'
import { defineStore } from 'pinia'
export interface RequiredAssignmentDraft { answer: string; aiUse: string; attachments: File[] }
export const useRequiredAssignmentStore = defineStore('required-assignment', () => {
  const drafts = ref<Record<string, RequiredAssignmentDraft>>({})
  function save(id: string, draft: RequiredAssignmentDraft) { drafts.value[id] = { ...draft, attachments: [...draft.attachments] } }
  return { drafts, save }
})
