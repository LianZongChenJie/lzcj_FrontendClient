<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Honor } from '@/types'
import { cmsApi } from '@/api/cms'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TabFilter from '@/components/common/TabFilter.vue'
import ImageViewer from '@/components/common/ImageViewer.vue'

const honors = ref<Honor[]>([])
const activeTab = ref('all')
const showViewer = ref(false)
const currentImage = ref('')

/** 从 CMS 接口加载资质荣誉 */
async function loadHonors() {
  try {
    const res = await cmsApi.getHonors()
    honors.value = res.data || []
  } catch (error) {
    console.error('资质荣誉加载失败', error)
  }
}

onMounted(loadHonors)

const tabs = [
  { value: 'all', label: '全部' },
  { value: 'qualification', label: '资质认证' },
  { value: 'award', label: '荣誉奖项' }
]

const filteredHonors = computed(() => {
  if (activeTab.value === 'all') return honors.value
  return honors.value.filter((h) => h.type === activeTab.value)
})

function openViewer(src: string) {
  currentImage.value = src
  showViewer.value = true
}
</script>

<template>
  <section id="honors" class="relative py-16 lg:py-24 bg-white overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-grid-light"></div>
    <div class="absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-primary-100/50 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="资质荣誉" subtitle="权威认证，行业认可" />

      <TabFilter v-model="activeTab" :tabs="tabs" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="honor in filteredHonors"
          :key="honor.id"
          class="group grad-border tech-corner tech-corner-hover rounded-xl overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="relative bg-white p-4 cursor-pointer min-h-[280px] flex items-center justify-center"
            @click="openViewer(honor.image)"
          >
            <img
              :src="honor.image"
              :alt="honor.name"
              class="max-w-full max-h-[280px] object-contain group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_16px_rgba(59,130,246,0.35)] transition-all duration-300"
            />
            <div class="absolute top-3 right-3">
              <span
                class="px-2 py-1 text-xs font-medium rounded-full border"
                :class="
                  honor.type === 'qualification'
                    ? 'bg-primary-50/80 text-primary-600 border-primary-200/60'
                    : 'bg-amber-50/80 text-amber-600 border-amber-200/60'
                "
              >
                {{ honor.type === 'qualification' ? '资质' : '荣誉' }}
              </span>
            </div>
          </div>
          <div class="p-4 border-t border-primary-100/60 bg-gray-50/60">
            <h3 class="font-semibold text-gray-800 text-sm mb-1">{{ honor.name }}</h3>
            <p class="text-gray-400 text-xs font-mono">{{ honor.date }}年</p>
          </div>
        </div>
      </div>
    </div>

    <ImageViewer
      :visible="showViewer"
      :src="currentImage"
      @close="showViewer = false"
    />
  </section>
</template>
