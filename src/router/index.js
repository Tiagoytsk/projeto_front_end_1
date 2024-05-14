import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from '../views/Login.vue'
import Catalogo from '@/views/Catalogo.vue'
import HomeView from '@/views/HomeView.vue'
import Favoritos from '@/views/Favoritos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Login',
    component: Login,
  },
  {
    path: '/Catalogo',
    component: Catalogo,
    meta: { requiresAuth: true } 

  },
  {
    path: '/Favoritos',
    component: Favoritos,
    meta: { requiresAuth: true } 

  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router