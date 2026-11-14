<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, CircleAlert, Clock3, Dot, Search } from '@lucide/vue'
import GradingSubmissionsTable from '../../components/grading/GradingSubmissionsTable.vue'
import GradingAssignmentDialog from '../../components/grading/GradingAssignmentDialog.vue'
import { gradingStatuses, gradingSubmissions, gradingSummary, gradingTypes, type GradingStatus, type GradingSubmission } from '../../data/grading'
import { useWorkspaceStore } from '../../stores/workspace'
const workspace = useWorkspaceStore()
const search = ref('')
const status = ref('all')
const type = ref('all')
const activeSubmission = ref<GradingSubmission | null>(null)
const submissions = ref(gradingSubmissions.map(item => ({ ...item })))
function normalize(value: string) { return value.normalize('NFKD').replace(/[\u064B-\u065F\u0640]/g, '').toLowerCase().trim() }
const results = computed(() => submissions.value.filter(item => (status.value === 'all' || item.status === status.value) && (type.value === 'all' || item.type === type.value) && normalize(`${item.participant} ${item.title}`).includes(normalize(search.value))))
const stats = computed(() => [
  { title: 'بانتظار التصحيح', value: gradingSummary.pending + submissions.value.filter(item => item.status === 'pending').length - gradingSubmissions.filter(item => item.status === 'pending').length, hint: 'تحتاج قرارًا من المشرف', icon: Clock3 },
  { title: 'تم تصحيحهم', value: gradingSummary.graded + submissions.value.filter(item => item.status === 'graded').length - gradingSubmissions.filter(item => item.status === 'graded').length, hint: 'أعمال معتمدة', icon: Check },
  { title: 'إعادة التسليم', value: gradingSummary.resubmit + submissions.value.filter(item => item.status === 'resubmit').length - gradingSubmissions.filter(item => item.status === 'resubmit').length, hint: 'بحاجة متابعة', icon: CircleAlert },
  { title: 'متوسط الدرجة', value: ((86 * 2 + submissions.value.filter(item => item.manualGrade !== undefined && item.status === 'graded').reduce((total, item) => total + ((item.automaticScore + item.manualGrade!) * (item.aiOverride ? 1 : 1 - item.aiDeduction / 100)) / (item.automaticMaxScore + item.maxManualScore) * 100, 0)) / (2 + submissions.value.filter(item => item.manualGrade !== undefined && item.status === 'graded').length)).toFixed(1) + '%', hint: 'عينة التسليمات الحالية', icon: Dot },
])
function saveGrade(decision: { status: GradingStatus; score: number; notes: string; overrideAi: boolean; next: boolean }) {
  if (!activeSubmission.value) return
  const currentId = activeSubmission.value.id
  Object.assign(activeSubmission.value, { status: decision.status, manualGrade: decision.score, supervisorNotes: decision.notes, aiOverride: decision.overrideAi })
  const next = decision.next ? results.value.find(item => item.status === 'pending' && item.id !== currentId) : undefined
  activeSubmission.value = next ?? null
}
function closeGrading() {
  activeSubmission.value = null
}
</script>

<template>
  <div class="mx-auto max-w-[1440px] space-y-5 pb-8 pt-2" dir="rtl">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-bold text-brand">التشغيل اليومي</p>
        <h1 class="mt-1 text-2xl  font-bold">اللوحة الموحدة للتصحيح</h1>
        <p class="mt-2 text-sm font-light leading-relaxed text-muted">مساحة واحدة لاستقبال التسليمات، إدارة الصلاحيات،
          وتصحيح الأعمال مع تسجيل أثر كل قرار.</p>
      </div>
      <span
        class="inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-fine font-bold text-brand">
        <Check :size="12" />{{ workspace.role === 'admin' ? 'مدير برنامج قائد' : 'مشرف المبادرات والسجل القيادي' }}
      </span>
    </header>
    <dl class="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <div v-for="stat in stats" :key="stat.title" class="rounded-[22px] border border-line bg-white p-4">
        <span class="mb-3 flex size-10 items-center justify-center rounded-xl bg-brand/8 text-brand">
          <component :is="stat.icon" :size="20" aria-hidden="true" />
        </span>
        <dt class="text-xs font-bold text-muted">{{ stat.title }}</dt>
        <dd class="mt-1 text-2xl font-bold"><span dir="ltr">{{ stat.value }}</span></dd>
        <p class="mt-1 text-fine font-light text-slate-400">{{ stat.hint }}</p>
      </div>
    </dl>
    <section aria-label="تصفية التسليمات" class="space-y-4 rounded-[25px] border border-line bg-white p-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold">التسليمات</h2>
          <p class="mt-1 text-fine font-light text-muted">الأعمال خارج نطاق الدور تحمل حالة «استعراض فقط».</p>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-xs font-bold text-muted">
          <label class="flex min-h-11 items-center gap-2 rounded-[14px] border border-line bg-slate-50 px-2 py-1">حالة
            التقييم<select v-model="status" class="max-w-40 rounded-[10px] bg-white px-2 py-2">
              <option value="all">الكل</option>
              <option v-for="option in gradingStatuses" :key="option.id" :value="option.id">{{ option.label }}</option>
            </select></label>
          <label class="flex min-h-11 items-center gap-2 rounded-[14px] border border-line bg-slate-50 px-2 py-1">نوع
            التكليف<select v-model="type" class="max-w-40 rounded-[10px] bg-white px-2 py-2">
              <option value="all">الكل</option>
              <option v-for="option in gradingTypes" :key="option.id" :value="option.id">{{ option.label }}</option>
            </select></label>
          <div class="flex min-h-11 items-center rounded-[14px] border border-line bg-slate-50 p-1"
            aria-label="طريقة العرض"><button type="button" aria-pressed="true"
              class="rounded-[10px] bg-white px-3 py-2 text-brand">القائمة المسطحة</button><button type="button"
              disabled title="سيتاح العرض حسب التكليف بعد توفير تصميمه"
              class="cursor-not-allowed rounded-[10px] px-3 py-2">العرض حسب التكليف</button></div>
        </div>
      </div>
      <label class="flex min-h-11 items-center gap-3 rounded-[13px] border border-line bg-slate-50 px-4">
        <Search :size="17" aria-hidden="true" /><input v-model="search" type="search"
          aria-label="البحث باسم الطالب أو اسم التكليف" placeholder="ابحث باسم الطالب أو اسم التكليف"
          class="min-w-0 flex-1 bg-transparent py-2 text-sm font-light outline-none" />
      </label>
    </section>
    <div class="pt-3">
      <GradingSubmissionsTable :submissions="results" @grade="activeSubmission = $event" />
    </div>
    <GradingAssignmentDialog v-if="activeSubmission" :key="activeSubmission.id" :submission="activeSubmission" @save="saveGrade" @close="closeGrading" />
  </div>
</template>
