<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BookOpen, Bot, ChevronRight, ClipboardPen, Info, Save, Send } from '@lucide/vue'
import { optionalAssignments } from '../../data/optionalAssignments'
import { requiredAssignments } from '../../data/assignments'
import { useRequiredAssignmentStore, type RequiredAssignmentDraft } from '../../stores/requiredAssignment'
import AssignmentAttachments from '../../components/participant/assignments/AssignmentAttachments.vue'
const route = useRoute()
const store = useRequiredAssignmentStore()
const optional = computed(() => route.name === 'participant-optional-detail')
const listPath = computed(() => optional.value ? '/participant/optional-assignments' : '/participant/required-assignments')
const listLabel = computed(() => optional.value ? 'التكاليف الاختيارية' : 'التكاليف الإلزامية')
const draftKey = computed(() => optional.value ? `optional:${String(route.params.id)}` : String(route.params.id))
const assignment = computed(() => {
  if (!optional.value) return requiredAssignments.find(item => item.id === route.params.id)
  const item = optionalAssignments.find(item => item.id === route.params.id)
  return item ? { ...item, kind: item.category === 'استماع' ? 'listening' : 'reading', status: item.status === 'pending' ? 'available' : item.status } : undefined
})
const weight = computed(() => optional.value ? optionalAssignments.find(item => item.id === route.params.id)?.weight : 3)
const draft = ref<RequiredAssignmentDraft>({ answer: '', aiUse: 'none', attachments: [] })
const notice = ref('')
const readonly = computed(() => !assignment.value || !['available', 'overdue'].includes(assignment.value.status))
const typeLabel = computed(() => assignment.value?.kind === 'listening' ? 'السماعي' : 'القرائي')
const answered = computed(() => draft.value.answer.trim() ? 1 : 0)
const words = computed(() => draft.value.answer.trim() ? draft.value.answer.trim().split(/\s+/u).length : 0)
watch(draftKey, () => { const saved = store.drafts[draftKey.value]; draft.value = saved ? { ...saved, attachments: [...saved.attachments] } : { answer: '', aiUse: 'none', attachments: [] }; notice.value = '' }, { immediate: true })
function save() { if (!assignment.value || readonly.value) return; store.save(draftKey.value, draft.value); notice.value = 'تم حفظ المسودة والمرفقات محليًا.' }
</script>
<template>
  <div v-if="assignment" class="mx-auto max-w-[1080px] space-y-6 pb-8 pt-2" dir="rtl">
    <header><RouterLink :to="listPath" class="mb-4 inline-flex items-center gap-2 text-xs text-muted"><ChevronRight :size="18" />{{ listLabel }}</RouterLink><div class="flex flex-wrap items-center justify-between gap-4"><div><p class="text-xs text-brand">الأسبوع الرابع</p><h1 class="mt-2 text-3xl font-bold">اختبار التكليف {{ typeLabel }}</h1></div><div class="flex gap-3 text-xs"><span class="rounded-full bg-emerald-50 p-3 text-brand"><BookOpen :size="14" class="inline" /> الأسبوع 4</span><span class="rounded-xl bg-brand/10 p-3 text-brand">وزن التكليف {{ weight }}%</span></div></div><div class="mt-6 flex justify-between text-xs text-muted"><span>حالة التقدم</span><span>تمت إجابة {{ answered }} من 4 أسئلة</span></div><div role="progressbar" aria-label="تقدم الإجابة" :aria-valuenow="answered" :aria-valuemin="0" :aria-valuemax="4" class="mt-2 h-2 rounded-full bg-brand/10"><div class="h-full rounded-full bg-brand" :style="{ width: `${answered * 25}%` }" /></div><p class="mt-2 text-xs text-brand">{{ answered * 25 }}%</p></header>
    <section class="flex items-center gap-4 rounded-3xl border border-line bg-white p-6"><span class="rounded-2xl bg-brand p-3 text-white"><ClipboardPen :size="26" /></span><div class="flex-1"><p class="text-xs text-brand">{{ optional ? 'التكليف الاختياري' : 'التكليف الإلزامي' }}</p><h2 class="mt-2 text-lg font-bold">{{ assignment.id === 'required-session-03' ? `اختبار التكليف ${typeLabel} - الأسبوع الرابع: صناعة القرار تحت الضغط` : assignment.title }}</h2><p class="mt-2 text-xs leading-6 text-muted">أجب عن جميع الأسئلة بعناية، ثم راجع إجاباتك قبل التسليم النهائي. لا يمكن تعديل الإجابات بعد اعتماد التسليم النهائي.</p></div><div class="rounded-2xl bg-slate-50 p-4 text-center"><p class="text-xs text-muted">عدد الأسئلة</p><p class="mt-2 text-lg font-bold">4</p></div></section>
    <form class="space-y-6" @submit.prevent="save">
      <section class="space-y-6 rounded-3xl border border-line bg-white p-5 sm:p-7"><div class="flex gap-2 text-xs"><span class="rounded-full bg-slate-100 px-3 py-1">3</span><span class="rounded-full bg-slate-100 px-3 py-1 text-muted">سؤال مقالي</span><span class="rounded-full bg-brand/5 px-3 py-1 text-brand">مطلوب شرح مختصر</span></div><h2 class="text-base font-bold leading-8">بناءً على الفصل الثاني من الكتاب المقرر، اشرح باختصار موقفاً قيادياً طبقت فيه آلية الموازنة بين الحزم والتمكين، موضّحاً النتيجة المباشرة.</h2><div class="rounded-2xl bg-slate-50 p-4"><div class="mb-3 flex justify-between text-xs"><label for="required-answer" class="font-bold">إجابتك</label><span class="text-muted">{{ words }} كلمة · {{ draft.answer.length }} حرف</span></div><textarea id="required-answer" v-model="draft.answer" :readonly="readonly" maxlength="2000" rows="12" placeholder="اكتب إجابتك هنا بوضوح واختصار، مع ذكر الموقف والقرار والنتيجة المباشرة..." class="w-full resize-y rounded-2xl border border-line bg-white p-5 text-base leading-8 outline-brand placeholder:text-sm placeholder:text-slate-400" /><div class="mt-3 flex justify-between text-xs text-muted"><span>الحد الأعلى 2000 حرف</span><span>متبقي {{ 2000 - draft.answer.length }} حرف</span></div></div><AssignmentAttachments v-model="draft.attachments" :readonly="readonly" /></section>
      <section class="rounded-3xl border border-line bg-white p-6"><header class="mb-5 flex items-center gap-3"><span class="rounded-xl bg-violet-50 p-3 text-violet-600"><Bot :size="26" /></span><div class="flex-1"><h2 class="text-lg font-bold">إفصاح الذكاء الاصطناعي</h2><p class="mt-1 text-xs text-muted">حدّد مستوى المساعدة التي استخدمتها في كتابة الجزء المقالي من التكليف.</p></div><span class="rounded-full bg-violet-50 px-3 py-1 text-xs text-violet-600">مطلوب</span></header><div class="mb-4 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-amber-700"><Info :size="18" class="shrink-0" /><div><h3 class="text-sm font-bold">كيف يؤثر مستوى الاستخدام؟</h3><p class="mt-1 text-xs leading-6">الإفصاح يساعد المنصة على تطبيق قواعد الخصم الآلي الخاصة بالتقييم، بحسب مستوى الاعتماد على أدوات الذكاء الاصطناعي في الجزء المقالي.</p></div></div><label class="sr-only" for="ai-use">مستوى استخدام الذكاء الاصطناعي</label><select id="ai-use" v-model="draft.aiUse" :disabled="readonly" class="min-h-12 w-full rounded-xl border border-line bg-white px-4 text-sm"><option value="none">لم أستخدم الذكاء الاصطناعي — خصم ٠٪</option></select></section>
      <footer class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-white p-5"><div><h2 class="text-sm font-bold">قبل التسليم</h2><p class="mt-1 text-xs text-muted">يمكنك حفظ إجاباتك كمسودة والعودة لإكمالها لاحقاً.</p></div><div class="flex flex-wrap gap-3"><button type="submit" :disabled="readonly" class="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm disabled:opacity-50"><Save :size="17" />حفظ كمسودة</button><button type="button" disabled title="بانتظار إضافة بقية أسئلة التكليف" class="inline-flex cursor-default! items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"><Send :size="17" />تسليم الاختبار والتكليف النهائي</button></div><p v-if="notice" role="status" class="w-full text-sm text-brand">{{ notice }}</p></footer>
    </form>
  </div>
</template>
