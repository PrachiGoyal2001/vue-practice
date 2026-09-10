import { createRouter, createWebHistory } from 'vue-router'
import AuthComponent from '../pages/AuthPage.vue'
import ProductPage from '../pages/ProductPage.vue'
import ProductDetailPage from '../pages/ProductDetailPage.vue'
import CartPage from '../pages/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthComponent,
      meta: { requireAuth: false },
      name: 'auth',
    },
    {
      path: '/',
      component: ProductPage,
      meta: { requireAuth: true },
      name: 'product',
    },
    {
      path: '/product-detail/:id',
      component: ProductDetailPage,
      meta: { requireAuth: true },
      name: 'product-detail',
    },
    {
      path: '/cart',
      component: CartPage,
      meta: { requireAuth: true },
      name: 'cart-page',
    },
  ],
})

router.beforeEach((to, from) => {
  const isUserLoggedIn = localStorage.getItem('user_token')
  if (!isUserLoggedIn && to.meta.requireAuth) {
    return { name: 'auth' }
  }
  if (isUserLoggedIn && to.name === 'auth') {
    return { name: 'product' }
  }
})

export default router
