<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="relative overflow-hidden bg-deep-space text-gray-300">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-grid-dark opacity-70"></div>
    <div class="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-500/15 blur-3xl"></div>
    <div class="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl"></div>
    <!-- 顶部科技光线 -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
      <!-- 科技标识行 -->
      <div class="flex items-center justify-center gap-3 mb-5">
        <span class="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60"></span>
        <span class="font-mono text-xs tracking-[0.35em] text-cyan-300/80">LIANZONG TECH</span>
        <span class="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/60"></span>
      </div>

      <p class="text-sm text-gray-400 tracking-wider">
        版权所有 &copy; 2018-{{ currentYear }} 北京联纵宸捷科技有限公司
      </p>
      <p class="mt-2">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener"
          class="font-mono text-xs text-gray-500 hover:text-cyan-300 transition-colors tracking-wider"
        >
          京ICP备2020048708号
        </a>
      </p>
    </div>
  </footer>
</template>
