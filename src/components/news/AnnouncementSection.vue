<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import DetailModal from '@/components/common/DetailModal.vue'
import type { Announcement } from '@/types'
import { cmsApi } from '@/api/cms'

const announcements = ref<Announcement[]>([])
const showModal = ref(false)
const currentAnnouncement = ref<Announcement | null>(null)

function openDetail(item: Announcement) {
  currentAnnouncement.value = item
  showModal.value = true
}

/** 从 CMS 接口加载公司公告 */
async function loadAnnouncements() {
  try {
    const res = await cmsApi.getAnnouncements()
    // CMS 字段 publishDate/important 映射为展示端使用的 date/important
    announcements.value = (res.data || []).map((item: any) => ({
      ...item,
      date: item.publishDate || '',
      important: !!item.important
    }))
  } catch (error) {
    console.error('公司公告加载失败', error)
  }
}

onMounted(loadAnnouncements)
</script>

<template>
  <section id="announcements" class="py-16 lg:py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="公司公告" subtitle="重要通知，第一时间知晓" />

      <div class="space-y-3">
        <div
          v-for="item in announcements"
          :key="item.id"
          class="group bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer"
          :class="item.important ? 'border-l-4 border-l-red-400' : ''"
          @click="openDetail(item)"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3
                  class="text-base font-semibold truncate transition-colors"
                  :class="item.important ? 'text-red-600' : 'text-gray-800 group-hover:text-primary-600'"
                >
                  {{ item.title }}
                </h3>
                <span
                  v-if="item.important"
                  class="shrink-0 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full"
                >
                  重要
                </span>
              </div>
              <p class="text-gray-500 text-sm line-clamp-1">{{ item.summary }}</p>
            </div>
            <span class="shrink-0 text-gray-400 text-sm">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <DetailModal
      :visible="showModal"
      :title="currentAnnouncement?.title || ''"
      @close="showModal = false"
    >
      <div v-if="currentAnnouncement">
        <div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{{ currentAnnouncement.date }}</span>
          <span
            v-if="currentAnnouncement.important"
            class="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full"
          >
            重要公告
          </span>
        </div>
        <div class="text-gray-600 leading-relaxed whitespace-pre-line">{{ currentAnnouncement.content }}</div>
      </div>
    </DetailModal>
  </section>
</template>
