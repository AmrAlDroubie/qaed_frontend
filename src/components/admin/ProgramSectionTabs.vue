<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { programSections } from '../../data/admin'
import { programSectionPaths } from '../../data/adminNavigation'
import TabBar from '../ui/TabBar.vue'

const route = useRoute()
const router = useRouter()
const section = computed({
  get: () => String(route.meta.programSection || ''),
  set: value => {
    const path = programSectionPaths[value]
    if (path) void router.push(path)
  },
})
</script>

<template>
  <TabBar v-model="section" :items="programSections" label="أقسام إدارة البرنامج" stretch class="mb-5 rounded-2xl bg-white p-1" />
</template>
