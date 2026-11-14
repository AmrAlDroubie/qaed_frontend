<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useAdminStore } from '../../stores/admin'
import ProgramSectionTabs from '../../components/admin/ProgramSectionTabs.vue'
import type { Account, AccountDraft, TabItem } from '../../types/admin'
import TabBar from '../../components/ui/TabBar.vue'
import AccountsToolbar from '../../components/admin/AccountsToolbar.vue'
import AccountsTable from '../../components/admin/AccountsTable.vue'
import TablePagination from '../../components/admin/TablePagination.vue'
import AccountDialog from '../../components/admin/AccountDialog.vue'
import InvitationSuccessDialog from '../../components/admin/InvitationSuccessDialog.vue'

const store = useAdminStore()
const tab = ref('roles')
const search = ref('')
const page = ref(1)
const dialogOpen = ref(false)
const editing = ref<Account>()
const invitation = ref<{ url: string; email: string }>()
const pageSize = 7
const tabs = computed<TabItem[]>(() => [
  { id: 'roles', label: 'المشرفون والأدوار', count: store.accounts.filter(a => a.role === 'supervisor').length },
  { id: 'all', label: 'جميع الحسابات', count: store.accounts.length },
  { id: 'participants', label: 'المشاركون (الطلاب)', count: store.accounts.filter(a => a.role === 'participant').length },
  { id: 'pending', label: 'الدعوات المعلقة', count: store.accounts.filter(a => a.status === 'pending').length },
])
// The roles overview includes both main roles, as in the supplied Figma frame.
const filtered = computed(() => store.accounts.filter(account => {
  const matchesTab = tab.value === 'participants' ? account.role === 'participant' : tab.value === 'pending' ? account.status === 'pending' : true
  const term = search.value.trim().toLocaleLowerCase()
  return matchesTab && `${account.name} ${account.email}`.toLocaleLowerCase().includes(term)
}))
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const visibleAccounts = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
watch([search, tab], () => { page.value = 1 })
watch(pages, count => { page.value = Math.min(page.value, count) })
function openDialog(account?: Account) { editing.value = account; dialogOpen.value = true }
async function save(draft: AccountDraft) {
  const isCreating = !editing.value
  const account = store.saveAccount(draft, editing.value?.id)
  dialogOpen.value = false
  if (isCreating) {
    // Reserved example domain: this is a local UI preview, not an activation token.
    const url = `https://qaed.example/activate?preview=${encodeURIComponent(account.id)}`
    await nextTick()
    invitation.value = { url, email: account.email }
  }
}
async function createAnother() {
  invitation.value = undefined
  await nextTick()
  openDialog()
}
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px]">
    <ProgramSectionTabs />
    <section class="rounded-[25px] border border-line bg-white px-3 pb-8 pt-8" aria-labelledby="accounts-title">
      <header class="mb-5 px-0.5 text-right"><h1 id="accounts-title" class="text-lg font-bold leading-7">إدارة الحسابات والدعوات والأدوار</h1><p class="mt-1 text-sm font-light leading-5 text-muted">إنشاء الحسابات، إعادة التفعيل، تجميد الوصول، وضبط الصلاحيات الفرعية للمشرفين.</p></header>
      <AccountsToolbar v-model="search" @create="openDialog()" />
      <TabBar v-model="tab" :items="tabs" label="تصفية الحسابات" class="mx-3 mb-3 mt-4 border-b border-line px-3" />
      <AccountsTable :accounts="visibleAccounts" @edit="openDialog" @toggle-access="store.toggleAccess" />
    </section>
    <TablePagination v-model="page" :total="filtered.length" :shown="visibleAccounts.length" :pages="pages" class="mx-3" />
    <AccountDialog v-if="dialogOpen" :account="editing" @close="dialogOpen = false" @save="save" />
    <InvitationSuccessDialog v-if="invitation" :invitation-url="invitation.url" :email="invitation.email" @close="invitation = undefined" @create-another="createAnother" />
  </div>
</template>
