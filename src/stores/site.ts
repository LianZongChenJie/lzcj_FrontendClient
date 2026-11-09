import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import siteConfig from '@/data/site.config'
import { navigationRoutes } from '@/config/navigation'
import type { SiteConfig, NavRoute } from '@/types'

export const useSiteStore = defineStore('site', () => {
  /**
   * 站点元信息（公司名、版权、分支机构等）
   * 说明：后端暂未提供站点配置表与公开接口，此处保留前端静态配置；
   *       待 site_config 表与接口就绪后，可改为接口加载。
   */
  const config = ref<SiteConfig>(siteConfig as SiteConfig)
  /** 导航配置为前端页面结构常量 */
  const navRoutes = ref<NavRoute[]>(navigationRoutes)

  const companyName = computed(() => config.value.companyName)
  const companyShortName = computed(() => config.value.companyShortName)

  // 获取当前路由的所有锚点
  function getAnchorsByRoute(routePath: string): NavRoute | undefined {
    return navRoutes.value.find((r) => r.path === routePath)
  }

  // 获取所有锚点扁平列表
  const allAnchors = computed(() => {
    return navRoutes.value.flatMap((r) => r.anchors.map((a) => ({ ...a, route: r.path })))
  })

  return {
    config,
    navRoutes,
    companyName,
    companyShortName,
    allAnchors,
    getAnchorsByRoute
  }
})
