export type AccountStatus = 'active' | 'pending' | 'frozen'
export type AccountRole = 'supervisor' | 'participant'
export type SupervisorRole = 'logbook' | 'assignments' | 'attendance' | 'content' | 'initiatives'
export interface Account {
  id: string
  name: string
  email: string
  role: AccountRole
  subrole: string
  subroles?: SupervisorRole[]
  createdAt: string
  status: AccountStatus
}
export type AccountDraft = Pick<Account, 'name' | 'email' | 'role' | 'subrole' | 'subroles'>
export interface TabItem { id: string; label: string; count?: number; disabled?: boolean }
