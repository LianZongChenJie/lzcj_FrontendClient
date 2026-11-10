<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TeamGalleryItem } from '@/types'
import { cmsApi } from '@/api/cms'
import SectionTitle from '@/components/common/SectionTitle.vue'
import ImageViewer from '@/components/common/ImageViewer.vue'

const items = ref<TeamGalleryItem[]>([])
const showViewer = ref(false)
const currentImage = ref('')

function openViewer(src: string) {
  currentImage.value = src
  showViewer.value = true
}

/** 从 CMS 接口加载员工风采 */
async function loadTeamGallery() {
  try {
    const res = await cmsApi.getTeamGallery()
    items.value = res.data?.items || []
  } catch (error) {
    console.error('员工风采加载失败', error)
  }
}

onMounted(loadTeamGallery)
</script>

<template>
  <section id="employee-gallery" class="relative py-16 lg:py-24 bg-gray-50 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-dots-light"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="员工风采" subtitle="团队凝聚力量，共创美好未来" />

      <!-- 两列网格布局 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="group bg-white rounded-2xl overflow-hidden ring-1 ring-primary-100/70 hover:ring-primary-300 hover:shadow-glow transition-all duration-300 tech-corner tech-corner-hover"
        >
          <!-- 图片 -->
          <div
            class="relative aspect-[16/10] overflow-hidden cursor-pointer"
            @click="openViewer(item.image)"
          >
            <img
              :src="item.image"
              :alt="`员工风采${index + 1}`"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <svg class="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          <!-- 描述文字 -->
          <div class="p-5">
            <p class="text-gray-600 leading-relaxed text-base">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
    <ImageViewer
      :visible="showViewer"
      :src="currentImage"
      @close="showViewer = false"
    />
  </section>
</template>
