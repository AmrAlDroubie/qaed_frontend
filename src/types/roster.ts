export type RosterRole = 'participant' | 'supervisor'
export type RosterFilter = 'all' | RosterRole

export interface RosterMember {
  id: string
  name: string
  role: RosterRole
  avatar: string
  mbti: string
  bio: string
  interests: string[]
}

export const rosterRoleLabels: Record<RosterRole, string> = {
  participant: 'مشارك',
  supervisor: 'مشرف',
}
