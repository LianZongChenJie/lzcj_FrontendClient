<script setup lang="ts">
import SectionTitle from '@/components/common/SectionTitle.vue'
import type { TechService } from '@/types'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    services?: TechService[]
  }>(),
  {
    title: '技术服务',
    subtitle: '按行业提供专业技术支持',
    services: () => []
  }
)

const iconMap: Record<string, string> = {
  'ri-government-line': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'ri-book-read-line': 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
  'ri-heart-pulse-line': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'ri-bank-line': 'M12 2L2 7v2h20V7L12 2zM4 11v8h3v-8H4zm5 0v8h3v-8H9zm5 0v8h3v-8h-3zm5 0v8h3v-8h-3zM2 21h20v2H2v-2z',
  'ri-settings-3-line': 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  'ri-service-line': 'M2 3h20v4H2zM4 7v14h16V7M9 14h6'
}
</script>

<template>
  <section id="tech-services" class="relative py-16 lg:py-24 overflow-hidden bg-white">
    <!-- 科技感背景装饰 -->
    <div class="absolute inset-0 tech-dots-light"></div>
    <div class="absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-primary-100/60 blur-3xl"></div>
    <div class="absolute -bottom-24 left-0 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle :title="title" :subtitle="subtitle" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="service in services"
          :key="service.id"
          class="group p-6 rounded-xl grad-border tech-corner tech-corner-hover hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
        >
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center mb-4 shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconMap[service.icon] || iconMap['ri-service-line']" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">{{ service.industry }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
