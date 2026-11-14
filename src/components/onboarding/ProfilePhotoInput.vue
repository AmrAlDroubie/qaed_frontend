<script setup lang="ts">
import { ref } from 'vue'
import { Camera, Image as ImageIcon } from '@lucide/vue'
defineProps<{ error?: string }>()
const photo = defineModel<string>({ required: true })
const input = ref<HTMLInputElement>()
const fileError = ref('')
const loading = ref(false)
let selection = 0
async function select(file?: File) {
  if (!file) return
  const current = ++selection
  loading.value = false
  fileError.value = ''
  if (!['image/jpeg', 'image/png'].includes(file.type)) { fileError.value = 'اختر صورة بصيغة JPG أو PNG.'; return }
  if (file.size > 5 * 1024 * 1024) { fileError.value = 'حجم الصورة يجب ألا يتجاوز 5 ميجابايت.'; return }
  loading.value = true
  try {
    const result = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    await new Promise<void>((resolve, reject) => { const image = new window.Image(); image.onload = () => resolve(); image.onerror = reject; image.src = result })
    if (current === selection) photo.value = result
  } catch { if (current === selection) fileError.value = 'تعذر قراءة الصورة. اختر صورة أخرى.' }
  finally { if (current === selection) loading.value = false }
}
function change(event: Event) { const element = event.target as HTMLInputElement; void select(element.files?.[0]); element.value = '' }
</script>

<template>
  <div>
    <button type="button" class="flex min-h-[244px] w-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed p-5 text-center focus-visible:outline-brand" :class="photo ? 'border-brand/40 bg-brand/[0.02]' : 'border-red-300 bg-red-50/30'" :aria-invalid="Boolean(error || fileError)" aria-describedby="profile-photo-hint profile-photo-error" @click="input?.click()" @dragover.prevent @drop.prevent="select($event.dataTransfer?.files[0])">
      <img v-if="photo" :src="photo" alt="معاينة الصورة الشخصية" class="size-24 rounded-2xl object-cover" />
      <span v-else class="flex size-16 items-center justify-center rounded-3xl bg-white text-brand"><Camera :size="28" /></span>
      <span class="text-sm font-bold">{{ loading ? 'جارٍ تجهيز الصورة...' : photo ? 'تغيير الصورة الشخصية' : 'رفع الصورة الشخصية' }}</span>
      <span class="text-xs font-light text-muted">اسحب الصورة هنا أو انقر للاختيار</span>
      <span v-if="!photo" class="rounded-full border border-red-200 bg-white px-4 py-1 text-xs text-red-600">إجباري رفع صورة شخصية</span>
    </button>
    <input ref="input" type="file" accept="image/jpeg,image/png" class="hidden" aria-label="رفع الصورة الشخصية" @change="change" />
    <p id="profile-photo-hint" class="mt-2 flex items-center justify-center gap-2 text-caption font-light text-muted"><ImageIcon :size="14" />JPG / PNG · حتى 5 ميجابايت</p>
    <p id="profile-photo-error" role="alert" class="mt-2 text-xs text-red-700">{{ fileError || error }}</p>
  </div>
</template>
