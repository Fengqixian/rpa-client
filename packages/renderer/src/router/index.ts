import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Me from '../views/me/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
