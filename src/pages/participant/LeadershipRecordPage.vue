<script setup lang="ts">
import { BookOpenText, Trophy } from '@lucide/vue'
import AssignmentScoreCard from '../../components/participant/assignments/AssignmentScoreCard.vue'
import ParticipantAssignmentRow from '../../components/participant/assignments/ParticipantAssignmentRow.vue'
import { useLeadershipRecordStore } from '../../stores/leadershipRecord'
const store = useLeadershipRecordStore()
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] space-y-8 px-0 pb-8 pt-5 sm:px-3" dir="rtl">
    <section class="flex flex-col justify-between gap-6 rounded-[28px] border border-line bg-white p-5 shadow-sm sm:p-7 xl:flex-row xl:items-center" aria-labelledby="leadership-record-title">
      <div>
        <div class="mb-4 flex flex-wrap items-center gap-3"><span class="rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand">السجل القيادي</span><span class="text-xs font-light text-muted">• ذاكرة رحلتك القيادية</span></div>
        <h1 id="leadership-record-title" class="text-3xl font-bold leading-tight sm:text-4xl">ذاكرة رحلتك القيادية</h1>
        <p class="mt-3 text-sm font-light leading-7 text-muted">وثّق ما تعلّمته، ما جرّبته، وما الذي تغيّر فيك وفي أدائك.</p>
      </div>
      <div class="flex w-full shrink-0 flex-col items-end gap-6 xl:w-[310px]">
        <!-- The achievements view awaits its supplied design. -->
        <button type="button" disabled title="الإنجازات الشخصية ستُضاف بعد توفير تصميمها" class="inline-flex min-h-12 cursor-default! items-center justify-center gap-3 rounded-2xl bg-brand-dark px-6 py-3 text-sm font-bold text-white shadow-button"><Trophy :size="20" aria-hidden="true" />الإنجازات الشخصية</button>
        <AssignmentScoreCard label="التكاليف الإلزامية" :score="9" :maximum="10" :weight="17.5" class="w-full" />
      </div>
    </section>
    <section aria-labelledby="leadership-sessions-title">
      <header class="mb-6 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3"><span class="rounded-xl bg-brand/5 p-2 text-brand"><BookOpenText :size="22" aria-hidden="true" /></span><div><p class="text-xs font-bold text-brand">رحلتك أسبوعاً بعد أسبوع</p><h2 id="leadership-sessions-title" class="mt-1 text-lg font-bold">تدوين الدورات</h2></div></div>
        <span class="rounded-full border border-line bg-white px-4 py-2 text-xs text-muted">{{ store.sessions.length }} جلسات معروضة</span>
      </header>
      <div class="space-y-4"><ParticipantAssignmentRow v-for="session in store.sessions" :key="session.id" :assignment="session" /></div>
    </section>
  </div>
</template>
