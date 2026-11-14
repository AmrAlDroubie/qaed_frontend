<script setup lang="ts">
import { ref } from 'vue'
import { X } from '@lucide/vue'
const props = defineProps<{ id: string; label: string; placeholder: string }>()
const tags = defineModel<string[]>({ required: true })
const input = ref('')
const notice = ref('')
function add() {
  const value = input.value.trim()
  if (!value) return
  if (tags.value.some(tag => tag.toLocaleLowerCase() === value.toLocaleLowerCase())) { notice.value = 'تمت إضافة هذا العنصر مسبقًا.'; return }
  tags.value = [...tags.value, value]
  input.value = ''
  notice.value = ''
}
</script>

<template>
  <div>
    <label :for="props.id" class="block text-sm font-bold">{{ label }}</label>
    <p :id="`${id}-hint`" class="mb-3 mt-1 text-xs font-light text-muted">اكتب {{ label === 'المهارات' ? 'مهارة' : 'اهتمامًا' }} واضغط Enter لإضافته.</p>
    <div class="rounded-2xl border border-line bg-slate-50 p-3">
      <ul v-if="tags.length" class="mb-3 flex flex-wrap gap-2"><li v-for="(tag, index) in tags" :key="tag" class="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1 text-xs text-slate-600">{{ tag }}<button type="button" :aria-label="`حذف ${tag}`" class="rounded-full p-1 text-slate-400 hover:text-red-600" @click="tags = tags.filter((_, i) => i !== index)"><X :size="12" /></button></li></ul>
      <div class="flex gap-2"><input :id="id" v-model="input" :placeholder="placeholder" :aria-describedby="`${id}-hint`" maxlength="60" class="min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2 text-sm outline-brand placeholder:font-light placeholder:text-slate-400" @keydown.enter.prevent="add" /><button type="button" class="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark" @click="add">إضافة</button></div>
    </div>
    <p v-if="notice" role="status" class="mt-2 text-xs text-muted">{{ notice }}</p>
  </div>
</template>
