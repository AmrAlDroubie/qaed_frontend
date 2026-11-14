<script setup lang="ts">
import { Search, UserRoundPlus } from '@lucide/vue'
const search = defineModel<string>({ required: true })
defineEmits<{ create: [] }>()
</script>

<template>
  <div class="flex flex-col gap-4 border-b border-line px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <div class="relative w-full sm:max-w-[576px]">
      <Search :size="20" class="pointer-events-none absolute right-4 top-[15px] text-slate-400" aria-hidden="true" />
      <label for="account-search" class="sr-only">ابحث باسم المستخدم أو البريد الإلكتروني</label>
      <input id="account-search" v-model="search" type="search" placeholder="ابحث باسم المستخدم أو Gmail..." class="h-[50px] w-full rounded-2xl border border-line bg-slate-50 pl-4 pr-11 text-sm placeholder:text-gray-400 focus:outline-none" />
    </div>
    <button type="button" class="flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-sm font-bold text-white shadow-button hover:bg-brand-dark" @click="$emit('create')"><UserRoundPlus :size="20" />إنشاء حساب جديد</button>
  </div>
</template>
