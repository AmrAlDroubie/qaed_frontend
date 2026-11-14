<script setup lang="ts">
import { useOutsideClick } from '../../composables/useOutsideClick'
import { onMounted, ref } from 'vue'
import { Info, Link, Mail, UserRound, X } from '@lucide/vue'
import type { Account, AccountDraft, SupervisorRole } from '../../types/admin'
import { supervisorRoles } from '../../data/supervisorRoles'
import AccountTypePicker from './AccountTypePicker.vue'
import SupervisorRolesPicker from './SupervisorRolesPicker.vue'

const props = defineProps<{ account?: Account }>()
const emit = defineEmits<{ close: []; save: [draft: AccountDraft] }>()
const dialog = ref<HTMLDialogElement>()
const draft = ref<AccountDraft>({ name: props.account?.name ?? '', email: props.account?.email ?? '', role: props.account?.role ?? 'supervisor', subrole: props.account?.subrole ?? '' })
const selectedRoles = ref<SupervisorRole[]>(props.account?.subroles
  ? [...props.account.subroles]
  : supervisorRoles.filter(role => role.badge === props.account?.subrole).map(role => role.id))

useOutsideClick(dialog, () => dialog.value?.close())
onMounted(() => dialog.value?.showModal())
function save() {
  const subroles = draft.value.role === 'supervisor' ? [...selectedRoles.value] : []
  emit('save', {
    ...draft.value,
    name: draft.value.name.trim(),
    email: draft.value.email.trim(),
    subroles,
    subrole: supervisorRoles.filter(role => subroles.includes(role.id)).map(role => role.badge).join('، '),
  })
}
</script>

<template>
  <dialog ref="dialog" class="account-dialog m-auto w-[calc(100%-24px)] max-w-[693px] overflow-hidden rounded-[22px] border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-slate-950/35" dir="rtl" aria-labelledby="account-dialog-title" aria-describedby="account-dialog-description" @close="emit('close')" @cancel.prevent="emit('close')">
    <header class="flex shrink-0 items-start justify-between gap-4 border-b border-line px-[22px] py-[18px]">
      <div>
        <span class="mb-2 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-fine font-bold text-brand"><UserRound :size="14" aria-hidden="true" />إدارة الحسابات</span>
        <h2 id="account-dialog-title" class="text-lg font-bold leading-7">{{ account ? 'تعديل الحساب والأدوار' : 'إنشاء حساب جديد وإرسال الدعوة' }}</h2>
        <p id="account-dialog-description" class="mt-1 text-table font-light leading-5 text-muted">{{ account ? 'حدّث بيانات الحساب والأدوار الفرعية للمشرف.' : 'أنشئ الحساب ثم ولّد رابط التفعيل بشكل آمن.' }}</p>
      </div>
      <button type="button" aria-label="إغلاق" class="flex size-9 shrink-0 items-center justify-center rounded-[11px] border border-line text-muted hover:bg-slate-50" @click="emit('close')"><X :size="18" /></button>
    </header>

    <form class="flex min-h-0 flex-1 flex-col" @submit.prevent="save">
      <div class="flex min-h-0 flex-1 flex-col gap-[22px] overflow-y-auto px-4 py-[18px] sm:px-7">
        <AccountTypePicker v-model="draft.role" />
        <div>
          <label for="account-email" class="mb-2 block text-table font-bold text-slate-800">البريد الإلكتروني</label>
          <div class="relative"><Mail :size="18" class="pointer-events-none absolute right-3.5 top-3.5 text-slate-400" aria-hidden="true" /><input id="account-email" v-model="draft.email" required type="email" autocomplete="email" placeholder="حساب Gmail الخاص بالمنضم (e.g. user@gmail.com)" class="h-[45px] w-full rounded-[14px] border border-line bg-slate-50 pl-3.5 pr-10 text-right text-table placeholder:text-gray-400 focus:outline-none" /></div>
        </div>
        <div>
          <label for="account-name" class="mb-2 block text-table font-bold text-slate-800">الاسم الكامل <span class="font-medium text-slate-400">(إجباري)</span></label>
          <div class="relative"><UserRound :size="18" class="pointer-events-none absolute right-3.5 top-3.5 text-slate-400" aria-hidden="true" /><input id="account-name" v-model="draft.name" required pattern=".*\S.*" maxlength="80" autocomplete="name" placeholder="مثال: أحمد محمد العتيبي" class="h-[45px] w-full rounded-[14px] border border-line bg-slate-50 pl-3.5 pr-10 text-table placeholder:text-gray-400 focus:outline-none" /></div>
        </div>
        <SupervisorRolesPicker v-if="draft.role === 'supervisor'" v-model="selectedRoles" />
        <aside v-if="!account" class="flex items-start gap-3 rounded-[14px] border border-blue-100 bg-blue-50 p-3.5">
          <Info :size="18" class="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
          <div><h3 class="text-table font-bold text-blue-900">آلية التفعيل</h3><p class="mt-1 text-fine font-light leading-6 text-blue-800">بعد توليد رابط الدعوة، يمكن نسخه أو محاكاة إرساله عبر Gmail. سيحصل المستخدم على خطوات إعداد كلمة المرور وتفعيل الحساب.</p></div>
        </aside>
      </div>
      <footer class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-line bg-slate-50 px-[22px] py-3.5">
        <p class="min-w-[180px] flex-1 text-fine text-muted">الحقول المطلوبة: نوع الحساب والبريد الإلكتروني والاسم الكامل.</p>
        <div class="flex shrink-0 flex-wrap items-center gap-2">
          <button type="button" class="min-h-[38px] rounded-[11px] border border-line bg-white px-3.5 text-table font-bold text-slate-600 hover:bg-slate-100" @click="emit('close')">إلغاء</button>
          <button type="submit" class="flex min-h-[38px] items-center justify-center gap-2 rounded-[11px] bg-brand px-[18px] py-2 text-table font-bold text-white hover:bg-brand-dark"><Link v-if="!account" :size="14" aria-hidden="true" />{{ account ? 'حفظ التغييرات' : 'توليد رابط الدعوة والتفعيل' }}</button>
        </div>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>
.account-dialog { max-height: calc(100dvh - 32px); }
.account-dialog[open] { display: flex; flex-direction: column; }
</style>
