<script setup lang="ts">
import { computed, ref } from 'vue'
import { UsersRound } from '@lucide/vue'
import RosterFilters from '../../components/roster/RosterFilters.vue'
import RosterCard from '../../components/roster/RosterCard.vue'
import { rosterMembers } from '../../data/roster'
import { rosterRoleLabels, type RosterFilter } from '../../types/roster'

const search = ref('')
const role = ref<RosterFilter>('all')
function normalize(value: string) {
  return value.normalize('NFKD').replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').toLowerCase().trim()
}
const filteredMembers = computed(() => rosterMembers.filter(member =>
  (role.value === 'all' || member.role === role.value) &&
  normalize(`${member.name} ${rosterRoleLabels[member.role]} ${member.mbti}`).includes(normalize(search.value)),
))
function resetFilters() { search.value = ''; role.value = 'all' }
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] pb-2 pt-7" dir="rtl">
    <header class="mb-7">
      <p class="text-xs font-bold text-brand">المجتمع</p>
      <h1 class="mt-1 text-3xl font-bold leading-tight">قائمة المشاركين والمشرفين</h1>
      <p class="mt-2 text-label font-light leading-6 text-muted">اكتشف المشاركين والمشرفين وتعرّف على اهتماماتهم ومجالات خبراتهم.</p>
    </header>
    <RosterFilters v-model:search="search" v-model:role="role" />
    <p class="sr-only" role="status">عدد النتائج: {{ filteredMembers.length }}</p>
    <section v-if="filteredMembers.length" aria-label="المشاركون والمشرفون" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <RosterCard v-for="member in filteredMembers" :key="member.id" :member="member" />
    </section>
    <section v-else class="mt-5 flex flex-col items-center rounded-[22px] border border-line bg-white px-6 py-12 text-center">
      <UsersRound :size="32" class="mb-4 text-brand" aria-hidden="true" />
      <h2 class="text-lg font-bold">لا توجد نتائج</h2>
      <p class="mt-2 text-sm text-muted">جرّب البحث باسم آخر أو تغيير الدور المحدد.</p>
      <button type="button" class="mt-5 rounded-xl bg-brand px-5 py-2 text-sm font-bold text-white hover:bg-brand-dark" @click="resetFilters">عرض الكل</button>
    </section>
  </div>
</template>
