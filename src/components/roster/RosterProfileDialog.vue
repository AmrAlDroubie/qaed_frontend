<script setup lang="ts">
import { useOutsideClick } from '../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { X } from '@lucide/vue'
import { rosterRoleLabels, type RosterMember } from '../../types/roster'
defineProps<{ member: RosterMember }>()
const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement>()
useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
</script>

<template>
  <dialog ref="dialog" dir="rtl" aria-labelledby="profile-title" class="m-auto w-[calc(100%-32px)] max-w-lg rounded-3xl border border-line bg-white p-6 text-ink shadow-xl backdrop:bg-slate-950/40" @close="emit('close')">
    <div class="mb-6 flex items-center justify-between"><p class="text-sm font-bold text-brand">الملف العام</p><button type="button" autofocus class="rounded-xl border border-line p-2 text-muted" aria-label="إغلاق الملف" @click="dialog?.close()"><X :size="18" /></button></div>
    <img :src="member.avatar" alt="" class="mb-4 size-20 rounded-3xl object-cover" />
    <h2 id="profile-title" class="text-xl font-bold">{{ member.name }}</h2>
    <p class="mt-2 text-sm text-brand">{{ rosterRoleLabels[member.role] }} · <span dir="ltr">{{ member.mbti }}</span></p>
    <p class="my-5 text-sm leading-7 text-muted">{{ member.bio }}</p>
    <h3 class="mb-3 text-sm font-bold">الاهتمامات والخبرات</h3>
    <ul class="flex flex-wrap gap-2"><li v-for="interest in member.interests" :key="interest" class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{{ interest }}</li></ul>
  </dialog>
</template>
