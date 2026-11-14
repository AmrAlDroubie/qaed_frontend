<script setup lang="ts">
import { useOutsideClick } from '../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { X } from '@lucide/vue'

const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement>()
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
</script>

<template>
  <dialog
    id="performance-info-dialog"
    ref="dialog"
    dir="rtl"
    aria-labelledby="performance-info-title"
    class="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[940px] overflow-y-auto rounded-[26px] bg-white p-0 text-ink shadow-[0_30px_80px_rgba(2,6,23,0.24)] backdrop:bg-slate-950/25"
    @close="emit('close')"
    @keydown.esc.stop
  >
    <header class="flex min-h-[73px] items-center justify-between gap-4 border-b border-slate-100 px-5 py-[15px]">
      <h2 id="performance-info-title" class="text-base font-bold leading-7">آلية احتساب الدرجات</h2>
      <button type="button" autofocus class="flex size-[42px] shrink-0 items-center justify-center rounded-[13px] border border-line bg-white text-slate-600 hover:bg-slate-50" aria-label="إغلاق آلية احتساب الدرجات" @click="dialog?.close()">
        <X :size="15" aria-hidden="true" />
      </button>
    </header>
    <div class="px-5 pb-5">
      <!-- The supplied Figma design contains a solid content area only. -->
      <div class="aspect-[15/7] max-h-[calc(100dvh-145px)] w-full rounded-xl bg-brand" aria-hidden="true" />
    </div>
  </dialog>
</template>
