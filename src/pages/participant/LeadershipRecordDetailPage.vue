<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, ChevronRight, Save, Send } from '@lucide/vue'
import { createLeadershipDraft, useLeadershipRecordStore } from '../../stores/leadershipRecord'
import ReflectionEditor from '../../components/participant/leadership/ReflectionEditor.vue'
import LeadershipActionTable from '../../components/participant/leadership/LeadershipActionTable.vue'
const route = useRoute()
const store = useLeadershipRecordStore()
const session = computed(() => store.sessions.find(item => item.id === route.params.id))
const draft = ref(createLeadershipDraft())
const notice = ref('')
const readonly = computed(() => !session.value || !['available', 'overdue'].includes(session.value.status))
const statuses = { graded: 'تم التسليم', review: 'قيد المراجعة', upcoming: 'متاح قريبًا', available: 'متاح للتسليم', overdue: 'متأخر عن التسليم' }
watch(() => route.params.id, () => {
  const saved = store.drafts[String(route.params.id)]
  draft.value = saved ? { ...saved, actions: saved.actions.map(action => ({ ...action })) } : createLeadershipDraft()
  notice.value = ''
}, { immediate: true })
function save(final: boolean) {
  if (!session.value || readonly.value) return
  if (final && (!draft.value.learned.trim() || !draft.value.application.trim())) { notice.value = 'أكمل إجابتك في القسمين قبل التسليم.'; return }
  if (store.save(session.value.id, draft.value, final)) notice.value = final ? 'تم تسليم التكليف محليًا وهو قيد المراجعة.' : 'تم حفظ المسودة محليًا.'
}
</script>

<template>
  <div v-if="session" class="mx-auto w-full max-w-[1080px] pb-6 pt-2" dir="rtl">
    <RouterLink to="/participant/leadership-log" class="inline-flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 text-xs text-muted"><ChevronRight :size="16" />السجل القيادي</RouterLink>
    <header class="my-6 text-center"><p class="text-base font-bold">تسليم التكليف</p><h1 class="mt-3 text-4xl font-bold leading-tight">{{ session.id === 'journal-session-03' ? 'دورة رباعية التقدم' : session.title }}</h1></header>
    <dl class="mb-4 grid gap-3 sm:grid-cols-3"><div v-for="item in [{ label: 'موعد التسليم', value: 'الأربعاء 2 أكتوبر' }, { label: 'الوزن', value: '4.0%' }, { label: 'الحالة', value: statuses[session.status] }]" :key="item.label" class="rounded-2xl bg-slate-50 p-4"><dt class="text-xs text-muted">{{ item.label }}</dt><dd class="mt-2 text-sm font-bold">{{ item.value }}</dd></div></dl>
    <dl class="mb-12 grid gap-3 sm:grid-cols-3"><div v-for="item in [{ label: 'اسم الملقي', value: 'عمرو الدروبي' }, { label: 'التاريخ', value: '11/9/2026' }, { label: 'المكان', value: 'قاعة السيمنار' }]" :key="item.label" class="rounded-2xl bg-slate-50 p-5"><dt class="text-base font-bold">{{ item.label }}</dt><dd class="mt-3 text-lg font-bold text-brand">{{ item.value }}</dd></div></dl>
    <form class="space-y-6" @submit.prevent="save(true)">
      <details class="group rounded-[28px] border border-line bg-white"><summary class="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold [&::-webkit-details-marker]:hidden">دون ما تعلمت<ChevronDown :size="18" class="text-muted group-open:rotate-180" /></summary><div class="px-6 pb-6"><ReflectionEditor id="learned-answer" v-model="draft.learned" :readonly="readonly" /></div></details>
      <details open class="group rounded-[28px] border border-line bg-white"><summary class="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold [&::-webkit-details-marker]:hidden">كيف سأفعل ما تعلمت<ChevronDown :size="18" class="text-muted group-open:rotate-180" /></summary><div class="space-y-6 px-4 pb-5 sm:px-6"><ReflectionEditor id="application-answer" v-model="draft.application" :readonly="readonly" /><LeadershipActionTable v-model="draft.actions" :readonly="readonly" />
      <footer class="flex flex-col justify-between gap-5 rounded-3xl border border-line bg-white p-5 lg:flex-row lg:items-center"><div class="flex items-center gap-3"><span class="rounded-2xl bg-slate-50 p-3 text-muted"><Save :size="20" /></span><div><h2 class="text-sm font-bold">قبل التسليم</h2><p class="mt-1 text-xs font-light text-muted">يمكنك حفظ إجاباتك كمسودة والعودة لإكمالها لاحقاً.</p></div></div><div class="flex flex-wrap gap-2"><button type="button" :disabled="readonly" class="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm text-slate-600 disabled:opacity-50" @click="save(false)"><Save :size="17" />حفظ كمسودة</button><button type="submit" :disabled="readonly" class="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-50"><Send :size="17" />تسليم الاختبار والتكليف النهائي</button></div></footer><p v-if="notice" role="status" class="text-sm text-brand">{{ notice }}</p>
      </div></details>
    </form>
  </div>
</template>
