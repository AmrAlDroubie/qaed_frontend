<script setup lang="ts">
import { ref } from 'vue'
import { UploadCloud, X } from '@lucide/vue'
defineProps<{ readonly?: boolean }>()
const files = defineModel<File[]>({ required: true })
const input = ref<HTMLInputElement>()
const error = ref('')
function add(list?: FileList | null) {
  error.value = ''
  for (const file of Array.from(list ?? [])) {
    if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type) || file.size > 10 * 1024 * 1024) { error.value = 'اختر PDF أو PNG أو JPG بحجم لا يتجاوز 10MB.'; continue }
    if (!files.value.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) files.value.push(file)
  }
}
function change(event: Event) { const target = event.target as HTMLInputElement; add(target.files); target.value = '' }
</script>
<template>
  <section><div class="mb-4 flex justify-between gap-3"><div><h3 class="text-sm font-bold">مرفقات إضافية</h3><p class="mt-1 text-xs text-muted">يمكنك رفع PDF أو صورة للملاحظات المكتوبة أو مخطط داعم للإجابة.</p></div><span class="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs text-muted">اختياري</span></div><button type="button" :disabled="readonly" class="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-brand/30 bg-white p-5" @click="input?.click()" @dragover.prevent @drop.prevent="!readonly && add($event.dataTransfer?.files)"><span class="rounded-2xl bg-brand/5 p-3 text-brand"><UploadCloud :size="26" /></span><span class="text-sm font-bold">اسحب الملف وأفلته هنا</span><span class="text-xs text-muted">أو اضغط لاختيار ملف من جهازك</span><span class="text-xs text-muted" dir="ltr">PDF, PNG, JPG — حتى 10MB</span></button><input ref="input" type="file" multiple accept="application/pdf,image/png,image/jpeg" class="hidden" @change="change" /><ul v-if="files.length" class="mt-3 space-y-2"><li v-for="(file,index) in files" :key="index" class="flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-3 text-sm"><span class="break-all">{{ file.name }}</span><button v-if="!readonly" type="button" :aria-label="`إزالة ${file.name}`" @click="files.splice(index,1)"><X :size="16" /></button></li></ul><p v-if="error" role="alert" class="mt-2 text-xs text-red-700">{{ error }}</p></section>
</template>
