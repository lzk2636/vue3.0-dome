import { RouteConfig, createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes: Array<RouteConfig> = [
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/List/:type',
  name: 'List',
  // route level code-splitting
  // this generates a separate chunk (List.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "List" */ '../views/List.vue')
},
{
  path: '/detail/:id',
  name: 'detail',

  component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail.vue')
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
