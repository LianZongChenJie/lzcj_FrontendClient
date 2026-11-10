<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CompanyIntro } from '@/types'
import SectionTitle from '@/components/common/SectionTitle.vue'
import ImageViewer from '@/components/common/ImageViewer.vue'
import { cmsApi } from '@/api/cms'

const intro = ref<CompanyIntro>({ description: '', images: [] })
const isExpanded = ref(false)
const showImageViewer = ref(false)
const currentImage = ref('')

const paragraphs = computed(() => (intro.value.description || '').split('\n\n'))

/** 从 CMS 接口加载公司介绍 */
async function loadCompanyIntro() {
  try {
    const res = await cmsApi.getCompanyIntro()
    const data = res.data
    if (data) {
      intro.value = {
        description: data.description || '',
        images: Array.isArray(data.images) ? data.images : []
      }
    }
  } catch (e) {
    console.error('公司介绍加载失败', e)
  }
}

function openImageViewer(src: string) {
  currentImage.value = src
  showImageViewer.value = true
}

onMounted(() => {
  loadCompanyIntro()
})
</script>

<template>
  <section id="company-intro" class="relative py-16 lg:py-24 bg-white overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-grid-light"></div>
    <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-100/60 blur-3xl"></div>
    <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="公司介绍" subtitle="关于我们，了解联纵宸捷" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <!-- 左侧图片 -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(img, index) in intro.images"
            :key="index"
            class="group relative tech-corner tech-corner-hover rounded-xl overflow-hidden ring-1 ring-primary-100/80 hover:ring-primary-300 hover:shadow-glow cursor-pointer transition-all duration-300"
            @click="openImageViewer(img)"
          >
            <img
              :src="img"
              :alt="`公司风采${index + 1}`"
              class="w-full h-48 object-cover group-hover:scale-[1.04] transition-transform duration-300"
            />
          </div>
        </div>

        <!-- 右侧文字 -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary-500 to-cyan-400 shadow-glow-sm"></span>
            <h3 class="text-xl font-bold text-gray-800">关于联纵宸捷</h3>
          </div>

          <div class="text-gray-600 leading-relaxed space-y-4">
            <p v-for="(p, index) in (isExpanded ? paragraphs : paragraphs.slice(0, 1))" :key="index">{{ p }}</p>
          </div>

          <button
            class="mt-6 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 text-white rounded-lg text-sm font-medium tracking-wider shadow-glow-sm hover:shadow-glow transition-all duration-300"
            @click="isExpanded = !isExpanded"
          >
            {{ isExpanded ? '收起 ↑' : '查看更多 →' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
    <ImageViewer
      :visible="showImageViewer"
      :src="currentImage"
      @close="showImageViewer = false"
    />
  </section>
</template>
