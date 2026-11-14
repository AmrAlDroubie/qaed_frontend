<script setup lang="ts">
import { useOutsideClick } from '../../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { LockKeyhole, Rocket, X } from '@lucide/vue'
import type { Batch, BatchDraft, BatchPlanMode } from '../../../types/batches'
const props = defineProps<{ action: 'launch' | 'archive'; batches: Batch[]; mode: BatchPlanMode; current?: Batch; error: string }>()
const emit = defineEmits<{ close: []; launch: [draft: BatchDraft]; archive: [] }>()
const dialog = ref<HTMLDialogElement>()
const year = Math.max(...props.batches.map(batch => batch.year)) + 1
const draft = ref<BatchDraft>({ name: `دفعة قائد ${year}`, year, mode: props.mode, sourceId: props.batches[props.batches.length - 1]?.id ?? '' })
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
</script>

<template>
  <dialog ref="dialog" dir="rtl" aria-labelledby="batch-dialog-title" class="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-xl overflow-y-auto rounded-3xl border border-line bg-white p-6 text-ink shadow-2xl backdrop:bg-slate-950/35" @close="emit('close')">
    <header class="mb-6 flex items-start justify-between gap-3"><div><span class="mb-3 inline-flex rounded-xl bg-brand/10 p-3 text-brand"><component :is="action === 'launch' ? Rocket : LockKeyhole" :size="24" /></span><h2 id="batch-dialog-title" class="text-xl font-bold">{{ action === 'launch' ? 'إطلاق دفعة جديدة' : 'إغلاق الدورة وترحيلها للأرشيف' }}</h2></div><button type="button" class="rounded-xl border border-line p-2 text-muted" aria-label="إغلاق" @click="dialog?.close()"><X :size="20" /></button></header>
    <form class="space-y-5" @submit.prevent="action === 'launch' ? emit('launch', draft) : emit('archive')">
      <template v-if="action === 'launch'">
        <label class="block text-sm font-bold">اسم الدفعة<input v-model="draft.name" autofocus required pattern=".*\S.*" maxlength="100" class="batch-input" /></label>
        <label class="block text-sm font-bold">سنة الدفعة<input v-model.number="draft.year" type="number" required min="2000" max="2100" step="1" class="batch-input" /></label>
        <label class="block text-sm font-bold">خطة الدورة<select v-model="draft.mode" class="batch-input"><option value="import">استيراد هيكل سابق</option><option value="empty">خطة فارغة</option></select></label>
        <label v-if="draft.mode === 'import'" class="block text-sm font-bold">استيراد الخطة من<select v-model="draft.sourceId" required class="batch-input"><option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.name }}</option></select><span class="mt-2 block text-xs font-light leading-5 text-muted">تُنسخ بنية الأسابيع وأهدافها دون بيانات المشاركين أو نتائجهم، وتُعاد جدولة المواعيد للدورة الجديدة.</span></label>
        <p v-if="current" class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">عند تأكيد الإطلاق، سيتم إغلاق «{{ current.name }}» وحفظها في الأرشيف، ثم تفعيل الدفعة الجديدة.</p>
      </template>
      <p v-else class="text-sm leading-7 text-muted">سيتم إغلاق «{{ current?.name }}» وحفظ بياناتها في الأرشيف. يمكنك استخدام هيكل خطتها عند إطلاق دفعة جديدة.</p>
      <p v-if="error" role="alert" class="text-sm text-red-700">{{ error }}</p>
      <footer class="flex flex-wrap justify-end gap-3 border-t border-line pt-5"><button type="button" class="rounded-xl border border-line px-5 py-3 text-sm font-bold text-muted" @click="dialog?.close()">إلغاء</button><button type="submit" class="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark">{{ action === 'launch' ? 'تأكيد إطلاق الدفعة' : 'تأكيد الإغلاق والأرشفة' }}</button></footer>
    </form>
  </dialog>
</template>

<style scoped>
.batch-input { display: block; width: 100%; min-height: 48px; margin-top: 8px; border: 1px solid var(--color-line); border-radius: 12px; background: var(--color-slate-50); padding: 10px 14px; font-size: var(--text-sm); outline-color: var(--color-brand); }
</style>
