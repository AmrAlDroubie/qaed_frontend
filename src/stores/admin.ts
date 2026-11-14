import { defineStore } from 'pinia'
import { ref } from 'vue'
import { accountFixtures } from '../data/admin'
import type { AccountDraft, Account } from '../types/admin'

export const useAdminStore = defineStore('admin', () => {
  const accounts = ref<Account[]>(accountFixtures.map(account => ({ ...account })))
  const notice = ref('')
  function resetPreview() {
    accounts.value = accountFixtures.map(account => ({ ...account }))
    notice.value = 'تم تحديث بيانات المعاينة المحلية.'
  }
  function saveAccount(draft: AccountDraft, id?: string) {
    const account = accounts.value.find(item => item.id === id)
    if (account) {
      Object.assign(account, draft)
      notice.value = 'تم حفظ التغييرات في المعاينة المحلية فقط.'
      return account
    }
    const created: Account = { ...draft, id: crypto.randomUUID(), createdAt: new Date().toLocaleDateString('en-CA').replaceAll('-', '/'), status: 'pending' }
    accounts.value.push(created)
    notice.value = ''
    return created
  }
  function toggleAccess(id: string) {
    const account = accounts.value.find(item => item.id === id)
    if (!account) return
    account.status = account.status === 'frozen' ? 'active' : 'frozen'
    notice.value = 'تم تغيير حالة الحساب في المعاينة المحلية فقط.'
  }
  return { accounts, notice, resetPreview, saveAccount, toggleAccess }
})
