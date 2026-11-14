<script setup lang="ts">
import { ArrowUpLeft, ShieldCheck, UserRound } from '@lucide/vue'
import { useRouter } from 'vue-router'
import { useWorkspaceStore } from '../stores/workspace'

const router = useRouter()
const workspace = useWorkspaceStore()
const examples: Record<string, string> = {
  'public-profile': '/public-profile/faisal',
  'participant-meeting': '/participant/weeks/4',
  'participant-leadership-detail': '/participant/leadership-log/journal-session-03',
  'participant-required-detail': '/participant/required-assignments/required-session-03',
  'participant-optional-detail': '/participant/optional-assignments/podcast',
}
const shared = ['login', 'complete-info', 'roster', 'public-profile']
const pages = router.getRoutes().filter(route => route.name && route.name !== 'demo' && !route.redirect && !route.meta.comingSoon).map(route => ({
  name: String(route.name),
  path: examples[String(route.name)] ?? route.path,
  title: String(route.meta.title ?? 'تسجيل الدخول').split('|')[0]!.trim(),
  detail: route.path.includes(':'),
}))
const sections = [
  { role: 'admin' as const, title: 'الإدارة', description: 'إدارة البرنامج والحسابات والتكاليف والتصحيح.', icon: ShieldCheck,
    pages: pages.filter(page => shared.includes(page.name) || page.name.startsWith('admin-') || ['assignments-index', 'assignments-create', 'grading'].includes(page.name)) },
  { role: 'participant' as const, title: 'المشارك', description: 'رحلة المشارك واللقاءات والتسليمات والملف العام.', icon: UserRound,
    pages: pages.filter(page => shared.includes(page.name) || page.name.startsWith('participant-')) },
]
</script>

<template>
  <main dir="rtl" class="min-h-dvh bg-canvas px-4 py-10 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <header class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><span class="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">عرض تجريبي مؤقت</span><h1 class="mt-4 text-3xl font-bold">دليل صفحات منصة قائد</h1><p class="mt-2 text-sm text-muted">جميع الصفحات المنفّذة، مع أمثلة لصفحات التفاصيل. اختر القسم لفتح الصفحة بالدور المناسب.</p></div>
        <img src="/assets/admin/qaed-logo.png" alt="برنامج قائد" class="h-20 w-28 object-contain" />
      </header>
      <div class="grid items-start gap-6 lg:grid-cols-2">
        <section v-for="section in sections" :key="section.role" :aria-labelledby="`demo-${section.role}`" class="overflow-hidden rounded-3xl border border-line bg-white">
          <header class="flex items-center gap-3 border-b border-line bg-brand/5 p-6"><span class="flex size-12 items-center justify-center rounded-2xl bg-brand text-white"><component :is="section.icon" :size="24" /></span><div class="flex-1"><h2 :id="`demo-${section.role}`" class="text-xl font-bold">{{ section.title }}</h2><p class="mt-1 text-xs text-muted">{{ section.description }}</p></div><span class="text-sm font-bold text-brand">{{ section.pages.length }}</span></header>
          <nav :aria-label="`صفحات ${section.title}`" class="grid gap-2 p-4">
            <RouterLink v-for="page in section.pages" :key="page.name" :to="page.path" class="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 hover:border-brand/15 hover:bg-brand/5" @click="workspace.role = section.role">
              <div class="min-w-0 flex-1"><span class="font-bold">{{ page.title }}</span><span v-if="page.detail" class="mr-2 rounded-full bg-slate-100 px-2 py-1 text-fine text-muted">مثال تفاصيل</span><span dir="ltr" class="mt-1 block break-all text-right text-xs text-muted">{{ page.path }}</span></div><ArrowUpLeft :size="18" class="shrink-0 text-brand" />
            </RouterLink>
          </nav>
        </section>
      </div>
    </div>
  </main>
</template>
