<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const route = useRoute()
const router = useRouter()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeAnchor = ref('')

// 当前路由的锚点
const currentAnchors = computed(() => {
  const navRoute = siteStore.getAnchorsByRoute(route.path)
  return navRoute?.anchors || []
})

// 滚动监听
function handleScroll() {
  isScrolled.value = window.scrollY > 20

  // 当前锚点高亮：从后往前找，选中第一个顶部进入阈值且底部仍在可视区域内的锚点
  const sections = currentAnchors.value.map((a) => document.getElementById(a.id))
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section) {
      const rect = section.getBoundingClientRect()
      // top <= 200: 锚点顶部进入视口上沿200px范围内
      // bottom > 80: 锚点底部仍在视口内（未被滚出上方）
      if (rect.top <= 200 && rect.bottom > 80) {
        activeAnchor.value = currentAnchors.value[i].id
        break
      }
    }
  }
}

// 固定 Header 高度 + 间距
const HEADER_HEIGHT = 72

// 滚动到指定元素（带偏移以避开固定 Header）
function scrollToEl(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const scrollTop = window.scrollY + rect.top - HEADER_HEIGHT
  window.scrollTo({ top: scrollTop, behavior: 'smooth' })
}

// 锚点滚动（支持跨路由跳转）
async function scrollToAnchor(anchorId: string) {
  isMobileMenuOpen.value = false

  // 在所有路由中查找目标锚点所在的导航
  const anchorRoute = siteStore.navRoutes.find((r) =>
    r.anchors.some((a) => a.id === anchorId)
  )

  if (!anchorRoute) return

  if (anchorRoute.path !== route.path) {
    // 跨路由：先切换路由，再滚动到锚点
    await router.push(anchorRoute.path)
    // 等待页面渲染完毕（多次 nextTick + 轮询确保元素已挂载）
    await nextTick()
    await nextTick()
    const maxAttempts = 20
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(anchorId)
      if (el) {
        scrollToEl(el)
      } else if (attempts < maxAttempts) {
        attempts++
        setTimeout(tryScroll, 50)
      }
    }
    setTimeout(tryScroll, 100)
  } else {
    // 同路由：直接滚动
    const el = document.getElementById(anchorId)
    if (el) {
      scrollToEl(el)
    }
  }
}

// 路由切换
function navigateTo(path: string) {
  if (path !== route.path) {
    router.push(path)
  }
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      isScrolled
        ? 'glass-dark border-b border-cyan-400/10 shadow-lg shadow-black/30'
        : 'bg-gradient-to-b from-ink-950/80 via-ink-950/30 to-transparent'
    "
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-[72px]">
        <!-- Logo -->
        <div
          class="flex items-center cursor-pointer group"
          @click="navigateTo('/')"
        >
          <div
            class="bg-white/95 rounded-lg px-2 py-1.5 ring-1 ring-white/60 shadow-sm group-hover:shadow-glow-sm transition-shadow duration-300"
          >
            <img
              src="/images/logo.jpg"
              alt="联纵宸捷"
              class="h-8 w-auto object-contain"
            />
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <div
            v-for="navRoute in siteStore.navRoutes"
            :key="navRoute.path"
            class="relative group"
          >
            <button
              class="relative px-5 py-2.5 rounded-lg text-sm font-medium tracking-wider transition-colors duration-200"
              :class="
                route.path === navRoute.path
                  ? 'text-cyan-300'
                  : 'text-white/70 hover:text-white'
              "
              @click="navigateTo(navRoute.path)"
            >
              {{ navRoute.label }}
              <span
                class="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary-400 to-cyan-300 transition-all duration-300"
                :class="
                  route.path === navRoute.path
                    ? 'w-2/3 shadow-glow-sm'
                    : 'w-0 group-hover:w-1/3'
                "
              ></span>
            </button>

            <!-- Dropdown anchors -->
            <div
              v-if="navRoute.anchors.length > 0"
              class="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <div class="glass-dark rounded-xl border border-cyan-400/10 shadow-xl shadow-black/30 py-1.5 w-40">
                <button
                  v-for="anchor in navRoute.anchors"
                  :key="anchor.id"
                  class="block w-full text-left px-4 py-2.5 text-sm tracking-wider transition-colors flex items-center gap-2"
                  :class="
                    activeAnchor === anchor.id && route.path === navRoute.path
                      ? 'text-cyan-300 bg-cyan-400/10 border-r-2 border-cyan-300'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  "
                  @click="scrollToAnchor(anchor.id)"
                >
                  <span class="w-1 h-1 rotate-45 bg-current opacity-60 shrink-0"></span>
                  {{ anchor.label }}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 滚动后的流动光线 -->
    <div
      class="absolute bottom-0 left-0 right-0 flow-line transition-opacity duration-500"
      :class="isScrolled ? 'opacity-80' : 'opacity-0'"
    ></div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden glass-dark border-t border-cyan-400/10 shadow-xl shadow-black/30"
      >
        <div class="px-4 py-3 space-y-1">
          <button
            v-for="navRoute in siteStore.navRoutes"
            :key="navRoute.path"
            class="block w-full text-left px-4 py-3 rounded-lg text-base font-medium tracking-wider transition-colors"
            :class="
              route.path === navRoute.path
                ? 'text-cyan-300 bg-cyan-400/10'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            "
            @click="navigateTo(navRoute.path)"
          >
            {{ navRoute.label }}
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>
