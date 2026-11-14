<script setup lang="ts">
import { useOutsideClick } from '../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { Check, CircleCheck, Copy, Mail, Plus, UserRound, X } from '@lucide/vue'

const props = defineProps<{ invitationUrl: string; email: string }>()
const emit = defineEmits<{ close: []; createAnother: [] }>()
const dialog = ref<HTMLDialogElement>()
const linkInput = ref<HTMLInputElement>()
const copied = ref(false)
const feedback = ref('')
const emailSimulated = ref(false)

useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())

async function copyLink() {
  try {
    await navigator.clipboard.writeText(props.invitationUrl)
    copied.value = true
    feedback.value = 'تم نسخ رابط الدعوة التجريبي.'
  } catch {
    copied.value = false
    linkInput.value?.focus()
    linkInput.value?.select()
    feedback.value = 'تعذّر النسخ التلقائي. تم تحديد الرابط لنسخه يدويًا.'
  }
}

function simulateEmail() {
  emailSimulated.value = true
  feedback.value = `تمت محاكاة إرسال الدعوة إلى ${props.email}. لم يتم إرسال بريد فعلي.`
}
</script>

<template>
  <dialog ref="dialog" class="invitation-dialog m-auto w-[calc(100%-24px)] max-w-[768px] overflow-hidden rounded-3xl border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-slate-950/35" dir="rtl" aria-labelledby="invitation-title" aria-describedby="invitation-description" @close="emit('close')" @cancel.prevent="emit('close')">
    <header class="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-5">
      <div>
        <span class="mb-2 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand"><UserRound :size="16" aria-hidden="true" />إدارة الحسابات</span>
        <h2 id="invitation-title" class="text-xl font-bold leading-7">إنشاء حساب جديد وإرسال الدعوة</h2>
        <p id="invitation-description" class="mt-1 text-sm font-light leading-5 text-muted">أنشئ الحساب ثم ولّد رابط التفعيل بشكل آمن.</p>
      </div>
      <button type="button" class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line text-muted hover:bg-slate-50" aria-label="إغلاق" @click="emit('close')"><X :size="20" /></button>
    </header>

    <div class="flex min-h-0 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-5 sm:px-6">
      <section class="flex items-start gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5" aria-labelledby="invitation-success-title">
        <span class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><CircleCheck :size="24" aria-hidden="true" /></span>
        <div><h3 id="invitation-success-title" class="text-base font-bold leading-6 text-emerald-900">تم إنشاء رابط الدعوة بنجاح</h3><p class="mt-1 text-sm font-light leading-6 text-emerald-800">أصبح رابط التفعيل جاهزاً للمشاركة مع المستخدم.</p></div>
      </section>

      <div>
        <label for="invitation-url" class="mb-2 block text-sm font-bold text-slate-800">رابط الدعوة والتفعيل</label>
        <div class="flex flex-col gap-2 rounded-2xl border border-line bg-slate-50 p-3 sm:flex-row">
          <input id="invitation-url" ref="linkInput" :value="invitationUrl" readonly dir="ltr" aria-describedby="invitation-preview-note" class="h-[46px] min-w-0 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-slate-600" @focus="linkInput?.select()" />
          <button type="button" class="flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-bold text-white hover:bg-brand-dark sm:min-w-[151px]" @click="copyLink"><component :is="copied ? Check : Copy" :size="16" aria-hidden="true" />{{ copied ? 'تم النسخ' : 'نسخ الرابط' }}</button>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <button type="button" class="flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-brand/25 bg-brand/5 px-4 py-3 text-sm font-bold text-brand hover:bg-brand/10" @click="simulateEmail"><component :is="emailSimulated ? Check : Mail" :size="20" class="shrink-0" aria-hidden="true" />{{ emailSimulated ? 'تمت محاكاة الإرسال' : 'إرسال عبر البريد الإلكتروني (Gmail)' }}</button>
        <button type="button" class="flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50" @click="emit('createAnother')"><Plus :size="20" aria-hidden="true" />إنشاء دعوة أخرى</button>
      </div>
      <p v-if="feedback" role="status" class="text-sm text-brand">{{ feedback }}</p>
    </div>

    <footer class="flex shrink-0 items-center justify-between gap-4 border-t border-line bg-slate-50 px-6 py-4">
      <p id="invitation-preview-note" class="text-xs leading-5 text-muted">يمكنك الآن نسخ الرابط أو محاكاة إرساله للمستخدم.<span class="block">رابط تجريبي للمعاينة فقط؛ تفعيل الحساب غير متصل بعد.</span></p>
      <button type="button" class="min-h-[42px] shrink-0 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100" @click="emit('close')">إغلاق</button>
    </footer>
  </dialog>
</template>

<style scoped>
.invitation-dialog { max-height: calc(100dvh - 32px); }
.invitation-dialog[open] { display: flex; flex-direction: column; }
</style>
