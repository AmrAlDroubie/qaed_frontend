<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CalendarClock, CircleCheck, Layers, Plus, RotateCcw, Search, UsersRound } from '@lucide/vue'
import TabBar from '../../components/ui/TabBar.vue'
import AssignmentManagementCard from '../../components/assignments/AssignmentManagementCard.vue'
import { useAssignmentManagementStore } from '../../stores/assignmentManagement'
const store = useAssignmentManagementStore()
const route = useRoute()
const type = ref(['reading', 'listening', 'optional'].includes(String(route.query.type)) ? String(route.query.type) : 'optional')
const status = ref('all')
const week = ref('all')
const search = ref('')
const notice = ref('')
const types = [{ id: 'all', label: 'الكل' }, { id: 'reading', label: 'تكليف قرائي' }, { id: 'listening', label: 'تكليف سماعي' }, { id: 'optional', label: 'تكليف اختياري' }]
const statuses = [{ id: 'all', label: 'الكل' }, { id: 'published', label: 'المنشورة' }, { id: 'scheduled', label: 'المجدولة' }]
const weeks = computed(() => [...new Set(store.active.map(item => item.week))].sort((a,b) => a-b))
function normalize(value: string) { return value.normalize('NFKD').replace(/[\u064B-\u065F\u0640]/g, '').toLowerCase().trim() }
const results = computed(() => store.active.filter(item => (type.value === 'all' || item.type === type.value) && (status.value === 'all' || item.status === status.value) && (week.value === 'all' || String(item.week) === week.value) && normalize(`${item.title} ${item.book}`).includes(normalize(search.value))))
const groups = computed(() => [
  { id: 'published', title: 'التكاليف المنشورة حالياً', subtitle: 'التكاليف المتاحة للمشاركين حالياً.', items: results.value.filter(item => item.status === 'published') },
  { id: 'scheduled', title: 'التكاليف المجدولة مستقبلياً', subtitle: 'التكاليف التي تنتظر موعد النشر التلقائي.', items: results.value.filter(item => item.status === 'scheduled') },
])
const stats = computed(() => [
  { title: 'كل التكاليف', value: store.statistics.total, icon: Layers, color: 'bg-white border-line text-ink' },
  { title: 'منشورة', value: store.statistics.published, icon: CircleCheck, color: 'bg-emerald-50 border-emerald-200 text-brand' },
  { title: 'مجدولة', value: store.statistics.scheduled, icon: CalendarClock, color: 'bg-amber-50 border-amber-200 text-amber-800' },
  { title: 'إجمالي التسليمات', value: store.statistics.submissions, icon: UsersRound, color: 'bg-teal-50 border-teal-100 text-brand' },
])
function reset() { type.value = 'all'; status.value = 'all'; week.value = 'all'; search.value = '' }
function act(action: 'publish' | 'archive' | 'remove', id: string) { store[action](id); notice.value = { publish: 'تم نشر التكليف محليًا.', archive: 'تمت أرشفة التكليف محليًا.', remove: 'تم حذف التكليف المجدول محليًا.' }[action] }
</script>
<template>
  <div class="mx-auto max-w-[1440px] space-y-6 pb-8 pt-2" dir="rtl">
    <header class="flex flex-wrap items-center justify-between gap-4"><div><p class="text-xs text-muted">المحتوى والتكاليف <span class="mx-2">‹</span><span class="text-brand">إدارة التكاليف</span></p><h1 class="mt-2 text-3xl font-bold">إضافة تكليف والجدولة</h1><p class="mt-2 text-sm font-light text-muted">استعراض التكاليف المنشورة والمجدولة وتعديل حالاتها.</p></div><RouterLink to="/assignments/create" class="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white"><Plus :size="18" />إضافة تكليف جديد</RouterLink></header>
    <section aria-label="فلاتر التكاليف" class="rounded-3xl border border-line bg-white shadow-sm"><div class="border-b border-slate-100 p-4"><p class="mb-2 text-xs text-muted">فرز حسب نوع التكليف</p><TabBar v-model="type" :items="types" label="نوع التكليف" stretch class="w-fit max-w-full" /></div><div class="grid gap-4 p-4 xl:grid-cols-[2fr_1fr_1.5fr]"><label class="text-xs text-muted">فرز حسب الأسبوع<select v-model="week" class="mt-2 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink"><option value="all">جميع الأسابيع</option><option v-for="number in weeks" :key="number" :value="String(number)">الأسبوع {{ number }}</option></select></label><div><p class="mb-2 text-xs text-muted">الحالة</p><TabBar v-model="status" :items="statuses" label="حالة التكليف" stretch class="rounded-xl bg-slate-50 p-1" /></div><label class="text-xs text-muted">البحث في العناوين والكتب<span class="mt-2 flex min-h-11 items-center gap-2 rounded-xl border border-line px-3"><Search :size="16" /><input v-model="search" type="search" placeholder="ابحث باسم التكليف أو اسم الكتاب..." class="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" /></span></label></div><footer class="flex items-center justify-between border-t border-slate-100 p-4"><p role="status" class="text-xs text-muted">إجمالي النتائج: <strong>{{ results.length }}</strong></p><button type="button" class="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs text-slate-600" @click="reset"><RotateCcw :size="14" />إعادة ضبط</button></footer></section>
    <dl class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><div v-for="stat in stats" :key="stat.title" class="flex items-center justify-between rounded-2xl border p-4" :class="stat.color"><div><dt class="text-xs">{{ stat.title }}</dt><dd class="mt-1 text-2xl font-bold">{{ stat.value }}</dd></div><span class="rounded-xl bg-white/80 p-3"><component :is="stat.icon" :size="20" /></span></div></dl>
    <p v-if="notice" role="status" class="text-sm text-brand">{{ notice }}</p>
    <section v-for="group in groups" :key="group.id" :aria-labelledby="`assignments-${group.id}`"><header class="mb-4 flex items-center justify-between gap-3"><div><h2 :id="`assignments-${group.id}`" class="flex items-center gap-2 text-lg font-bold"><span class="size-2 rounded-full" :class="group.id === 'published' ? 'bg-emerald-500' : 'bg-amber-500'" />{{ group.title }}</h2><p class="mt-1 text-xs font-light text-muted">{{ group.subtitle }}</p></div><span class="rounded-full px-3 py-1 text-xs" :class="group.id === 'published' ? 'bg-emerald-50 text-brand' : 'bg-amber-50 text-amber-700'">{{ group.items.length }} تكليف</span></header><div class="grid items-start gap-4 xl:grid-cols-2"><AssignmentManagementCard v-for="assignment in group.items" :key="assignment.id" :assignment="assignment" @publish="act('publish', assignment.id)" @archive="act('archive', assignment.id)" @remove="act('remove', assignment.id)" /></div></section>
  </div>
</template>
