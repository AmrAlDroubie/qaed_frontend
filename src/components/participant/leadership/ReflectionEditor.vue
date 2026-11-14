<script setup lang="ts">
import { computed } from 'vue'
defineProps<{ id: string; readonly?: boolean }>()
const answer = defineModel<string>({ required: true })
const words = computed(() => answer.value.trim() ? answer.value.trim().split(/\s+/u).length : 0)
</script>

<template>
  <div class="rounded-2xl bg-slate-50 p-4 sm:p-5"><div class="mb-3 flex items-center justify-between gap-3"><label :for="id" class="text-sm font-bold">إجابتك</label><span class="text-xs text-muted">{{ words }} كلمة · {{ answer.length }} حرف</span></div><textarea :id="id" v-model="answer" :readonly="readonly" rows="10" maxlength="20000" placeholder="اكتب إجابتك هنا" class="block min-h-[260px] w-full resize-y rounded-2xl border border-line bg-white p-5 text-base leading-8 outline-brand placeholder:text-sm placeholder:text-slate-400" /></div>
</template>
