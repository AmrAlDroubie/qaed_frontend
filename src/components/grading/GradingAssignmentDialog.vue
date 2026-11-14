<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ArrowLeft, ArrowRight, Bot, CalendarCheck, Check, Paperclip, RotateCcw, X } from '@lucide/vue'
import { useOutsideClick } from '../../composables/useOutsideClick'
import type { GradingSubmission, GradingStatus } from '../../data/grading'

const props = defineProps<{ submission: GradingSubmission }>()
const emit = defineEmits<{ close: []; save: [decision: { status: GradingStatus; score: number; notes: string; overrideAi: boolean; next: boolean }] }>()
const readonly = computed(() => props.submission.status !== 'pending')
const dialog = ref<HTMLDialogElement>()
const score = ref(String(props.submission.manualGrade ?? props.submission.manualScore))
const notes = ref(props.submission.supervisorNotes ?? '')
const overrideAi = ref(props.submission.aiOverride ?? false)
const numericScore = computed(() => Number(score.value) || 0)
const rawScore = computed(() => props.submission.automaticScore + numericScore.value)
const finalAutoScore = computed(() => rawScore.value * (overrideAi.value ? 1 : (100 - props.submission.aiDeduction) / 100))
const validScore = computed(() => score.value !== '' && Number.isFinite(Number(score.value)) && numericScore.value >= 0 && numericScore.value <= props.submission.maxManualScore)
const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
function decide(status: GradingStatus, next = false) {
  if (readonly.value) return
  if (status === 'graded' && !validScore.value) return
  emit('save', { status, score: numericScore.value, notes: notes.value.trim(), overrideAi: overrideAi.value, next })
}

</script>

