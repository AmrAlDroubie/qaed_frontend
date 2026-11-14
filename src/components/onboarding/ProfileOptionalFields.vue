<script setup lang="ts">
import type { ProfileDraft } from '../../stores/profile'
import ProfileTagInput from './ProfileTagInput.vue'
const draft = defineModel<ProfileDraft>({ required: true })
const personalityTypes = ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP', 'INTJ', 'INTP', 'ENTJ', 'ENTP']
const socials = [
  { key: 'linkedin' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
  { key: 'twitter' as const, label: 'Twitter X', placeholder: 'https://x.com/...' },
  { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'snapchat' as const, label: 'Snapchat', placeholder: 'https://snapchat.com/...' },
]
</script>

<template>
  <section class="space-y-6 rounded-[25px] border border-line bg-white p-5 sm:p-8" aria-labelledby="optional-title">
    <header><p class="text-xs font-bold text-brand">Section B</p><h2 id="optional-title" class="mt-1 text-xl font-bold">البيانات الاختيارية والملف التعريفي</h2><p class="mt-1 text-sm font-light text-muted">أضف معلومات تساعد المجتمع على التعرف عليك بصورة أفضل.</p></header>
    <fieldset><legend class="text-sm font-bold">النمط الشخصي MBTI</legend><p class="mb-4 mt-1 text-xs font-light text-muted">اختر النمط الأقرب لك.</p><div class="flex flex-wrap gap-2"><button v-for="type in personalityTypes" :key="type" type="button" :aria-pressed="draft.mbti === type" class="min-h-10 rounded-2xl border px-3 text-xs font-bold" :class="draft.mbti === type ? 'border-brand bg-brand text-white' : 'border-line bg-slate-50 text-slate-600 hover:border-brand/40'" @click="draft.mbti = draft.mbti === type ? '' : type">{{ type }}</button></div></fieldset>
    <div class="border-t border-slate-50 pt-6"><ProfileTagInput id="interests" v-model="draft.interests" label="الاهتمامات" placeholder="مثل: ريادة الأعمال" /></div>
    <div class="border-t border-slate-50 pt-6"><ProfileTagInput id="skills" v-model="draft.skills" label="المهارات" placeholder="مثال: التيسير، تحليل البيانات..." /></div>
    <fieldset class="pt-2"><legend class="text-sm font-bold">روابط شبكات التواصل الاجتماعي</legend><p class="mb-4 mt-1 text-xs font-light text-muted">اختيارية وتظهر ضمن الملف العام حسب إعدادات المنصة.</p><div class="grid gap-4 sm:grid-cols-2"><label v-for="social in socials" :key="social.key" class="block text-xs font-bold">{{ social.label }}<input v-model="draft[social.key]" type="url" pattern="https?://.*" :placeholder="social.placeholder" maxlength="500" dir="ltr" class="mt-2 block min-h-12 w-full rounded-2xl border border-line bg-slate-50 px-3 py-2 text-sm font-light outline-brand placeholder:text-slate-400" /></label></div></fieldset>
  </section>
</template>
