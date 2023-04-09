import { createRouter, createWebHistory } from 'vue-router'
import MainComp from '../views/MainComp.vue'

const routes = [
  { path: '/',                      name: 'home',    component: MainComp                                        },
  { path: '/login',                 name: 'login',   component: () => import("../views/LoginView.vue")          },
  { path: '/categories/item/:cno',  name: 'item',    component: () => import("../views/ItemsView.vue")          },
  { path: '/product/search/:typed', name: 'search',  component: () => import("../views/SearchItems.vue")        },
  { path: '/product/detail/:pno',   name: 'product', component: () => import("../views/ProductDetail.vue")      },
  { path: '/cart',                  name: 'cart',    component: () => import("../views/Cart.vue")               },
  { path: '/login/not-yet',         name: 'not-yet', component: () => import("../views/UnderConstruction.vue")  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
