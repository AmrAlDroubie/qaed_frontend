import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface ProfileDraft {
  name: string
  email: string
  phone: string
  bio: string
  photo: string
  mbti: string
  interests: string[]
  skills: string[]
  linkedin: string
  twitter: string
  instagram: string
  snapchat: string
}
export function emptyProfile(): ProfileDraft {
  return { name: '', email: '', phone: '', bio: '', photo: '', mbti: '', interests: [], skills: [], linkedin: '', twitter: '', instagram: '', snapchat: '' }
}
export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileDraft>(emptyProfile())
  const completed = ref(false)
  function save(draft: ProfileDraft) {
    profile.value = { ...draft, name: draft.name.trim(), email: draft.email.trim(), phone: draft.phone.trim(), bio: draft.bio.trim(), interests: [...draft.interests], skills: [...draft.skills] }
    completed.value = true
  }
  return { profile, completed, save }
})
