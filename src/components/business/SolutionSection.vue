<script setup lang="ts">
import { ref } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import DetailModal from '@/components/common/DetailModal.vue'
import type { Solution } from '@/types'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    solutions?: Solution[]
  }>(),
  {
    title: '解决方案',
    subtitle: '多行业覆盖，提供针对性解决方案',
    solutions: () => []
  }
)

const showModal = ref(false)
const currentSolution = ref<Solution | null>(null)

function openDetail(solution: Solution) {
  currentSolution.value = solution
  showModal.value = true
}
</script>

<template>
  <section
    id="solutions"
    class="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-primary-50 via-slate-50 to-blue-50"
  >
    <!-- 科技感背景装饰 -->
    <div class="absolute inset-0 tech-grid-light"></div>
    <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-200/30 blur-3xl"></div>
    <div class="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle :title="title" :subtitle="subtitle" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="solution in solutions"
          :key="solution.id"
          class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row"
        >
          <!-- 方案图片 -->
          <div class="sm:w-2/5 aspect-[3/2] sm:aspect-auto overflow-hidden">
            <img
              :src="solution.image"
              :alt="solution.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- 方案信息 -->
          <div class="p-5 sm:w-3/5 flex flex-col justify-center">
            <span class="inline-block px-3 py-0.5 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-2 self-start">
              {{ solution.industry }}
            </span>
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ solution.name }}</h3>
            <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ solution.summary }}</p>
            <button
              class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors self-start"
              @click="openDetail(solution)"
            >
              查看详情 →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <DetailModal
      :visible="showModal"
      :title="currentSolution?.name || ''"
      @close="showModal = false"
    >
      <div v-if="currentSolution">
        <img
          :src="currentSolution.image"
          :alt="currentSolution.name"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div class="mb-4">
          <span class="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
            {{ currentSolution.industry }}行业
          </span>
        </div>
        <p class="text-gray-600 leading-relaxed mb-4">{{ currentSolution.description }}</p>
        <div>
          <h4 class="font-semibold text-gray-800 mb-2">需求分析</h4>
          <p class="text-gray-600 text-sm leading-relaxed">{{ currentSolution.demandAnalysis }}</p>
        </div>
      </div>
    </DetailModal>
  </section>
</template>
