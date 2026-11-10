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
  <section id="company-history" class="relative py-16 lg:py-24 overflow-hidden bg-slate-50">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-grid-light"></div>
    <div class="absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-primary-100/60 blur-3xl"></div>
    <div class="absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="发展历程" subtitle="稳步前行，每一步都是新的起点" />

      <!-- 时间轴 -->
      <div class="relative">
        <!-- 中轴线（渐变） -->
        <div class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-cyan-400 to-primary-300"></div>

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
          <!-- 时间点（脉冲光环） -->
          <div
            class="absolute top-1 w-4 h-4 left-2.5"
            :class="index % 2 === 0 ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'"
          >
            <span class="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-40 animate-ping"></span>
            <span class="relative inline-flex w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 border-2 border-white shadow-glow-sm"></span>
          </div>

          <!-- 内容卡片 -->
          <div
            class="group bg-white rounded-xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-glow transition-all duration-300 tech-corner tech-corner-hover"
            :class="index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'"
          >
            <span class="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 text-sm font-mono font-semibold rounded-full mb-2">
              {{ item.year }}
            </span>
            <h4 class="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">{{ item.title }}</h4>
            <p class="text-gray-500 text-sm leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
