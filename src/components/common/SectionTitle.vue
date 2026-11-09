<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  dark?: boolean
}>()
</script>

<template>
  <div class="text-center mb-10">
    <h2
      class="text-2xl sm:text-3xl font-bold relative inline-block"
      :class="dark ? 'text-white' : 'text-gray-800'"
    >
      {{ title }}
      <span class="block w-12 h-1 bg-primary-500 rounded-full mx-auto mt-3"></span>
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 max-w-2xl mx-auto"
      :class="dark ? 'text-blue-200/80' : 'text-gray-500'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
