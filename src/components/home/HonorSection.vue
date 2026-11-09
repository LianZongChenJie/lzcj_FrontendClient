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
  <section id="honors" class="py-16 lg:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="资质荣誉" subtitle="权威认证，行业认可" />

      <TabFilter v-model="activeTab" :tabs="tabs" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="honor in filteredHonors"
          :key="honor.id"
          class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div
            class="relative bg-white p-4 cursor-pointer min-h-[280px] flex items-center justify-center"
            @click="openViewer(honor.image)"
          >
            <img
              :src="honor.image"
              :alt="honor.name"
              class="max-w-full max-h-[280px] object-contain group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div class="absolute top-3 right-3">
              <span
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="honor.type === 'qualification' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'"
              >
                {{ honor.type === 'qualification' ? '资质' : '荣誉' }}
              </span>
            </div>
          </div>
          <div class="p-4 border-t border-gray-100">
            <h3 class="font-semibold text-gray-800 text-sm mb-1">{{ honor.name }}</h3>
            <p class="text-gray-400 text-xs">{{ honor.date }}年</p>
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
