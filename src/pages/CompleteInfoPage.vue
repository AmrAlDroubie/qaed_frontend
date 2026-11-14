<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Mail, ShieldCheck, UserRound } from '@lucide/vue'
import ProfilePhotoInput from '../components/onboarding/ProfilePhotoInput.vue'
import ProfileOptionalFields from '../components/onboarding/ProfileOptionalFields.vue'
import { useProfileStore, type ProfileDraft } from '../stores/profile'
import { useWorkspaceStore } from '../stores/workspace'
const router = useRouter()
const profile = useProfileStore()
const workspace = useWorkspaceStore()
const draft = ref<ProfileDraft>({ ...profile.profile, interests: [...profile.profile.interests], skills: [...profile.profile.skills] })
const photoError = ref('')
const phoneError = ref('')
const photoSection = ref<HTMLElement>()
function save() {
  if (!draft.value.photo) {
    photoError.value = 'ارفع صورة شخصية لإكمال بياناتك.'
    photoSection.value?.querySelector('button')?.focus()
    return
  }
  photoError.value = ''
  const normalizedPhone = draft.value.phone.replace(/[\s()-]/g, '')
  if (!/^\+?[0-9٠-٩۰-۹]{7,15}$/.test(normalizedPhone)) { phoneError.value = 'أدخل رقم هاتف صحيحًا من 7 إلى 15 رقمًا.'; return }
  phoneError.value = ''
  profile.save(draft.value)
  void router.push(workspace.role === 'admin' ? '/admin' : workspace.role === 'supervisor' ? '/supervisor' : '/participant')
}
</script>

<template>
  <main class="complete-info min-h-dvh px-4 py-8 sm:py-14" dir="rtl">
    <div class="mx-auto w-full max-w-[1400px]">
      <header class="mb-8">
        <p class="text-xs font-bold text-brand">الخطوة الأخيرة قبل لوحة التحكم</p>
        <h1 class="mt-2 text-3xl font-bold leading-tight sm:text-4xl">أكمل بياناتك الشخصية والتعريفية</h1>
        <p class="mt-3 text-sm font-light leading-7 text-muted">هذه المعلومات ستساعد المشاركين والمشرفين على التعرّف
          عليك، وستُستخدم لبناء ملفك القيادي داخل منصة قائد.</p>
      </header>
      <form class="space-y-5" @submit.prevent="save">
        <section class="rounded-[25px] border border-line bg-white p-5 sm:p-8" aria-labelledby="required-title">
          <header class="mb-6 flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-bold text-red-600">Section A</p>
              <h2 id="required-title" class="mt-1 text-xl font-bold">البيانات الإلزامية</h2>
              <p class="mt-1 text-sm font-light text-muted">لا يمكن تفعيل الملف الكامل بدون إكمال هذه البيانات.</p>
            </div><span
              class="shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-caption text-red-700">4 حقول
              مطلوبة</span>
          </header>
          <div class="grid items-start gap-5 sm:grid-cols-[220px_minmax(0,1fr)]">
            <div ref="photoSection">
              <ProfilePhotoInput v-model="draft.photo" :error="draft.photo ? '' : photoError" />
            </div>
            <div class="space-y-4">
              <label class="block text-sm font-bold" for="full-name">الاسم الكامل<span class="relative mt-2 block">
                  <UserRound :size="16" class="pointer-events-none absolute right-3 top-4 text-slate-400" /><input
                    id="full-name" v-model="draft.name" required pattern=".*\S.*" maxlength="100" autocomplete="name"
                    placeholder="الاسم الكامل" class="profile-input pr-10" />
                </span></label>
              <label class="block text-sm font-bold" for="bio">النبذة<textarea id="bio" v-model="draft.bio"
                  maxlength="1000" rows="3" placeholder="اكتب النبذة هنا"
                  class="profile-input mt-2 resize-y py-3" /></label>
              <div class="grid gap-4 md:grid-cols-2">
                <label class="block text-sm font-bold" for="email">البريد الإلكتروني<span class="relative mt-2 block">
                    <Mail :size="16" class="pointer-events-none absolute right-3 top-4 text-slate-400" /><input
                      id="email" v-model="draft.email" type="email" required maxlength="254" autocomplete="email"
                      placeholder="name@example.com" class="profile-input pr-10" />
                  </span></label>
                <label class="block text-sm font-bold" for="phone">رقم الموبايل<input id="phone" v-model="draft.phone"
                    type="tel" required :aria-invalid="Boolean(phoneError)" aria-describedby="phone-error"
                    maxlength="21" autocomplete="tel" placeholder="+966 5XXXXXXXX"
                    title="أدخل رقم هاتف صحيحًا من 7 إلى 15 رقمًا" class="profile-input mt-2" /><span v-if="phoneError"
                    id="phone-error" role="alert" class="mt-2 block text-xs text-red-700">{{ phoneError
                    }}</span></label>
              </div>
            </div>
          </div>
        </section>
        <ProfileOptionalFields v-model="draft" />
        <footer
          class="!mt-10 flex flex-col items-stretch justify-between gap-5 rounded-[25px] border border-line bg-white p-6 sm:flex-row sm:items-center">
          <div class="flex items-center gap-4">
            <ShieldCheck :size="24" class="shrink-0 text-brand" />
            <div>
              <h2 class="text-sm font-bold">جاهز للانطلاق؟</h2>
              <p class="mt-1 text-xs font-light leading-5 text-muted">ستتمكن بعد الحفظ من الوصول مباشرة إلى لوحة التحكم
                ورحلتك القيادية.</p>
            </div>
          </div>
          <button type="submit"
            class="flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-4 text-sm font-bold text-white hover:bg-brand-dark">حفظ
            وانطلاق للوحة التحكم
            <ArrowLeft :size="18" />
          </button>
        </footer>
      </form>
    </div>
  </main>
</template>

<style scoped>
.complete-info {
  background: radial-gradient(ellipse 450px 500px at top right, rgb(42 140 130 / 9%), transparent), var(--color-canvas);
}

.profile-input {
  display: block;
  width: 100%;
  min-height: 50px;
  border: 1px solid var(--color-line);
  border-radius: 16px;
  background: var(--color-slate-50);
  padding-left: 14px;
  padding-right: 14px;
  font-size: var(--text-sm);
  font-weight: 300;
  outline-color: var(--color-brand);
}

.profile-input.pr-10 {
  padding-right: 40px;
}

.profile-input::placeholder {
  color: var(--color-slate-400);
}
</style>
