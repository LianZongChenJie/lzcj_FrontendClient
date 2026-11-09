<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import DetailModal from '@/components/common/DetailModal.vue'
import TabFilter from '@/components/common/TabFilter.vue'
import type { Job } from '@/types'

const props = withDefaults(
  defineProps<{
    jobs?: Job[]
  }>(),
  {
    jobs: () => []
  }
)

const showModal = ref(false)
const currentJob = ref<Job | null>(null)

// 获取所有地点
const locations = computed(() => {
  const locs = [...new Set(props.jobs.map((j) => j.location))]
  return [{ value: 'all', label: '全部' }, ...locs.map((l) => ({ value: l, label: l }))]
})

const locationTabs = computed(() => locations.value)
const activeLocation = ref('all')

const filteredJobs = computed(() => {
  let result = props.jobs
  if (activeLocation.value !== 'all') {
    result = result.filter((j) => j.location === activeLocation.value)
  }
  // 紧急招聘置顶
  return [...result].sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0))
})

function openDetail(job: Job) {
  currentJob.value = job
  showModal.value = true
}
</script>

<template>
  <section id="careers" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="人才招聘" subtitle="加入我们，共创未来" />

      <!-- 地点筛选 -->
      <TabFilter v-model="activeLocation" :tabs="locationTabs" />

      <!-- 岗位列表 -->
      <div class="space-y-4">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="group bg-white rounded-xl p-5 sm:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
          :class="job.urgent ? 'border-red-200 bg-red-50/30' : ''"
          @click="openDetail(job)"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {{ job.title }}
                </h3>
                <span
                  v-if="job.urgent"
                  class="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full animate-pulse"
                >
                  急聘
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ job.location }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {{ job.department }}
                </span>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {{ job.type }}
                </span>
                <span class="text-gray-400 text-xs">招聘 {{ job.headcount }} 人</span>
              </div>
            </div>
            <button
              class="shrink-0 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
              @click.stop="openDetail(job)"
            >
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 岗位详情弹窗 -->
    <DetailModal
      :visible="showModal"
      :title="currentJob?.title || ''"
      @close="showModal = false"
    >
      <div v-if="currentJob" class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">{{ currentJob.location }}</span>
          <span class="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">{{ currentJob.department }}</span>
          <span class="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">{{ currentJob.type }}</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">招聘{{ currentJob.headcount }}人</span>
        </div>

        <div>
          <h4 class="font-semibold text-gray-800 mb-2">岗位职责</h4>
          <ul class="space-y-1.5">
            <li
              v-for="(item, index) in currentJob.responsibilities"
              :key="index"
              class="flex items-start text-gray-600 text-sm"
            >
              <span class="w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 mr-2 shrink-0"></span>
              {{ item }}
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-800 mb-2">任职要求</h4>
          <ul class="space-y-1.5">
            <li
              v-for="(item, index) in currentJob.requirements"
              :key="index"
              class="flex items-start text-gray-600 text-sm"
            >
              <span class="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 mr-2 shrink-0"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </DetailModal>
  </section>
</template>
