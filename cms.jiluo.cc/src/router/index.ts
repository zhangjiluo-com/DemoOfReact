import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue'),
      children: [
        {
          path: 'list',
          component: () => import('../views/list.vue')
        },
        {
          path: 'articles/:id',
          component: () => import('../views/detail.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login.vue')
    }
  ]
})

export default router
