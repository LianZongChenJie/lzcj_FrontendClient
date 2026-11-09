<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="text-center text-sm text-gray-500">
        <p>版权所有 &copy; 2018-{{ currentYear }} 北京联纵宸捷科技有限公司</p>
        <p class="mt-1">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="hover:text-primary-400 transition-colors">
            京ICP备2020048708号
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
