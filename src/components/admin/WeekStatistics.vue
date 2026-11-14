<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ completed: number; active: number; upcoming: number; assignments: number }>()
const cards = computed(() => [
  { label: 'مكتملة', value: props.completed, description: 'أسابيع من الخطة الحالية' },
  { label: 'نشط حالياً', value: props.active, description: 'أسبوع قيد التنفيذ', highlighted: true },
  { label: 'مستقبلي', value: props.upcoming, description: 'بانتظار بدء التنفيذ' },
  { label: 'إجمالي التكاليف', value: props.assignments, description: 'تكليفاً مرتبطاً بالأسابيع' },
])
</script>

<template>
  <dl class="grid grid-cols-2 gap-4 xl:grid-cols-4" aria-label="إحصائيات الأسابيع">
    <div v-for="card in cards" :key="card.label" class="rounded-3xl border p-5" :class="card.highlighted ? 'border-brand/15 bg-brand/[0.03]' : 'border-line bg-white'">
      <dt class="text-xs font-bold" :class="card.highlighted ? 'text-brand' : 'text-slate-400'">{{ card.label }}</dt>
      <dd class="my-1 text-3xl font-bold leading-9">{{ card.value }}</dd>
      <dd class="text-xs font-light leading-5 text-slate-400">{{ card.description }}</dd>
    </div>
  </dl>
</template>
