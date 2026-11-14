<script setup lang="ts">
import { useOutsideClick } from '../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { CalendarPlus, GripVertical, Plus, Save, X } from '@lucide/vue'
import type { TrainingWeek, WeekDraft } from '../../types/weeks'

const props = defineProps<{ week: TrainingWeek; creating?: boolean }>()
const emit = defineEmits<{ close: []; save: [draft: WeekDraft] }>()
const dialog = ref<HTMLDialogElement>()
const draft = ref<WeekDraft>({ title: props.week.title, date: props.week.date, location: props.week.location, startTime: props.week.startTime, endTime: props.week.endTime, agenda: props.week.agenda.map(item => ({ ...item })) })
const dragged = ref<string>()
const error = ref('')
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
function addAgenda() { draft.value.agenda.push({ id: crypto.randomUUID(), title: '' }) }
function moveAgenda(id: string, targetIndex: number) {
  const items = draft.value.agenda
  const index = items.findIndex(item => item.id === id)
  if (index < 0 || targetIndex < 0 || targetIndex >= items.length) return
  const [item] = items.splice(index, 1)
  if (item) items.splice(targetIndex, 0, item)
}
function dropAgenda(index: number) { if (dragged.value) moveAgenda(dragged.value, index); dragged.value = undefined }
function save() {
  if (draft.value.startTime && draft.value.endTime && draft.value.endTime <= draft.value.startTime) {
    error.value = 'يجب أن يكون وقت نهاية اللقاء بعد وقت البداية.'
    return
  }
  emit('save', { ...draft.value, title: draft.value.title.trim(), location: draft.value.location.trim(), agenda: draft.value.agenda.map(item => ({ ...item, title: item.title.trim() })) })
}
</script>

<template>
  <dialog ref="dialog" class="week-dialog m-auto w-[calc(100%-24px)] max-w-[840px] overflow-hidden rounded-[32px] border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-slate-950/35" dir="rtl" aria-labelledby="week-dialog-title" @close="emit('close')" @cancel.prevent="emit('close')">
    <header class="flex shrink-0 items-start justify-between gap-4 border-b border-line p-6">
      <div><span class="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand"><CalendarPlus :size="16" />محرك الأسابيع</span><h2 id="week-dialog-title" class="text-2xl font-bold">{{ creating ? 'إضافة أسبوع جديد' : 'تعديل تفاصيل الأسبوع' }}</h2><p class="mt-2 text-sm font-light text-muted">عرّف عنوان الأسبوع وهدفه المهاراتي وجدوله الزمني.</p></div>
      <button type="button" class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line text-muted hover:bg-slate-50" aria-label="إغلاق" @click="emit('close')"><X :size="22" /></button>
    </header>
    <form class="flex min-h-0 flex-1 flex-col" @submit.prevent="save">
      <div class="min-h-0 space-y-8 overflow-y-auto p-6">
        <div class="grid gap-5 sm:grid-cols-2">
          <label class="text-base font-bold text-slate-700">رقم الأسبوع<input :value="week.number" readonly class="week-input" /></label>
          <label class="text-base font-bold text-slate-700">عنوان الأسبوع<input v-model="draft.title" required pattern=".*\S.*" maxlength="120" class="week-input border-brand bg-white" /></label>
        </div>
        <section aria-labelledby="agenda-title">
          <div class="mb-4 flex items-start justify-between gap-3"><div><h3 id="agenda-title" class="text-lg font-bold">جدول اللقاء</h3><p class="mt-1 text-sm font-light text-muted">محاور الجلسة لهذا الأسبوع</p></div><button type="button" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-bold text-white hover:bg-brand-dark" @click="addAgenda"><Plus :size="16" />إضافة محور</button></div>
          <ol class="space-y-3">
            <li v-for="(item, index) in draft.agenda" :key="item.id" class="relative flex items-start gap-3.5" @dragover.prevent @drop.prevent="dropAgenda(index)">
              <span class="relative mt-1 flex w-8 shrink-0 justify-center self-stretch" aria-hidden="true"><span v-if="index < draft.agenda.length - 1" class="absolute bottom-[-20px] top-4 w-px bg-line" /><span class="relative size-[30px] rounded-full border-4 border-white bg-brand p-1 shadow-sm"><span class="block size-full rounded-full bg-white" /></span></span>
              <div class="flex min-h-[66px] min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                <input v-model="item.title" required pattern=".*\S.*" :aria-label="`عنوان المحور ${index + 1}`" placeholder="عنوان المحور" class="min-w-0 flex-1 bg-transparent text-base font-bold outline-brand" />
                <button type="button" draggable="true" class="flex size-8 shrink-0 cursor-grab items-center justify-center rounded-xl border border-line text-slate-600 active:cursor-grabbing" :aria-label="`إعادة ترتيب المحور ${index + 1}، استخدم Alt مع الأسهم لأعلى أو لأسفل`" aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown" @dragstart="dragged = item.id" @dragend="dragged = undefined" @keydown.alt.up.prevent="moveAgenda(item.id, index - 1)" @keydown.alt.down.prevent="moveAgenda(item.id, index + 1)"><GripVertical :size="16" /></button>
              </div>
            </li>
          </ol>
        </section>
        <div class="grid gap-5 sm:grid-cols-2">
          <label class="text-base font-bold">المكان<input v-model="draft.location" class="week-input" /></label>
          <label class="text-base font-bold">التاريخ<input v-model="draft.date" type="date" class="week-input" /></label>
          <label class="text-base font-bold">وقت بداية اللقاء<input v-model="draft.startTime" type="time" class="week-input" /></label>
          <label class="text-base font-bold">وقت نهاية اللقاء<input v-model="draft.endTime" type="time" class="week-input" /></label>
        </div>
        <p v-if="error" role="alert" class="text-sm text-red-700">{{ error }}</p>
      </div>
      <footer class="flex shrink-0 justify-end gap-3 border-t border-line bg-slate-50 p-6"><button type="button" class="rounded-2xl border border-line bg-white px-5 py-3 text-sm font-bold text-slate-600" @click="emit('close')">إلغاء</button><button type="submit" class="flex items-center gap-2 rounded-2xl bg-brand px-6 py-3 text-base font-bold text-white hover:bg-brand-dark"><Save :size="18" />حفظ الأسبوع</button></footer>
    </form>
  </dialog>
</template>

<style scoped>
.week-dialog { max-height: calc(100dvh - 32px); }
.week-dialog[open] { display: flex; flex-direction: column; }
.week-input { display: block; width: 100%; height: 54px; margin-top: 8px; border: 1px solid var(--color-line); border-radius: 14px; background: var(--color-slate-50); padding: 0 16px; text-align: right; font-size: var(--text-sm); }
</style>
