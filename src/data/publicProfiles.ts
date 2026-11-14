import { rosterMembers } from './roster'

export const publicProfiles = rosterMembers.map(member => ({
  ...member,
  skills: [...member.interests],
  hobbies: member.id === 'faisal' ? ['التصوير', 'القراءة', 'المشي'] : [],
}))
export type PublicProfile = (typeof publicProfiles)[number]
