<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOutsideClick } from '../../composables/useOutsideClick'
import { useProfileStore } from '../../stores/profile'
import { Bell, ChevronDown, Menu, RefreshCw } from '@lucide/vue'
withDefaults(defineProps<{ sidebarOpen: boolean; roleLabel?: string; homePath?: string; participant?: boolean }>(), { roleLabel: 'مدير برنامج قائد', homePath: '/admin' })
defineEmits<{ toggleSidebar: []; refresh: [] }>()
const profile = useProfileStore()
const displayName = computed(() => profile.completed ? profile.profile.name : 'اسم صاحب الحساب')
const panel = ref<'profile' | 'notifications' | 'about' | null>(null)
const profilePopup = ref<HTMLElement>()
const notificationsPopup = ref<HTMLElement>()
const aboutPopup = ref<HTMLElement>()
const activePopup = computed(() => panel.value === 'profile' ? profilePopup.value : panel.value === 'notifications' ? notificationsPopup.value : panel.value === 'about' ? aboutPopup.value : null)
useOutsideClick(activePopup, () => { panel.value = null })
const route = useRoute()
watch(() => route.fullPath, () => { panel.value = null })
</script>

<template>
  <header
    class="relative z-40 flex h-[76px] shrink-0 items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur-xl sm:px-6"
    @keydown.esc="panel = null">
    <div class="flex items-center gap-3">
      <button v-if="!sidebarOpen" type="button" class="rounded-xl border border-line p-2 text-slate-600"
        aria-label="فتح قائمة التنقل" aria-controls="workspace-sidebar" :aria-expanded="sidebarOpen"
        @click="$emit('toggleSidebar')">
        <Menu :size="20" />
      </button>
      <RouterLink :to="homePath" aria-label="برنامج قائد - الرئيسية"><img src="/assets/admin/qaed-logo.png"
          alt="برنامج قائد" width="85" height="61" class="h-[61px] w-[85px] object-contain" /></RouterLink>
    </div>
    <nav aria-label="روابط المشارك" class="hidden items-center gap-8 text-sm lg:flex">
      <div ref="aboutPopup" class="relative"><button type="button" class="flex items-center gap-2"
          :aria-expanded="panel === 'about'" @click="panel = panel === 'about' ? null : 'about'">عن الجمعية
          <ChevronDown :size="14" />
        </button>
        <div v-if="panel === 'about'"
          class="absolute top-full z-10 mt-4 w-44 rounded-2xl border border-line bg-white p-4 shadow-lg">
          <RouterLink to="/participant/about" @click="panel = null">عن الجمعية</RouterLink>
        </div>
      </div>
      <RouterLink to="/roster" class="hover:text-brand">قائمة المشاركين</RouterLink>
    </nav>
    <div class="flex flex-row-reverse items-center gap-2 sm:gap-5">
      <div ref="profilePopup" class="relative">
        <button type="button" class="flex h-[50px] items-center gap-2 rounded-2xl border border-line bg-white px-2"
          :aria-expanded="panel === 'profile'" @click="panel = panel === 'profile' ? null : 'profile'">
          <span
            class="flex h-[33px] w-11 items-center justify-center rounded-[15px] bg-gradient-to-br from-brand to-teal-600 text-label font-bold text-white"><img
              v-if="profile.completed && profile.profile.photo" :src="profile.profile.photo" alt=""
              class="size-full rounded-[15px] object-cover" /><span v-else>{{ displayName.charAt(0) }}</span></span>
          <span class="hidden text-right sm:block"><span class="block text-base font-bold leading-6">{{ displayName
              }}</span><span class="block text-fine font-light leading-[14px] text-muted">{{ roleLabel }}</span></span>
          <ChevronDown :size="14" aria-hidden="true" />
          <span class="sr-only">قائمة المستخدم</span>
        </button>
        <div v-if="panel === 'profile'"
          class="absolute end-0 top-full mt-2 w-56 rounded-2xl border border-line bg-white p-4 shadow-lg">
          <p class="font-bold">{{ displayName }}</p>
          <p class="text-xs text-muted">{{ roleLabel }}</p>
          <RouterLink v-if="participant" class="mt-3 block text-sm text-brand" to="/participant/profile"
            @click="panel = null">الملف الشخصي</RouterLink>
          <RouterLink class="mt-3 block text-sm text-brand" to="/login">العودة إلى تسجيل الدخول</RouterLink>
        </div>
      </div>
      <div ref="notificationsPopup" class="relative">
        <button type="button"
          class="relative flex h-[50px] w-[42px] items-center justify-center rounded-[13px] border border-line bg-white text-slate-600"
          aria-label="الإشعارات، 3 إشعارات" :aria-expanded="panel === 'notifications'"
          @click="panel = panel === 'notifications' ? null : 'notifications'">
          <Bell :size="24" /><span
            class="absolute -left-1 -top-1 rounded-full bg-red-500 px-1.5 py-1 text-micro font-bold text-white">3</span>
        </button>
        <div v-if="panel === 'notifications'"
          class="absolute end-0 top-full mt-2 w-56 rounded-2xl border border-line bg-white p-4 shadow-lg">
          <p class="font-bold">الإشعارات</p>
          <p class="mt-2 text-sm text-muted">الإشعارات التجريبية غير متصلة بالخدمة بعد.</p>
        </div>
      </div>
      <RouterLink v-if="participant" to="/participant"
        class="rounded-full border border-line px-3 py-3 text-sm font-bold text-brand"
        exact-active-class="!bg-brand !text-white">الرئيسية</RouterLink>
      <!-- <button type="button" class="flex h-[46px] items-center gap-2 rounded-xl border border-line bg-white px-3 text-sm font-bold text-slate-600 hover:bg-slate-50 sm:px-4" @click="$emit('refresh')"><RefreshCw :size="16" /><span class="hidden md:inline">تحديث البيانات</span><span class="sr-only md:hidden">تحديث البيانات</span></button> -->
    </div>
  </header>
</template>
