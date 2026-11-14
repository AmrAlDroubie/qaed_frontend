<script setup lang="ts">
import type { AccountStatus } from '../../types/admin'
defineProps<{ status: AccountStatus }>()
const statuses = {
  active: { label: 'نشط', classes: 'bg-green-100 text-green-800' },
  pending: { label: 'بانتظار التفعيل', classes: 'bg-amber-100 text-amber-800' },
  frozen: { label: 'مجمد', classes: 'bg-rose-50 text-rose-700' },
}
</script>

<template><span class="inline-flex whitespace-nowrap rounded-[10px] px-1.5 py-2 text-fine font-bold" :class="statuses[status].classes">{{ statuses[status].label }}</span></template>
