<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { X } from '@lucide/vue'
import WorkspaceNavbar from '../components/layout/WorkspaceNavbar.vue'
import WorkspaceSidebar from '../components/layout/WorkspaceSidebar.vue'
import { useAdminStore } from '../stores/admin'
import { useWeeksStore } from '../stores/weeks'
import { useWorkspaceStore } from '../stores/workspace'

const props = defineProps<{ role?: 'admin' | 'supervisor' | 'participant' }>()
const workspace = useWorkspaceStore()
watch(() => props.role, value => { if (value) workspace.role = value }, { immediate: true })
const role = computed(() => props.role ?? workspace.role)
const roleLabel = computed(() => ({ admin: 'مدير برنامج قائد', supervisor: 'مشرف', participant: 'مشارك' })[role.value])
const homePath = computed(() => role.value === 'admin' ? '/admin' : role.value === 'participant' ? '/participant' : '/roster')
const store = useAdminStore()
const weeks = useWeeksStore()
const route = useRoute()
function refresh() {
  if (route.name === 'assignments-index') {
    store.notice = 'بيانات التكاليف المحلية محدّثة.'
    return
  }
  if (role.value === 'participant') {
    store.notice = 'بيانات المشارك المحلية محدّثة.'
    return
  }
  if (route.name === 'admin-launch') {
    store.notice = 'بيانات الدفعات المحلية محدّثة.'
    return
  }
  if (route.meta.roster) {
    store.notice = 'بيانات الروستر المحلية محدّثة.'
    return
  }
  if (route.meta.comingSoon) {
    store.notice = 'سيتم إتاحة هذه الصفحة لاحقًا.'
    return
  }
  if (route.name === 'admin-weeks') {
    weeks.resetPreview()
    store.notice = 'تم تحديث بيانات الأسابيع المحلية.'
  } else store.resetPreview()
}
const desktop = ref(false)
const mobileSidebarOpen = ref(false)
const sidebarOpen = computed({
  get: () => desktop.value ? workspace.sidebarExpanded : mobileSidebarOpen.value,
  set: value => {
    if (desktop.value) workspace.sidebarExpanded = value
    else mobileSidebarOpen.value = value
  },
})
const hasIconRail = computed(() => role.value !== 'supervisor')
let viewport: MediaQueryList | undefined
watch(() => route.fullPath, () => {
  if (!viewport?.matches) sidebarOpen.value = false
})
function syncSidebar() {
  desktop.value = viewport?.matches ?? false
  mobileSidebarOpen.value = false
}
onMounted(() => { viewport = window.matchMedia('(min-width: 1024px)'); syncSidebar(); viewport.addEventListener('change', syncSidebar) })
onUnmounted(() => viewport?.removeEventListener('change', syncSidebar))
</script>

<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-canvas" dir="rtl" @keydown.esc="sidebarOpen = false">
    <WorkspaceNavbar :participant="role === 'participant'" :role-label="roleLabel" :home-path="homePath" :sidebar-open="sidebarOpen || hasIconRail || Boolean(route.meta.hideSidebar)" @toggle-sidebar="sidebarOpen = !sidebarOpen" @refresh="refresh" />
    <div class="relative flex min-h-0 flex-1">
      <button v-if="sidebarOpen && !route.meta.hideSidebar" class="fixed inset-x-0 bottom-0 top-[76px] z-40 bg-slate-950/30 lg:hidden" aria-label="إغلاق القائمة" @click="sidebarOpen = false" />
      <div v-if="(sidebarOpen || hasIconRail) && !route.meta.hideSidebar" class="z-50 bg-white lg:relative lg:z-auto" :class="sidebarOpen ? 'absolute inset-y-0 right-0' : 'relative shrink-0'"><WorkspaceSidebar :role="role" :collapsed="hasIconRail && !sidebarOpen" @close="sidebarOpen = !sidebarOpen" /></div>
      <main class="min-w-0 flex-1 overflow-auto px-4 pb-8 pt-[18px] lg:pl-9 lg:pr-4"><RouterView /></main>
    </div>
    <div v-if="store.notice" role="status" class="fixed bottom-5 left-5 z-[60] flex max-w-[calc(100%-40px)] items-center gap-4 rounded-xl border border-line bg-white px-5 py-3 text-sm shadow-lg">{{ store.notice }}<button aria-label="إغلاق الرسالة" @click="store.notice = ''"><X :size="16" /></button></div>
  </div>
</template>
