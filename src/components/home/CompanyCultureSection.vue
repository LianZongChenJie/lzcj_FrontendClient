<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Culture } from '@/types'
import { cmsApi } from '@/api/cms'
import SectionTitle from '@/components/common/SectionTitle.vue'

const culture = ref<Culture>({ mission: '', vision: '', values: '' })

const cultureItems = computed(() => [
  {
    key: 'mission',
    title: '使命',
    content: culture.value.mission,
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    key: 'vision',
    title: '愿景',
    content: culture.value.vision,
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
  },
  {
    key: 'values',
    title: '价值观',
    content: culture.value.values,
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  }
])

/** 从 CMS 接口加载企业文化 */
async function loadCulture() {
  try {
    const res = await cmsApi.getCompanyCulture()
    if (res.data) {
      culture.value = res.data
    }
  } catch (error) {
    console.error('企业文化加载失败', error)
  }
}

onMounted(loadCulture)
</script>

<template>
  <section id="company-culture" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="企业文化" subtitle="我们的精神内核与行为准则" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in cultureItems"
          :key="item.key"
          class="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="w-16 h-16 mx-auto mb-5 bg-primary-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">{{ item.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
