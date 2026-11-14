<script setup lang="ts">
import { Pencil, RotateCcw, Snowflake } from '@lucide/vue'
import AccountStatusBadge from './AccountStatusBadge.vue'
import type { Account } from '../../types/admin'
import { supervisorRoles } from '../../data/supervisorRoles'
function roleLabels(account: Account) {
  return account.subroles?.length
    ? supervisorRoles.filter(role => account.subroles?.includes(role.id)).map(role => role.badge)
    : account.subrole ? [account.subrole] : []
}
defineProps<{ accounts: Account[] }>()
defineEmits<{ edit: [account: Account]; toggleAccess: [id: string] }>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[880px] border-separate border-spacing-0 text-right">
      <caption class="sr-only">الحسابات والأدوار وحالات الوصول</caption>
      <thead class="bg-slate-50 text-fine font-bold text-muted"><tr>
        <th scope="col" class="h-[41px] px-3">الاسم والصورة</th><th scope="col" class="px-3">البريد الإلكتروني (Gmail)</th><th scope="col" class="px-2">الدور الرئيسي</th><th scope="col" class="px-2">الدور الفرعي</th><th scope="col" class="px-2 text-center">تاريخ الإنشاء</th><th scope="col" class="px-2 text-center">حالة الحساب</th><th scope="col" class="px-4">الإجراءات</th>
      </tr></thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id" class="h-14 hover:bg-slate-50/60">
          <td class="px-3 py-2"><div class="flex items-center gap-3"><span class="size-9 shrink-0 rounded-[10px] bg-brand" aria-hidden="true" /><div><p class="whitespace-nowrap text-table font-bold text-ink">{{ account.name }}</p><p class="mt-0.5 text-caption font-light text-slate-400">رقم الحساب #{{ account.id }}</p></div></div></td>
          <td class="px-3 text-xs font-bold text-slate-700"><span dir="ltr">{{ account.email }}</span></td>
          <td class="px-2 text-fine font-bold text-brand">{{ account.role === 'supervisor' ? 'مشرف' : 'مشارك' }}</td>
          <td class="px-2"><div class="flex flex-wrap gap-1 py-2"><span v-for="label in roleLabels(account)" :key="label" class="whitespace-nowrap rounded-lg border border-line bg-slate-50 px-1.5 py-1 text-caption font-bold text-slate-600">{{ label }}</span></div></td>
          <td class="px-2 text-center text-date font-bold text-slate-600"><span dir="ltr">{{ account.createdAt }}</span></td>
          <td class="px-2 text-center"><AccountStatusBadge :status="account.status" /></td>
          <td class="px-4"><div class="flex items-center gap-2.5">
            <button type="button" class="flex h-8 items-center gap-1 whitespace-nowrap rounded-[11px] border border-indigo-100 bg-indigo-50 px-2.5 text-fine font-bold text-indigo-700 hover:bg-indigo-100" :aria-label="`تعديل أدوار ${account.name}`" @click="$emit('edit', account)"><Pencil :size="10" />تعديل الأدوار</button>
            <button type="button" class="flex h-8 w-[38px] items-center justify-center rounded-[11px] border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100" :aria-label="`${account.status === 'frozen' ? 'إعادة تفعيل' : 'تجميد'} حساب ${account.name}`" :title="account.status === 'frozen' ? 'إعادة التفعيل' : 'تجميد الوصول'" @click="$emit('toggleAccess', account.id)"><component :is="account.status === 'frozen' ? RotateCcw : Snowflake" :size="14" /></button>
          </div></td>
        </tr>
        <tr v-if="!accounts.length"><td colspan="7" class="py-12 text-center text-sm text-muted">لا توجد حسابات تطابق البحث.</td></tr>
      </tbody>
    </table>
  </div>
</template>
