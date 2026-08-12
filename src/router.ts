import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    nav?: boolean
    title?: string
    group?: string
  }
}

// Add a project by adding one route here. Set `meta.nav` to show it in the
// sidebar; `meta.group` controls which section it lands under.
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/tasks' },
  {
    path: '/product-sort',
    name: 'product sort',
    component: () => import('./components/ProductSort.vue'),
    meta: { nav: true, title: 'Product Sort', group: 'Apps' },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('./components/Tasks.vue'),
    meta: { nav: true, title: 'Tasks', group: 'Apps' },
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('./components/Dashboard.vue'),
    meta: { nav: true, title: 'Books', group: 'Apps' },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('./components/UserList.vue'),
    meta: { nav: true, title: 'Users', group: 'Apps' },
  },
  {
    path: '/counter',
    name: 'counter',
    component: () => import('./components/Counter.vue'),
    meta: { nav: true, title: 'Counter', group: 'Experiments' },
  },
  {
    path: '/hello',
    name: 'hello',
    component: () => import('./components/HelloWorld.vue'),
    meta: { nav: true, title: 'Hello World', group: 'Experiments' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
