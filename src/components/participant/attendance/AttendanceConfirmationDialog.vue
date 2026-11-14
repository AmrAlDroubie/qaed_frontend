<script setup lang="ts">
import { useOutsideClick } from '../../../composables/useOutsideClick'
import { computed, onMounted, ref } from 'vue'
import { X } from '@lucide/vue'
const props = defineProps<{ action: 'attendance' | 'departure' }>()
const emit = defineEmits<{ close: []; confirm: [] }>()
const dialog = ref<HTMLDialogElement>()
const departure = computed(() => props.action === 'departure')
const label = computed(() => departure.value ? 'الانصراف' : 'الحضور')
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
</script>

<template>
  <dialog ref="dialog" dir="rtl" aria-labelledby="attendance-confirm-title" aria-describedby="attendance-confirm-description" class="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[940px] overflow-y-auto rounded-[26px] bg-white p-0 text-ink shadow-[0_30px_80px_rgba(2,6,23,0.24)] backdrop:bg-black/80" @close="emit('close')" @keydown.esc.stop>
    <header class="flex min-h-[73px] items-center justify-between gap-4 border-b border-slate-100 px-5 py-[15px]"><h2 id="attendance-confirm-title" class="text-base font-bold leading-7">تأكيد تسجيل {{ label }}</h2><button type="button" class="flex size-[42px] shrink-0 items-center justify-center rounded-[13px] border border-line bg-white text-slate-600 hover:bg-slate-50" aria-label="إغلاق" @click="dialog?.close()"><X :size="15" aria-hidden="true" /></button></header>
    <div class="space-y-4 p-5"><div class="rounded-[14px] border border-green-200 bg-emerald-50 p-3 text-green-800"><p class="text-sm font-bold">أنت على وشك تسجيل {{ label }}</p><p id="attendance-confirm-description" class="mt-1 text-sm font-light leading-6">سيتم حفظ وقت تسجيل {{ departure ? 'الخروج' : 'الدخول' }} وتحديد حالتك تلقائيًا.</p></div><footer class="flex flex-wrap gap-2"><button type="button" autofocus class="min-h-[45px] rounded-[14px] border border-line bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50" @click="dialog?.close()">إلغاء</button><button type="button" class="min-h-[45px] rounded-[14px] px-4 py-2.5 text-sm font-bold text-white" :class="departure ? 'bg-[#dd5353] hover:bg-red-600' : 'bg-brand hover:bg-brand-dark'" @click="emit('confirm')">تأكيد {{ label }}</button></footer></div>
  </dialog>
</template>