<template>
  <dialog ref="dialog" dir="rtl" aria-labelledby="grading-dialog-title" class="grading-drawer m-0 ml-auto flex h-dvh max-h-dvh w-full max-w-[680px] flex-col overflow-hidden border-0 bg-white p-0 text-ink shadow-2xl backdrop:bg-slate-950/40" @close="emit('close')" @cancel.prevent="dialog?.close()">
    <header class="flex min-h-[74px] shrink-0 items-center justify-between border-b border-slate-100 px-5 py-3 sm:px-7">
      <div class="flex items-center gap-3"><span class="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand"><CalendarCheck :size="21" /></span><div><p class="text-fine font-bold text-brand">{{ readonly ? 'استعراض التسليم' : 'التصحيح التفاعلي' }}</p><h2 id="grading-dialog-title" class="text-base font-bold">{{ submission.title }}</h2><p class="text-fine text-muted">{{ submission.participant }} • المجموعة {{ submission.group }}</p></div></div>
      <button type="button" class="flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50" aria-label="إغلاق" @click="dialog?.close()"><X :size="20" /></button>
    </header>
    <div class="min-h-0 flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-4 sm:p-5">
      <section class="flex items-center justify-between rounded-2xl border border-teal-100 bg-teal-50/80 p-4"><div><p class="font-bold text-ink">التسليم ضمن الموعد</p><p class="mt-1 text-fine text-muted">{{ submission.title }}</p></div><span class="flex size-8 items-center justify-center rounded-full bg-white text-brand"><Check :size="16" /></span></section>
      <section class="space-y-3 rounded-[20px] border border-line bg-white p-4 sm:p-5">
        <header class="flex items-center justify-between"><div><p class="text-fine font-bold text-violet-700">تصحيح يدوي</p><h3 class="font-bold">الإجابة المقالية</h3></div><span class="rounded-full bg-slate-100 px-3 py-1 text-fine font-bold text-muted">{{ submission.maxManualScore }} درجات</span></header>
        <div class="rounded-2xl bg-slate-50 p-4"><p class="mb-2 text-fine font-bold text-slate-400">إجابة الطالب</p><p class="text-sm leading-7 text-slate-700">{{ submission.answer }}</p></div>
        <div class="flex items-center justify-between gap-3 rounded-2xl border border-line p-3"><span class="flex min-w-0 items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-brand"><Paperclip :size="18" /></span><span class="min-w-0"><span class="block truncate text-sm font-bold">{{ submission.attachment }}</span><span class="text-fine text-muted">مرفق الطالب</span></span></span><button type="button" disabled title="ملف تجريبي غير مرفق" class="rounded-xl border border-line px-3 py-2 text-fine text-muted opacity-60">عرض</button></div>
        <label for="manual-score" class="block text-sm font-bold">الدرجة اليدوية</label>
        <div class="flex gap-2"><input id="manual-score" v-model="score" :readonly="readonly" type="number" inputmode="decimal" min="0" :max="submission.maxManualScore" step="0.1" :aria-invalid="!validScore" class="h-14 min-w-0 flex-1 rounded-[14px] border border-line bg-white px-4 text-center text-lg font-bold" /><span class="flex items-center justify-center rounded-2xl bg-slate-50 px-5 text-sm font-bold text-muted">/ {{ submission.maxManualScore.toFixed(1) }}</span></div>
        <p v-if="!validScore" class="text-xs text-red-600" role="alert">أدخل درجة بين 0 و{{ submission.maxManualScore }}.</p>
      </section>
      <section class="space-y-4 rounded-[20px] border border-line bg-white p-4 sm:p-5">
        <header class="flex items-center gap-3"><span class="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><Bot :size="20" /></span><div><h3 class="font-bold">إفصاح الذكاء الاصطناعي</h3><p class="text-fine text-violet-700">مستوى {{ submission.aiLevel }} — خصم {{ submission.aiDeduction }}% تلقائي</p></div></header>
        <div class="flex items-center justify-between rounded-2xl bg-violet-50 p-4"><div class="flex-1"><p class="text-fine font-bold text-violet-700">قبل الخصم</p><p class="text-lg font-bold text-violet-900">{{ fmt(rawScore) }}</p></div><ArrowLeft :size="18" class="mx-4 text-violet-500" /><div class="flex-1 text-left"><p class="text-fine font-bold text-violet-700">بعد الخصم</p><p class="text-2xl font-bold text-violet-900">{{ fmt(finalAutoScore) }}</p></div></div>
        <label class="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line p-4"><span><span class="block font-bold">تجاوز الخصم التلقائي</span><span class="mt-1 block text-fine text-muted">يمنح الدرجة قبل الخصم عند وجود مبرر مناسب.</span></span><span class="relative shrink-0"><input v-model="overrideAi" :disabled="readonly" type="checkbox" role="switch" class="peer sr-only" /><span class="block h-[29px] w-[52px] rounded-full bg-slate-300 transition-colors peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand" /><span class="pointer-events-none absolute right-1 top-1 size-[21px] rounded-full bg-white shadow transition-transform peer-checked:-translate-x-[23px]" /></span></label>
      </section>
      <section class="space-y-2 rounded-[20px] border border-line bg-white p-4 sm:p-5"><label for="grader-notes" class="block text-sm font-bold">ملاحظات المشرف</label><textarea id="grader-notes" v-model="notes" :readonly="readonly" rows="5" placeholder="اكتب التغذية الراجعة..." class="w-full resize-y rounded-[14px] border border-line bg-white p-4 text-sm leading-7 placeholder:text-slate-400" /></section>
    </div>
    <footer class="grid shrink-0 grid-cols-1 gap-2 border-t border-line bg-white p-3 sm:grid-cols-3 sm:p-4">
      <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl sm:order-3 border border-line px-3 text-sm font-bold text-slate-700" @click="dialog?.close()"><X :size="16" />{{ readonly ? 'إغلاق' : 'إلغاء' }}</button>
      <button v-if="!readonly" type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl sm:order-2 border border-amber-200 bg-amber-50 px-3 text-sm font-bold text-amber-800" @click="decide('resubmit')"><RotateCcw :size="16" />طلب إعادة التسليم</button>
      <button v-if="!readonly" type="button" :disabled="!validScore" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl sm:order-1 bg-brand px-3 text-sm font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50" @click="decide('graded', true)">حفظ وتمرير للتالي<ArrowRight :size="17" /></button>
    </footer>
  </dialog>
</template>

<style>
.grading-drawer[open] { position: fixed; inset-block: 0; left: 0; right: auto; margin: 0 auto 0 0; }
</style>
