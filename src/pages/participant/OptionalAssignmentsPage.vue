<script setup lang="ts">
import { computed, ref } from 'vue'
import TabBar from '../../components/ui/TabBar.vue'
import AssignmentScoreCard from '../../components/participant/assignments/AssignmentScoreCard.vue'
import OptionalAssignmentCard from '../../components/participant/assignments/OptionalAssignmentCard.vue'
import { optionalAssignments } from '../../data/optionalAssignments'
import { useOptionalAssignmentsStore } from '../../stores/optionalAssignments'
const store = useOptionalAssignmentsStore()
const filter = ref('all')
const filters = [{ id: 'all', label: 'الكل' }, { id: 'favorites', label: 'المفضلة' }, { id: 'submitted', label: 'التكاليف المسلمة' }]
const assignments = computed(() => optionalAssignments.filter(assignment => filter.value === 'all' || (filter.value === 'favorites' ? store.favoriteIds.includes(assignment.id) : assignment.status === 'review')))
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] space-y-6 pb-8 pt-4" dir="rtl">
    <header class="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <h1 class="text-3xl font-bold leading-tight">التكاليف الاختيارية</h1>
        <p class="mt-3 text-sm font-light text-muted">المسار الأساسي مع فرصة مكافأة إضافية.</p>
      </div>
      <AssignmentScoreCard label="التكاليف الاختيارية" :score="5" :maximum="6" weight="7.5%"
        class="w-full sm:w-[300px]" />
    </header>
    <aside class="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4">
      <h2 class="text-sm font-bold">لديك مرونة في تجاوز الحد الأساسي</h2>
      <p class="mt-2 text-xs font-light leading-6 text-amber-800">الهدف الأساسي 7.5%، ويمكن رفع مجموع الدرجة عبر تكاليف
        إضافية مؤهلة حتى حد المكافأة.</p>
    </aside>
    <section aria-label="قائمة التكاليف الاختيارية">
      <div class="mb-8">
        <p class="mb-2 text-xs text-muted">فرز حسب نوع التكليف</p>
        <TabBar v-model="filter" :items="filters" label="تصفية التكاليف الاختيارية" stretch
          class="max-w-100 rounded-xl" />
      </div>
      <p class="sr-only" role="status">عدد التكاليف المعروضة: {{ assignments.length }}</p>
      <div class="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <OptionalAssignmentCard v-for="assignment in assignments" :key="assignment.id" :assignment="assignment"
          :favorite="store.favoriteIds.includes(assignment.id)" @favorite="store.toggleFavorite(assignment.id)" />
      </div>
    </section>
  </div>
</template>
