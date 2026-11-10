<script setup lang="ts">
export interface TabItem {
  value: string
  label: string
}

defineProps<{
  tabs: TabItem[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectTab(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 mb-8">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="relative px-5 py-2 rounded-full text-sm font-medium tracking-wider border transition-all duration-300"
      :class="
        modelValue === tab.value
          ? 'text-white border-transparent bg-gradient-to-r from-primary-600 to-cyan-500 shadow-glow'
          : 'bg-white/80 text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600 hover:shadow-glow-sm'
      "
      @click="selectTab(tab.value)"
    >
      <span class="flex items-center gap-1.5">
        <span
          v-if="modelValue === tab.value"
          class="w-1 h-1 rounded-full bg-white animate-pulse"
        ></span>
        {{ tab.label }}
      </span>
    </button>
  </div>
</template>
