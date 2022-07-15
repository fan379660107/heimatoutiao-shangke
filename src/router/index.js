import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login') // 懒加载写法直接在规则中导入
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
