<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Job, BranchContact } from '@/types'
import { cmsApi } from '@/api/cms'
import CareerSection from '@/components/join/CareerSection.vue'
import ContactSection from '@/components/join/ContactSection.vue'

const jobs = ref<Job[]>([])
const contacts = ref<BranchContact[]>([])

/** 从 CMS 接口加载招聘信息与分公司联系方式 */
async function loadJoinData() {
  try {
    jobs.value = (await cmsApi.getJobs()).data || []
  } catch (error) {
    console.error('招聘信息加载失败', error)
  }
  try {
    contacts.value = (await cmsApi.getContacts()).data || []
  } catch (error) {
    console.error('联系方式加载失败', error)
  }
}

onMounted(loadJoinData)
</script>

<template>
  <div>
    <CareerSection :jobs="jobs" />
    <ContactSection :contacts="contacts" />
  </div>
</template>
