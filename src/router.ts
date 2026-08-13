import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Two route shapes, Storybook-style:
//   /apps/:slug      -> a full, composed app demo (AppHost)
//   /component/:slug -> a single reusable component in isolation (ComponentHost)
// Both resolve their :slug via src/registry.ts. Add a demo there, not here.
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/apps/tasks' },
  {
    path: '/apps/:slug',
    name: 'app',
    component: () => import('./views/AppHost.vue'),
  },
  {
    path: '/component/:slug',
    name: 'component',
    component: () => import('./views/ComponentHost.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
