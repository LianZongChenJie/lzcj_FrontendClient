<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { BannerItem } from '@/types'
import { cmsApi } from '@/api/cms'

const banners = ref<BannerItem[]>([])
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  const len = banners.value.length
  if (!len) return
  currentIndex.value = (currentIndex.value + 1) % len
}

function prev() {
  const len = banners.value.length
  if (!len) return
  currentIndex.value = (currentIndex.value - 1 + len) % len
}

function goTo(index: number) {
  currentIndex.value = index
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, 5000)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

/**
 * 从 CMS 接口加载 Banner 轮播数据
 */
async function loadBanners() {
  try {
    const res = await cmsApi.getBanners()
    banners.value = res.data || []
  } catch (e) {
    console.error('Banner 加载失败', e)
  }
}

onMounted(() => {
  loadBanners()
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section id="banner" class="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
    <!-- Banner Slides -->
    <div
      class="relative w-full h-full"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-700 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="(banner, index) in banners"
          v-show="index === currentIndex"
          :key="banner.id"
          class="absolute inset-0"
        >
          <img
            :src="banner.image"
            :alt="banner.title"
            class="w-full h-full object-cover"
          />
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/40"></div>
          <!-- Content -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-white px-4 max-w-3xl">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                {{ banner.title }}
              </h1>
              <p class="text-base sm:text-lg lg:text-xl text-white/90 animate-slide-up">
                {{ banner.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Prev/Next Buttons -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      @click="prev"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      @click="next"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in banners"
        :key="index"
        class="w-2.5 h-2.5 rounded-full transition-all duration-300"
        :class="index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'"
        @click="goTo(index)"
      ></button>
    </div>
  </section>
</template>
