<script setup lang="ts">
import type { TabItem } from '../../types/admin'
withDefaults(defineProps<{ items: TabItem[]; label: string; stretch?: boolean }>(), { stretch: false })
const model = defineModel<string>({ required: true })
</script>

<template>
  <div :aria-label="label" class="flex gap-1 " role="group">
    <button v-for="item in items" :key="item.id" type="button" :disabled="item.disabled"
      :aria-pressed="model === item.id" :title="item.disabled ? 'سيتم إضافة هذه الصفحة لاحقًا' : undefined"
      class="flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition-colors disabled:cursor-not-allowed"
      :class="[stretch ? 'min-h-9 flex-1' : 'min-h-[54px]', model === item.id ? 'bg-brand text-white' : 'text-muted enabled:hover:bg-slate-100']"
      @click="model = item.id">
      {{ item.label }}
      <span v-if="item.count !== undefined" class="min-w-5 rounded-full px-1.5 py-0.5 text-caption"
        :class="model === item.id ? 'bg-white/10' : 'bg-slate-100'">{{ item.count }}</span>
    </button>
  </div>
</template>
