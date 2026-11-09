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
      class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
      :class="
        modelValue === tab.value
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      "
      @click="selectTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
