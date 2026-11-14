<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AudioLines, BookOpen, ClipboardCheck, Eye, Plus, Save, Send, Sparkles } from '@lucide/vue'
import { useAssignmentManagementStore, assignmentTypeLabels } from '../../stores/assignmentManagement'
import { assignmentWeight, cloneAssignment, initialAssignment, newQuestion, questionLabels, type QuestionType } from '../../types/assignmentBuilder'
import AssignmentQuestionEditor from '../../components/assignments/AssignmentQuestionEditor.vue'
import AssignmentDeliverySettings from '../../components/assignments/AssignmentDeliverySettings.vue'
const store = useAssignmentManagementStore()
const router = useRouter()
const draft = ref(store.builderDraft ? cloneAssignment(store.builderDraft) : initialAssignment())
const questionType = ref<QuestionType>('boolean')
const notice = ref('')
const error = ref('')
const weight = computed(() => assignmentWeight(draft.value))
const types = [
  { id: 'reading' as const, icon: BookOpen, label: 'تكليف قرائي', value: '15%', description: 'تكليف إلزامي مبني على قراءة المحتوى الأسبوعي واختبار الفهم والتطبيق.' },
  { id: 'listening' as const, icon: AudioLines, label: 'تكليف سماعي', value: '2.5%', description: 'تكليف استماع واحد على مستوى البرنامج مع أسئلة تفاعلية.' },
  { id: 'optional' as const, icon: Sparkles, label: 'تكليف اختياري - بونص', value: 'Bonus', description: 'نشاط اختياري يضاف كمكافأة وفق النوع والوزن المحدد من المشرف.' },
]
function saveDraft() { store.saveBuilderDraft(draft.value); notice.value = 'تم حفظ المسودة محليًا.'; error.value = '' }
function publish() {
  error.value = ''
  if (!draft.value.title.trim() || !draft.value.questions.length || draft.value.questions.some(q => !q.text.trim() || (q.type === 'choice' && q.options.some(option => !option.trim())))) { error.value = 'أكمل عنوان التكليف وأضف سؤالًا واحدًا على الأقل مع نصوص الأسئلة والخيارات.'; return }
  if (!draft.value.submissionTypes.length) { error.value = 'اختر نوع تسليم واحدًا على الأقل.'; return }
  const publishing = draft.value.publishAt ? new Date(draft.value.publishAt).getTime() : Date.now()
  const deadline = new Date(draft.value.deadline).getTime()
  if (!Number.isFinite(deadline) || !Number.isFinite(publishing) || deadline <= Math.max(publishing, Date.now())) { error.value = 'يجب أن يكون الموعد النهائي بعد الوقت الحالي وموعد النشر.'; return }
  store.createAssignment(draft.value)
  void router.push({ name: 'assignments-index', query: { type: draft.value.type } })
}
</script>
<template>
  <form class="assignment-builder mx-auto max-w-[1440px] space-y-6 pb-8 pt-4" dir="rtl" @submit.prevent="publish">
    <header class="flex flex-wrap justify-between gap-4"><div><RouterLink to="/assignments" class="text-xs text-muted">المحتوى والتكاليف ‹ بناء وإضافة التكاليف</RouterLink><h1 class="mt-2 text-3xl font-bold">بناء وإضافة التكليف</h1><p class="mt-2 text-sm font-light text-muted">أنشئ التكليف، حدّد نوعه ووزنه، أضف الأسئلة ومتطلبات التسليم، ثم اختبر النموذج قبل نشره للمشاركين.</p></div><span class="h-fit rounded-full bg-brand/5 px-3 py-2 text-xs text-brand">مسودة جديدة · {{ draft.questions.length }} أسئلة</span></header>
    <section class="rounded-3xl border border-line bg-white p-5"><p class="text-xs text-brand">الخطوة الأولى</p><h2 class="mb-4 mt-1 text-lg font-bold">نوع التكليف المراد إنشاؤه</h2><div class="grid gap-3 xl:grid-cols-3"><button v-for="type in types" :key="type.id" type="button" :aria-pressed="draft.type === type.id" class="flex gap-3 rounded-2xl border p-4 text-right" :class="draft.type === type.id ? 'border-brand bg-brand text-white' : 'border-line bg-white text-slate-600'" @click="draft.type = type.id"><component :is="type.icon" :size="24" class="shrink-0" /><span class="flex-1"><span class="text-base font-bold">{{ type.label }}</span><span class="mt-2 block text-xs font-light leading-6">{{ type.description }}</span></span><span class="text-xs">{{ type.value }}</span></button></div></section>
    <div class="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
      <div class="space-y-5">
        <section class="rounded-3xl border border-line bg-white p-5"><p class="text-xs text-brand">بيانات التكليف</p><h2 class="mt-1 text-lg font-bold">إعداد المحتوى الأساسي</h2><p class="mt-2 text-xs text-muted">عرّف عنوان التكليف ومحتواه الأساسي بما يناسب نوع النشاط المختار.</p><div class="mt-5 grid gap-4 sm:grid-cols-[2fr_1fr]"><label class="text-sm font-bold">اسم التكليف<input v-model="draft.title" required pattern=".*\S.*" maxlength="180" class="builder-input" /></label><label class="text-sm font-bold">الأسبوع المستهدف<select v-model.number="draft.week" class="builder-input"><option v-for="week in 12" :key="week" :value="week">الأسبوع {{ week }}</option></select></label></div><div class="mt-4 rounded-xl bg-brand/5 p-4"><h3 class="text-sm font-bold text-brand">آلية احتساب الوزن</h3><p class="mt-1 text-xs text-muted">{{ draft.type === 'reading' ? 'الوزن محسوب آلياً بنسبة متساوية من الـ 15% المخصصة للتكاليف القرائية.' : draft.type === 'listening' ? 'وزن التكليف السماعي 2.5% على مستوى البرنامج.' : 'حدد وزن التكليف الاختياري.' }}</p><label v-if="draft.type === 'optional'" class="mt-3 block text-xs">الوزن (%)<input v-model.number="draft.bonusWeight" type="number" min="0.1" max="100" step="0.1" required class="builder-input" /></label></div></section>
        <section class="space-y-4 rounded-3xl border border-line bg-white p-5"><header class="flex flex-wrap items-center justify-between gap-4"><div><p class="text-xs text-brand">مصمم الاختبار</p><h2 class="mt-1 text-lg font-bold">بناء الأسئلة التفاعلية</h2><p class="mt-2 text-xs text-muted">أنشئ أسئلة صح وخطأ، اختيار من متعدد، وأسئلة مقالية.</p></div><div class="flex gap-2"><select v-model="questionType" aria-label="نوع السؤال الجديد" class="builder-input !mt-0 !w-auto"><option v-for="(label, type) in questionLabels" :key="type" :value="type">{{ label }}</option></select><button type="button" class="inline-flex items-center gap-2 rounded-xl bg-brand px-3 text-sm font-bold text-white" @click="draft.questions.push(newQuestion(questionType))"><Plus :size="16" />إضافة سؤال</button></div></header><AssignmentQuestionEditor v-for="(question,index) in draft.questions" :key="question.id" v-model="draft.questions[index]!" :number="index+1" @remove="draft.questions.splice(index,1)" /></section>
        <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4"><div><h2 class="text-sm font-bold">تجربة النموذج والمعاينة</h2><p class="mt-1 text-xs text-muted">افتح نسخة الطالب لاختبار الأسئلة والتفاعل قبل النشر.</p></div><button type="button" disabled title="المعاينة ستُضاف بعد توفير تصميمها" class="inline-flex cursor-default! items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs text-brand"><Eye :size="16" />تجربة النموذج والمعاينة</button></div>
        <AssignmentDeliverySettings v-model="draft" />
      </div>
      <aside class="space-y-5 xl:sticky xl:top-0"><section class="rounded-3xl border border-line bg-white p-5"><h2 class="flex items-center gap-2 text-base font-bold"><ClipboardCheck :size="20" class="text-brand" />ملخص التكليف</h2><p class="mt-1 text-xs text-muted">يتحدث تلقائياً</p><dl class="mt-4 space-y-2"><div v-for="item in [{ label: 'النوع', value: assignmentTypeLabels[draft.type] }, { label: 'الأسبوع', value: draft.week }, { label: 'عدد الأسئلة', value: draft.questions.length }, { label: 'الوزن', value: `${weight}%` }]" :key="item.label" class="flex justify-between gap-2 rounded-xl bg-slate-50 p-3 text-xs"><dt class="text-muted">{{ item.label }}</dt><dd class="font-bold">{{ item.value }}</dd></div></dl><div class="mt-4 rounded-xl bg-brand/5 p-3 text-brand"><h3 class="text-sm font-bold">جاهز للبناء</h3><p class="mt-1 text-xs leading-5">أضف الأسئلة ثم اختبر النموذج قبل النشر.</p></div></section><section class="space-y-3 rounded-3xl border border-line bg-white p-5"><h2 class="text-base font-bold">الحفظ والنشر</h2><p class="text-xs text-muted">راجع الحقول المطلوبة قبل اعتماد التكليف.</p><button type="button" class="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-line text-sm" @click="saveDraft"><Save :size="16" />حفظ كمسودة</button><button type="submit" class="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white"><Send :size="16" />حفظ ونشر التكليف</button><p class="text-xs leading-6 text-muted">بمجرد النشر سيصبح التكليف متاحاً وفق تاريخ النشر والجدولة المحددين.</p><p v-if="error" role="alert" class="text-sm text-red-700">{{ error }}</p><p v-if="notice" role="status" class="text-sm text-brand">{{ notice }}</p></section></aside>
    </div>
  </form>
</template>
<style>
.assignment-builder .builder-input { display:block; width:100%; min-height:44px; margin-top:8px; border:1px solid var(--color-line); border-radius:12px; padding:10px 12px; background:white; color:var(--color-ink); font-size:var(--text-sm); font-weight:400; outline-color:var(--color-brand); }
</style>
