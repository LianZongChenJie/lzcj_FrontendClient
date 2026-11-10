<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="text-center mb-10">
    <!-- 顶部科技装饰线 -->
    <div class="flex items-center justify-center gap-3 mb-4">
      <span class="h-px w-12 bg-gradient-to-r from-transparent to-primary-400/70"></span>
      <span class="w-1.5 h-1.5 rotate-45 bg-primary-500 shadow-glow-sm"></span>
      <span class="h-px w-12 bg-gradient-to-l from-transparent to-primary-400/70"></span>
    </div>

    <h2 class="text-2xl sm:text-3xl font-bold tracking-wide text-gray-800">
      {{ title }}
    </h2>

    <p
      v-if="subtitle"
      class="mt-3 max-w-2xl mx-auto text-sm sm:text-base tracking-wider text-gray-500"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
