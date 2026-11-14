<script setup lang="ts">
import { ref } from 'vue'
import ProgramSectionTabs from '../../components/admin/ProgramSectionTabs.vue'
import BatchOverview from '../../components/admin/batches/BatchOverview.vue'
import CurrentBatchCard from '../../components/admin/batches/CurrentBatchCard.vue'
import LaunchBatchCard from '../../components/admin/batches/LaunchBatchCard.vue'
import BatchLifecycle from '../../components/admin/batches/BatchLifecycle.vue'
import BatchActionDialog from '../../components/admin/batches/BatchActionDialog.vue'
import { useBatchesStore } from '../../stores/batches'
import { useAdminStore } from '../../stores/admin'
import type { BatchDraft, BatchPlanMode } from '../../types/batches'
const store = useBatchesStore()
const admin = useAdminStore()
const mode = ref<BatchPlanMode>('import')
const action = ref<'launch' | 'archive' | null>(null)
const error = ref('')
function open(value: 'launch' | 'archive') { error.value = ''; action.value = value }
function launch(draft: BatchDraft) {
  error.value = store.launch(draft)
  if (error.value) return
  mode.value = draft.mode
  action.value = null
  admin.notice = `تم إطلاق «${store.latest.name}» بنجاح. يمكنك إدارة خطتها من قسم الأسابيع.`
}
function archive() {
  store.archiveCurrent()
  action.value = null
  admin.notice = 'تم إغلاق الدورة وحفظها في الأرشيف المحلي.'
}
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px]">
    <ProgramSectionTabs />
    <div class="space-y-6 lg:pe-8">
      <BatchOverview :batch="store.latest" />
      <section aria-labelledby="batches-hub-title" class="space-y-5">
        <header>
          <h2 id="batches-hub-title" class="my-1 text-xl font-bold leading-7">دورة حياة وإطلاق الدفعات</h2>
          <p class="text-sm font-light leading-5 text-muted">إدارة الدورة النشطة، إغلاقها بأمان وإطلاق دفعة جديدة من نفس
            مركز الإدارة.</p>
        </header>
        <div class="grid gap-5 xl:grid-cols-2">
          <CurrentBatchCard :batch="store.latest" @archive="open('archive')" />
          <LaunchBatchCard v-model="mode" @launch="open('launch')" />
        </div>
        <BatchLifecycle :archived="store.latest.status === 'archived'" />
      </section>
    </div>
    <BatchActionDialog v-if="action" :action="action" :batches="store.batches" :current="store.current" :mode="mode"
      :error="error" @close="action = null" @launch="launch" @archive="archive" />
  </div>
</template>
