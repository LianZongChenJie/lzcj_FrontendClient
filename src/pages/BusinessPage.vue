<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, Solution, TechService } from '@/types'
import { cmsApi } from '@/api/cms'
import ProductSection from '@/components/business/ProductSection.vue'
import SolutionSection from '@/components/business/SolutionSection.vue'
import TechServiceSection from '@/components/business/TechServiceSection.vue'

const selfProducts = ref<Product[]>([])
const agentProducts = ref<Product[]>([])
const solutions = ref<Solution[]>([])
const techServices = ref<TechService[]>([])

/** 从 CMS 接口加载产品数据 */
async function loadProducts() {
  try {
    selfProducts.value = (await cmsApi.getSelfProducts()).data || []
  } catch (e) {
    console.error('自研产品加载失败', e)
  }
  try {
    agentProducts.value = (await cmsApi.getAgentProducts()).data || []
  } catch (e) {
    console.error('代理产品加载失败', e)
  }
}

/** 从 CMS 接口加载解决方案与技术服务数据 */
async function loadSolutions() {
  try {
    solutions.value = (await cmsApi.getSolutions()).data || []
  } catch (e) {
    console.error('解决方案加载失败', e)
  }
  try {
    techServices.value = (await cmsApi.getTechServices()).data || []
  } catch (e) {
    console.error('技术服务加载失败', e)
  }
}

onMounted(() => {
  loadProducts()
  loadSolutions()
})
</script>

<template>
  <div>
    <ProductSection
      title="自研产品"
      subtitle="核心技术自主研发，打造优质产品"
      :products="selfProducts"
      type="self"
    />
    <ProductSection
      title="代理产品"
      subtitle="精选行业优质产品，为客户提供更多选择"
      :products="agentProducts"
      type="agent"
    />
    <SolutionSection :solutions="solutions" />
    <TechServiceSection :services="techServices" />
  </div>
</template>
