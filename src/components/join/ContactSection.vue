<script setup lang="ts">
import { computed } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import type { BranchContact } from '@/types'

const props = withDefaults(
  defineProps<{
    contacts?: BranchContact[]
  }>(),
  {
    contacts: () => []
  }
)

const contacts = computed(() => props.contacts)

const cityColors: Record<string, string> = {
  北京: 'from-blue-500 to-cyan-400',
  天津: 'from-cyan-500 to-teal-400',
  成都: 'from-green-500 to-emerald-400',
  云南: 'from-amber-500 to-orange-400'
}
</script>

<template>
  <section id="contact" class="relative py-16 lg:py-24 bg-gray-50 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-dots-light"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="联系方式" subtitle="四地分公司，期待与您相遇" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="contact in contacts"
          :key="contact.city"
          class="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-glow transition-all duration-300 tech-corner tech-corner-hover"
        >
          <!-- 城市头部 -->
          <div
            v-if="contact.themeColor"
            class="h-1.5"
            :style="{ backgroundColor: contact.themeColor }"
          ></div>
          <div
            v-else
            class="h-1.5 bg-gradient-to-r shadow-glow-sm"
            :class="cityColors[contact.city] || 'from-gray-500 to-gray-600'"
          ></div>

          <div class="p-6">
            <div class="flex items-center gap-2 mb-4">
              <span class="w-1.5 h-1.5 rotate-45 bg-gradient-to-br from-primary-500 to-cyan-400 shadow-glow-sm"></span>
              <h3 class="text-xl font-bold text-gray-800">{{ contact.city }}</h3>
            </div>

            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-600 text-sm">{{ contact.address }}</span>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-600 text-sm">{{ contact.phone }}</span>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-600 text-sm">邮编：{{ contact.postalCode }}</span>
              </div>

              <div v-if="contact.email" class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <a :href="`mailto:${contact.email}`" class="text-gray-600 text-sm hover:text-primary-600 transition-colors">{{ contact.email }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
