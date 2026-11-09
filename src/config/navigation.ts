import type { NavRoute } from '@/types'

/**
 * 站点导航配置
 * 说明：导航路由与锚点为前端页面结构配置（锚点与页面 section id 对应），
 * 不属于内容管理数据，故不存放于后端数据库。
 */
export const navigationRoutes: NavRoute[] = [
  {
    path: '/',
    name: 'home',
    label: '首页',
    anchors: [
      { id: 'company-intro', label: '公司介绍' },
      { id: 'company-history', label: '发展历程' },
      { id: 'company-culture', label: '企业文化' },
      { id: 'employee-gallery', label: '员工风采' },
      { id: 'honors', label: '资质荣誉' }
    ]
  },
  {
    path: '/business',
    name: 'business',
    label: '公司业务',
    anchors: [
      { id: 'self-products', label: '自研产品' },
      { id: 'agent-products', label: '代理产品' },
      { id: 'solutions', label: '解决方案' },
      { id: 'tech-services', label: '技术服务' }
    ]
  },
  {
    path: '/news',
    name: 'news',
    label: '公司动态',
    anchors: [
      { id: 'news-center', label: '新闻中心' },
      { id: 'announcements', label: '公司公告' }
    ]
  },
  {
    path: '/join',
    name: 'join',
    label: '加入我们',
    anchors: [
      { id: 'careers', label: '人才招聘' },
      { id: 'contact', label: '联系方式' }
    ]
  }
]
