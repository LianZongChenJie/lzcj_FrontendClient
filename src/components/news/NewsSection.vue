<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import DetailModal from '@/components/common/DetailModal.vue'
import type { NewsItem } from '@/types'
import { cmsApi } from '@/api/cms'

const news = ref<NewsItem[]>([])
const showModal = ref(false)
const currentNews = ref<NewsItem | null>(null)

function openDetail(item: NewsItem) {
  currentNews.value = item
  showModal.value = true
}

/** 从 CMS 接口加载新闻中心 */
async function loadNews() {
  try {
    const res = await cmsApi.getNewsList({ pageNo: 1, pageSize: 20 })
    // CMS 字段 publishDate 映射为展示端使用的 date
    news.value = (res.data?.list || []).map((item: any) => ({
      ...item,
      date: item.publishDate || ''
    }))
  } catch (error) {
    console.error('新闻中心加载失败', error)
  }
}

onMounted(loadNews)
</script>

<template>
  <section id="news-center" class="relative py-16 lg:py-24 bg-white overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-grid-light"></div>
    <div class="absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-primary-100/50 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="新闻中心" subtitle="了解公司最新动态" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="item in news"
          :key="item.id"
          class="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-glow transition-all duration-300 cursor-pointer tech-corner tech-corner-hover"
          @click="openDetail(item)"
        >
          <div class="relative aspect-[16/10] overflow-hidden">
            <img
              :src="item.cover"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ item.summary }}</p>
            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-xs font-mono tracking-wider">{{ item.date }}</span>
              <span class="text-primary-600 text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                阅读更多
                <span>→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DetailModal
      :visible="showModal"
      :title="currentNews?.title || ''"
      @close="showModal = false"
    >
      <div v-if="currentNews">
        <img
          :src="currentNews.cover"
          :alt="currentNews.title"
          class="w-full h-48 object-cover rounded-lg mb-4 ring-1 ring-primary-100"
        />
        <div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span class="font-mono">{{ currentNews.date }}</span>
          <span v-if="currentNews.author">作者：{{ currentNews.author }}</span>
        </div>
        <div class="text-gray-600 leading-relaxed whitespace-pre-line">{{ currentNews.content }}</div>
      </div>
    </DetailModal>
  </section>
</template>
