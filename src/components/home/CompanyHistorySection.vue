<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { Milestone } from '@/types'
import { cmsApi } from '@/api/cms'
import SectionTitle from '@/components/common/SectionTitle.vue'

const milestones = ref<Milestone[]>([])
const visibleItems = ref<Set<number>>(new Set())

let observer: IntersectionObserver | null = null

const bindObserver = () => {
  document.querySelectorAll('[data-milestone]').forEach((el) => observer!.observe(el))
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          visibleItems.value.add(index)
        }
      })
    },
    { threshold: 0.2 }
  )
  bindObserver()
  loadMilestones()
})

// CMS 数据加载替换列表后，重新绑定滚动动画观察
watch(milestones, async () => {
  await nextTick()
  observer?.disconnect()
  bindObserver()
})

/** 从 CMS 接口加载发展历程 */
async function loadMilestones() {
  try {
    const res = await cmsApi.getMilestones()
    milestones.value = res.data || []
  } catch (error) {
    console.error('发展历程加载失败', error)
  }
}

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="company-history" class="py-16 lg:py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="发展历程" subtitle="稳步前行，每一步都是新的起点" />

      <!-- 时间轴 -->
      <div class="relative">
        <!-- 中轴线 -->
        <div class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200"></div>

        <div
          v-for="(item, index) in milestones"
          :key="item.year"
          :data-index="index"
          data-milestone
          class="relative mb-10 last:mb-0 transition-all duration-700"
          :class="[
            visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            index % 2 === 0 ? 'md:pr-[50%] pl-12 md:pl-0 md:text-right' : 'md:pl-[50%] pl-12'
          ]"
        >
          <!-- 时间点 -->
          <div
            class="absolute top-1 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-md"
            :class="index % 2 === 0 ? 'left-2.5 md:left-auto md:right-0 md:translate-x-1/2' : 'left-2.5 md:left-0 md:-translate-x-1/2'"
          ></div>

          <!-- 内容卡片 -->
          <div
            class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            :class="index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'"
          >
            <span class="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-sm font-semibold rounded-full mb-2">
              {{ item.year }}
            </span>
            <h4 class="text-lg font-bold text-gray-800 mb-1">{{ item.title }}</h4>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
