import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: '北京联纵宸捷科技有限公司' }
  },
  {
    path: '/business',
    name: 'business',
    component: () => import('@/pages/BusinessPage.vue'),
    meta: { title: '公司业务 - 北京联纵宸捷科技有限公司' }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/pages/NewsPage.vue'),
    meta: { title: '公司动态 - 北京联纵宸捷科技有限公司' }
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('@/pages/JoinPage.vue'),
    meta: { title: '加入我们 - 北京联纵宸捷科技有限公司' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  // 子路径部署时，Vite 会把 base 注入为 import.meta.env.BASE_URL，
  // 路由需与其保持一致，否则刷新页面 404
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// 动态设置页面标题
router.beforeEach((to) => {
  document.title = (to.meta.title as string) || '北京联纵宸捷科技有限公司'
})

export default router
