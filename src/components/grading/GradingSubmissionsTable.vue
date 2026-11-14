<script setup lang="ts">
import { Check, Clock3, Pencil } from '@lucide/vue'
import type { GradingSubmission } from '../../data/grading'
import { gradingStatuses } from '../../data/grading'
defineProps<{ submissions: GradingSubmission[] }>()
const emit = defineEmits<{ grade: [submission: GradingSubmission] }>()
const dateFormat = new Intl.DateTimeFormat('ar', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', numberingSystem: 'latn' })
</script>

<template>
  <section aria-label="قائمة التسليمات" class="overflow-hidden rounded-[25px] border border-line bg-white p-2 sm:p-4">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[860px] text-right text-xs">
        <thead class="border-b border-slate-100 bg-slate-50 text-muted"><tr><th v-for="heading in ['المشارك', 'التكليف', 'تاريخ التسليم', 'إفصاح AI', 'الحالة', 'الإجراء']" :key="heading" scope="col" class="px-3 py-4 font-bold">{{ heading }}</th></tr></thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="item in submissions" :key="item.id">
            <td class="px-3 py-4"><div class="flex items-center gap-2"><img src="/assets/grading/participant.png" alt="" class="size-9 shrink-0 rounded-lg object-cover" /><div><p class="whitespace-nowrap font-bold">{{ item.participant }}</p><p class="mt-1 text-fine text-slate-400">المجموعة {{ item.group }}</p></div></div></td>
            <td class="px-3 py-4"><p class="font-bold">{{ item.title }}</p><p class="mt-1 text-fine text-slate-400">سجل قيادي • 4%</p></td>
            <td class="px-3 py-4 text-fine font-light text-muted"><time :datetime="item.submittedAt">{{ dateFormat.format(new Date(item.submittedAt)) }}</time></td>
            <td class="whitespace-nowrap px-3 py-4 text-fine font-bold" :class="item.aiDeduction ? 'text-orange-600' : 'text-emerald-700'">المستوى {{ item.aiLevel }} • خصم {{ item.aiDeduction }}%</td>
            <td class="px-3 py-4"><span class="inline-flex items-center gap-1 whitespace-nowrap text-fine" :class="item.status === 'graded' ? 'text-emerald-700' : 'text-muted'"><component :is="item.status === 'graded' ? Check : Clock3" :size="12" />{{ gradingStatuses.find(status => status.id === item.status)?.label }}</span></td>
            <td class="px-3 py-4"><button type="button" :title="item.status === 'pending' ? 'تصحيح التسليم' : 'استعراض التسليم'" class="flex min-h-10 w-full min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-70" :class="item.status === 'pending' ? 'border-brand bg-brand text-white hover:bg-brand-dark' : 'border-line bg-white text-ink'" @click="emit('grade', item)"><Pencil v-if="item.status === 'pending'" :size="13" />{{ item.status === 'pending' ? 'تصحيح الآن' : 'استعراض' }}</button></td>
          </tr>
          <tr v-if="!submissions.length"><td colspan="6" class="h-20 px-3 text-center text-muted" role="status">لا توجد تسليمات مطابقة للبحث.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
