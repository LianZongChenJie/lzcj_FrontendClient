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
  dark?: boolean
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
    :class="dark ? 'bg-[#0b1e3f]' : 'bg-slate-50'"
  >
    <!-- 科技感背景装饰 -->
    <div v-if="dark" class="absolute inset-0 tech-grid-dark"></div>
    <div v-else class="absolute inset-0 tech-dots-light"></div>
    <div
      v-if="dark"
      class="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary-500/20 blur-3xl"
    ></div>
    <div
      v-if="dark"
      class="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
    ></div>
    <div
      v-if="dark"
      class="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl"
    ></div>
    <div
      v-if="!dark"
      class="absolute -top-24 right-0 w-80 h-80 rounded-full bg-primary-100/60 blur-3xl"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle :title="title" :subtitle="subtitle" :dark="dark" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="group bg-white rounded-xl overflow-hidden border transition-shadow duration-300"
          :class="dark ? 'border-white/10 hover:shadow-xl hover:shadow-primary-500/20' : 'border-gray-100 hover:shadow-xl'"
        >
          <!-- 产品图片 -->
          <div class="relative aspect-[3/2] overflow-hidden cursor-pointer" @click="openImageViewer(product.image)">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </div>

          <!-- 产品信息 -->
          <div class="p-5">
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ product.summary }}</p>
            <button
              class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              @click="openDetail(product)"
            >
              查看详情 →
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
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p class="text-gray-600 leading-relaxed mb-4">{{ currentProduct.description }}</p>

        <div v-if="currentProduct.features.length > 0" class="mb-4">
          <h4 class="font-semibold text-gray-800 mb-2">核心特性</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="feature in currentProduct.features"
              :key="feature"
              class="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
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
              class="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full"
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
