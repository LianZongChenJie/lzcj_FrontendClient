<script setup lang="ts">
import { ref } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import DetailModal from '@/components/common/DetailModal.vue'
import ImageViewer from '@/components/common/ImageViewer.vue'
import type { Product } from '@/types'

defineProps<{
  title: string
  subtitle?: string
  products: Product[]
  type: 'self' | 'agent'
}>()

const showModal = ref(false)
const showImageViewer = ref(false)
const currentProduct = ref<Product | null>(null)
const currentImage = ref('')

function openDetail(product: Product) {
  currentProduct.value = product
  showModal.value = true
}

function openImageViewer(src: string) {
  currentImage.value = src
  showImageViewer.value = true
}
</script>

<template>
  <section
    :id="type === 'self' ? 'self-products' : 'agent-products'"
    class="relative py-16 lg:py-24 overflow-hidden"
    :class="type === 'self' ? 'bg-white' : 'bg-slate-50'"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 tech-dots-light"></div>
    <div class="absolute -top-24 right-0 w-80 h-80 rounded-full bg-primary-100/60 blur-3xl"></div>
    <div class="absolute -bottom-24 left-0 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle :title="title" :subtitle="subtitle" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="group rounded-xl overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-glow tech-corner tech-corner-hover"
        >
          <!-- 产品图片 -->
          <div class="relative aspect-[3/2] overflow-hidden cursor-pointer" @click="openImageViewer(product.image)">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>

          <!-- 产品信息 -->
          <div class="p-5">
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">
              {{ product.summary }}
            </p>
            <button
              class="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 transition-colors"
              @click="openDetail(product)"
            >
              查看详情
              <span class="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <DetailModal
      :visible="showModal"
      :title="currentProduct?.name || ''"
      @close="showModal = false"
    >
      <div v-if="currentProduct">
        <img
          :src="currentProduct.image"
          :alt="currentProduct.name"
          class="w-full h-48 object-cover rounded-lg mb-4 ring-1 ring-primary-100"
        />
        <p class="text-gray-600 leading-relaxed mb-4">{{ currentProduct.description }}</p>

        <div v-if="currentProduct.features.length > 0" class="mb-4">
          <h4 class="font-semibold text-gray-800 mb-2">核心特性</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="feature in currentProduct.features"
              :key="feature"
              class="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full border border-primary-100"
            >
              {{ feature }}
            </span>
          </div>
        </div>

        <div v-if="currentProduct.scenarios && currentProduct.scenarios.length > 0">
          <h4 class="font-semibold text-gray-800 mb-2">适用场景</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="scene in currentProduct.scenarios"
              :key="scene"
              class="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full border border-green-100"
            >
              {{ scene }}
            </span>
          </div>
        </div>
      </div>
    </DetailModal>

    <!-- 图片预览 -->
    <ImageViewer
      :visible="showImageViewer"
      :src="currentImage"
      @close="showImageViewer = false"
    />
  </section>
</template>
