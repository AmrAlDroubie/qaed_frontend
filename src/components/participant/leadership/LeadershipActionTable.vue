<script setup lang="ts">
import { Plus } from '@lucide/vue'
import type { LeadershipAction } from '../../../stores/leadershipRecord'
defineProps<{ readonly?: boolean }>()
const rows = defineModel<LeadershipAction[]>({ required: true })
const columns = [{ key: 'action' as const, label: 'الفعل (بحث - مناقشة - تعليم)' }, { key: 'schedule' as const, label: 'الموعد | المدة' }, { key: 'completion' as const, label: 'هل تم؟' }, { key: 'notes' as const, label: 'ملاحظات' }]
function add() { rows.value.push({ id: crypto.randomUUID(), action: '', schedule: '', completion: '', notes: '' }) }
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-line"><div class="overflow-x-auto"><table class="w-full min-w-[650px] table-fixed text-right"><caption class="sr-only">خطة تفعيل ما تعلمت</caption><thead class="bg-brand text-white"><tr><th v-for="column in columns" :key="column.key" scope="col" class="px-3 py-4 text-sm font-bold" :class="column.key === 'action' ? 'w-[40%]' : 'w-[20%]'">{{ column.label }}</th></tr></thead><tbody><tr v-for="(row, index) in rows" :key="row.id"><td v-for="column in columns" :key="column.key" class="border border-line p-2"><textarea v-model="row[column.key]" :readonly="readonly" :aria-label="`${column.label}، الصف ${index + 1}`" rows="2" maxlength="1000" class="block w-full resize-y bg-transparent p-2 text-sm leading-6 outline-brand" /></td></tr></tbody></table></div><button v-if="!readonly" type="button" class="flex min-h-14 w-full items-center justify-center bg-brand text-white hover:bg-brand-dark" aria-label="إضافة فعل جديد" @click="add"><Plus :size="24" /></button></div>
</template>
