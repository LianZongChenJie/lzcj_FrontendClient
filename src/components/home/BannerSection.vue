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
  <section
    id="banner"
    class="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-ink-950"
  >
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
          <!-- Overlay：深空渐变 -->
          <div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-900/30 to-ink-950/85"></div>
          <!-- 科技网格 -->
          <div class="absolute inset-0 tech-grid-dark opacity-80"></div>
          <!-- 内容 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-white px-4 max-w-3xl">
              <!-- HUD 页码指示 -->
              <div class="flex items-center justify-center gap-3 mb-5 animate-fade-in">
                <span class="h-px w-8 bg-gradient-to-r from-transparent to-cyan-300/70"></span>
                <span class="font-mono text-xs tracking-[0.3em] text-cyan-300/80">
                  {{ String(index + 1).padStart(2, '0') }} / {{ String(banners.length).padStart(2, '0') }}
                </span>
                <span class="h-px w-8 bg-gradient-to-l from-transparent to-cyan-300/70"></span>
              </div>

              <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in bg-gradient-to-r from-white via-cyan-100 to-primary-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.45)]"
              >
                {{ banner.title }}
              </h1>

              <div
                v-if="banner.subtitle"
                class="text-base sm:text-lg lg:text-xl text-white/90 animate-slide-up"
              >
                {{ banner.subtitle }}<span class="inline-block w-[2px] h-[1em] ml-1.5 bg-cyan-300 align-middle animate-blink shadow-glow-sm"></span>
              </div>

              <!-- 底部流动光线 -->
              <div class="mt-6 flow-line w-40 mx-auto animate-slide-up"></div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- 漂浮光斑装饰 -->
    <div class="absolute top-1/4 left-[10%] w-28 h-28 rounded-full bg-primary-500/25 blur-2xl animate-float-slow pointer-events-none"></div>
    <div class="absolute bottom-1/3 right-[8%] w-36 h-36 rounded-full bg-cyan-400/15 blur-3xl animate-float pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full border border-cyan-300/10 animate-spin-slow pointer-events-none hidden lg:block"></div>

    <!-- Prev/Next Buttons -->
    <button
      class="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-cyan-300/30 bg-white/5 backdrop-blur-sm text-white/80 hover:text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/10 hover:shadow-glow flex items-center justify-center transition-all duration-300"
      @click="prev"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-cyan-300/30 bg-white/5 backdrop-blur-sm text-white/80 hover:text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/10 hover:shadow-glow flex items-center justify-center transition-all duration-300"
      @click="next"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
      <button
        v-for="(_, index) in banners"
        :key="index"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="
          index === currentIndex
            ? 'w-8 bg-gradient-to-r from-primary-400 to-cyan-300 shadow-glow-sm'
            : 'w-2.5 bg-white/30 hover:bg-white/60'
        "
        @click="goTo(index)"
      ></button>
    </div>
  </section>
</template>
