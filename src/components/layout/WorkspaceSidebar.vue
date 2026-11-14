<script setup lang="ts">
import { Check, CircleAlert, BellRing, BookOpen, CalendarCheck, ChartNoAxesColumn, LayoutGrid, Rocket, UserRound, UsersRound, ChevronLeft, ChevronRight, X } from '@lucide/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { upcomingAdminPages } from '../../data/adminNavigation'
import { participantSections } from '../../data/participant'

const props = withDefaults(defineProps<{ role?: 'admin' | 'supervisor' | 'participant'; collapsed?: boolean }>(), { role: 'admin', collapsed: false })
const heading = computed(() => props.role === 'participant' ? 'قائمة المشارك' : 'قائمة المشرف')
defineEmits<{ close: [] }>()
const route = useRoute()
const icons = [BookOpen, Rocket, ChartNoAxesColumn, CalendarCheck, BellRing, UserRound, UsersRound]
const adminItems = [
  { label: 'اللوحة الرئيسية للبرنامج', icon: LayoutGrid, path: '/admin' },
  ...upcomingAdminPages.filter(page => !page.programSection).map((page, index) => ({
    label: page.title,
    icon: icons[index],
    path: page.path === 'participants' ? '/roster' : ['assignments', 'grading'].includes(page.path) ? `/${page.path}` : `/admin/${page.path}`,
  })),
]
const items = computed(() => {
  if (props.role === 'participant') return participantSections.map(page => ({ label: page.title, icon: page.icon, path: `/participant/${page.path}` }))
  if (props.role === 'admin') return adminItems.filter(item => item.path !== '/roster')
  return adminItems.filter(item => !['/admin', '/admin/notifications'].includes(item.path)).map(item => ({ ...item, path: item.path.replace('/admin', '/supervisor') }))
})
function isActive(path: string) {
  if (path === '/participant/attendance') return route.name === 'participant-meeting' || route.name === 'participant-attendance'
  return path === '/admin' ? Boolean(route.meta.programSection) : route.path === path
}
</script>

<template>
  <aside id="workspace-sidebar"
    class="flex h-full shrink-0 flex-col gap-[14px] overflow-y-auto border-l border-line bg-white/75 px-[14px] py-5 transition-[width] duration-200 motion-reduce:transition-none"
    :aria-label="heading" :class="collapsed ? 'w-[88px]' : role === 'participant' ? 'w-[270px]' : 'w-[285px]'">
    <div class="flex items-center justify-between" :class="{ 'justify-center': collapsed }">
      <h2 v-if="!collapsed" class="text-label font-bold">{{ heading }}</h2>
      <button type="button"
        class="flex size-10 items-center justify-center rounded-xl border border-line bg-white text-slate-600 hover:bg-slate-50"
        :aria-label="collapsed ? 'توسيع قائمة التنقل' : 'طي قائمة التنقل'" :aria-expanded="!collapsed" @click="$emit('close')">
        <component :is="role === 'supervisor' ? X : collapsed ? ChevronLeft : ChevronRight" :size="16" />
      </button>
    </div>
    <!-- <section class="session-card rounded-ss-[18px] rounded-se-[18px] rounded-ee-[18px] border border-brand/12 p-4">
      <div class="mb-2 flex items-center gap-2.5"><span class="flex size-10 items-center justify-center rounded-[14px] bg-brand text-white shadow-button"><Check :size="20" /></span><div><h3 class="text-fine font-bold">صلاحيات الجلسة</h3><p class="text-micro font-light text-muted">مدير برنامج قائد</p></div></div>
      <div class="rounded-[14px] bg-white p-2.5"><p class="mb-1.5 text-micro font-bold text-muted">المهام المخصصة</p><span class="inline-block rounded-full border border-line bg-slate-50 px-2 py-1 text-micro font-bold text-slate-600">كافة الصلاحية</span></div>
    </section> -->
    <section v-if="role === 'supervisor'" class="session-card rounded-[18px] border border-brand/12 p-4">
      <div class="mb-3 flex items-center gap-2.5">
        <span class="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-brand text-white"><Check :size="20" /></span>
        <div><h3 class="text-fine font-bold">صلاحيات الجلسة</h3><p class="text-micro font-light text-muted">مشرف المبادرات والسجل القيادي</p></div>
      </div>
      <div class="rounded-[14px] bg-white p-2.5">
        <p class="mb-2 text-micro font-bold text-muted">المهام المخصصة</p>
        <div class="flex flex-wrap gap-1"><span v-for="task in ['فيديو', 'استماع', 'قراءة', 'اختياري', 'السجل']" :key="task" class="rounded-full border border-line bg-slate-50 px-2 py-1 text-micro font-bold text-slate-600">{{ task }}</span></div>
      </div>
    </section>
    <nav v-if="role === 'participant' && !collapsed" class="flex flex-wrap gap-2 lg:hidden" aria-label="روابط المشارك">
      <RouterLink to="/participant" class="rounded-xl bg-brand/10 px-3 py-2 text-xs font-bold text-brand">الرئيسية</RouterLink>
      <RouterLink to="/roster" class="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600">قائمة المشاركين</RouterLink>
      <RouterLink to="/participant/about" class="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600">عن الجمعية</RouterLink>
    </nav>
    <nav class="flex flex-col gap-1.5" aria-label="التنقل الرئيسي">
      <RouterLink v-for="item in items" :key="item.path" :to="item.path"
        class="flex min-h-[60px] items-center gap-2.5 rounded-[17px] py-2.5 text-right font-bold"
        :class="isActive(item.path) ? 'bg-brand text-white shadow-button' : 'text-slate-600 hover:bg-slate-100'"
        :title="collapsed ? item.label : undefined" :aria-label="item.label"
        :style="{ paddingInline: collapsed ? '0' : '12px', justifyContent: collapsed ? 'center' : undefined }"
        :aria-current="isActive(item.path) ? 'page' : undefined">
        <span class="flex size-[38px] shrink-0 items-center justify-center rounded-xl"
          :class="isActive(item.path) ? 'bg-white/10' : 'bg-slate-100 text-brand'">
          <component :is="item.icon" :size="20" aria-hidden="true" />
        </span>
        <span v-if="!collapsed" class="flex-1 text-nav">{{ item.label }}</span>
      </RouterLink>
    </nav>
    <div v-if="role === 'supervisor'" class="flex gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-micro text-amber-900">
      <CircleAlert :size="16" class="shrink-0" aria-hidden="true" />
      <div><p class="font-bold">ضابط الصلاحيات</p><p class="mt-1 font-light leading-5">الأعمال خارج نطاق دورك تظهر للعرض فقط.</p></div>
    </div>
  </aside>
</template>

<style scoped>
.session-card {
  background: linear-gradient(155deg, rgb(30 107 99 / 5%), rgb(143 181 177 / 26%) 55%, white);
}
</style>
