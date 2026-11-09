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
  <section id="company-intro" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="公司介绍" subtitle="关于我们，了解联纵宸捷" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <!-- 左侧图片 -->
        <div class="grid grid-cols-2 gap-4">
          <img
            v-for="(img, index) in intro.images"
            :key="index"
            :src="img"
            :alt="`公司风采${index + 1}`"
            class="rounded-xl shadow-md w-full h-48 object-cover cursor-pointer hover:scale-[1.02] transition-transform"
            @click="openImageViewer(img)"
          />
        </div>

        <!-- 右侧文字 -->
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">关于联纵宸捷</h3>

          <div class="text-gray-600 leading-relaxed space-y-4">
            <p v-for="(p, index) in (isExpanded ? paragraphs : paragraphs.slice(0, 1))" :key="index">{{ p }}</p>
          </div>

          <button
            class="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            @click="isExpanded = !isExpanded"
          >
            {{ isExpanded ? '收起' : '查看更多' }}
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
