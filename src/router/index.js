import { createRouter, createWebHistory } from 'vue-router'
import AboutView from './AboutView.vue'
import HomView from './HomView.vue'

const ROOT_CONFIG_URL = process.env.DEPLOY_BASE ?? '/micro-single-app-vue'
const isProduction = process.env.NODE_ENV === 'production'

const routes = [
  { path: '/', name: 'home', component: HomView },
  { path: '/about', name: 'about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(isProduction ? `${ROOT_CONFIG_URL}/vue` : '/vue'),
  routes,
})

export default router
