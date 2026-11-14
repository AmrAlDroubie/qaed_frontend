<script setup lang="ts">
import { participantWeeks } from '../../data/participant'
</script>

<template>
  <section class="rounded-3xl border border-line bg-white px-5 py-4" aria-labelledby="roadmap-title">
    <h2 id="roadmap-title" class="text-base font-bold">خارطة الأسابيع</h2>
    <p class="mt-2 text-sm font-light text-muted">جميع الأسابيع الحالية مفتوحة للعرض والتنقّل.</p>
    <ol class="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 pb-1 sm:grid-cols-4 xl:grid-cols-7 xl:gap-x-0">
      <li v-for="week in participantWeeks" :key="week.number" class="relative text-center xl:after:absolute xl:after:-end-2 xl:after:top-7 xl:after:h-1 xl:after:w-5 xl:after:rounded-full last:after:hidden" :class="week.number < 3 ? 'after:bg-brand/50' : 'after:bg-slate-100'">
        <RouterLink :to="`/participant/weeks/${week.number}`" class="group flex flex-col items-center rounded-xl" :aria-label="`الأسبوع ${week.number}: ${week.title}`">
          <span class="mb-2 flex size-14 items-center justify-center rounded-full border-4 bg-white text-xl font-bold text-slate-600 transition-colors group-hover:bg-brand/5" :class="week.reached ? 'border-brand' : 'border-line'">{{ week.number }}</span>
          <span class="text-sm font-bold">الأسبوع {{ week.number }}</span><span class="mt-1 text-sm font-light text-muted">{{ week.title }}</span>
        </RouterLink>
      </li>
    </ol>
  </section>
</template>
