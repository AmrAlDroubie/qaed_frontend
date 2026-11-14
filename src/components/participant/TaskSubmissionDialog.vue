<script setup lang="ts">
import { useOutsideClick } from '../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { Send, X } from '@lucide/vue'
import type { ParticipantTask } from '../../data/participant'
defineProps<{ task: ParticipantTask }>()
const emit = defineEmits<{ close: []; submit: [text: string, fileName: string] }>()
const dialog = ref<HTMLDialogElement>()
const answer = ref('')
const fileName = ref('')
const error = ref('')
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
function selectFile(event: Event) { fileName.value = (event.target as HTMLInputElement).files?.[0]?.name ?? '' }
function submit() {
  if (!answer.value.trim() && !fileName.value) { error.value = 'أضف إجابتك أو اختر ملفًا للتسليم.'; return }
  emit('submit', answer.value, fileName.value)
}
</script>

<template>
  <dialog ref="dialog" dir="rtl" aria-labelledby="submission-title" class="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-xl overflow-y-auto rounded-3xl border border-line bg-white p-6 text-ink shadow-2xl backdrop:bg-slate-950/35" @close="emit('close')">
    <header class="mb-5 flex justify-between gap-4"><div><p class="mb-2 text-sm font-bold text-brand">{{ task.category }}</p><h2 id="submission-title" class="text-2xl font-bold">{{ task.title }}</h2><p class="mt-2 text-sm text-muted">{{ task.deadline }} · الوزن {{ task.weight }}%</p></div><button type="button" class="h-fit rounded-xl border border-line p-2 text-muted" aria-label="إغلاق" @click="dialog?.close()"><X :size="20" /></button></header>
    <form class="space-y-5" @submit.prevent="submit">
      <label class="block text-base font-bold">إجابتك<textarea v-model="answer" autofocus rows="5" maxlength="10000" class="mt-2 block w-full resize-y rounded-2xl border border-line bg-slate-50 p-3 text-base font-normal outline-brand" placeholder="اكتب إجابتك هنا..." /></label>
      <label class="block text-base font-bold">إرفاق ملف<input type="file" class="mt-2 block w-full rounded-xl border border-line p-3 text-sm font-normal file:me-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-brand" @change="selectFile" /></label>
      <p class="text-sm leading-5 text-muted">تسليم تجريبي محلي؛ لا تُرفع الملفات إلى الخادم في هذه المرحلة.</p>
      <p v-if="error" role="alert" class="text-base text-red-700">{{ error }}</p>
      <footer class="flex justify-end gap-3 border-t border-line pt-4"><button type="button" class="rounded-xl border border-line px-4 py-3 text-base text-muted" @click="dialog?.close()">إلغاء</button><button type="submit" class="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-base font-bold text-white hover:bg-brand-dark"><Send :size="16" />تسليم المهمة</button></footer>
    </form>
  </dialog>
</template>
