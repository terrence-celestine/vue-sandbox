<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { apps, components } from './registry'

const route = useRoute()

// Sidebar open state — starts closed on mobile, CSS keeps it visible on desktop.
const open = ref(false)

// Desktop-only: collapse the sidebar to an icon rail. Persisted across reloads.
const collapsed = ref(localStorage.getItem('sidebar-collapsed') === '1')
watch(collapsed, (v) => localStorage.setItem('sidebar-collapsed', v ? '1' : '0'))

// Close the mobile drawer whenever the route changes (i.e. a link was tapped).
watch(() => route.path, () => { open.value = false })

// Build the sidebar from the registry: full apps under /apps, isolated
// components under /component. Add an entry in registry.ts -> it appears here.
const groups = [
  { name: 'Apps', items: apps.map((a) => ({ to: `/apps/${a.slug}`, label: a.title, icon: a.icon })) },
  { name: 'Components', items: components.map((c) => ({ to: `/component/${c.slug}`, label: c.title, icon: c.icon })) },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top bar (mobile only): hamburger + title -->
    <header class="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
      <button type="button" class="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        aria-label="Toggle navigation" @click="open = !open">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span class="font-semibold text-gray-900">Vue Sandbox</span>
    </header>

    <!-- Backdrop (mobile only, when drawer is open) -->
    <div v-if="open" class="fixed inset-0 z-30 bg-black/40 md:hidden" @click="open = false" />

    <div class="flex md:min-h-screen">
      <!-- Sidebar: fixed drawer on mobile, static column on desktop.
           Width collapses to an icon rail on desktop when `collapsed`. -->
      <aside
        class="fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-200 md:static md:z-auto md:translate-x-0"
        :class="[
          open ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'md:w-16' : 'md:w-60',
        ]">
        <div class="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <span class="font-semibold text-gray-900" :class="collapsed ? 'md:hidden' : ''">
            Vue Sandbox
          </span>

          <!-- Collapse toggle (desktop only) -->
          <button type="button"
            class="hidden rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:inline-flex"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'" @click="collapsed = !collapsed">
            <svg class="h-5 w-5 transition-transform" :class="collapsed ? 'rotate-180' : ''" fill="none"
              stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Close drawer (mobile only) -->
          <button type="button" class="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label="Close navigation" @click="open = false">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          <div v-for="group in groups" :key="group.name" class="mb-6">
            <p class="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
              :class="collapsed ? 'md:hidden' : ''">
              {{ group.name }}
            </p>
            <RouterLink v-for="item in group.items" :key="item.to" :to="item.to"
              :title="collapsed ? item.label : undefined"
              class="mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              :class="collapsed ? 'md:justify-center md:px-0' : ''"
              active-class="bg-gray-900 text-white hover:bg-gray-900 hover:text-white">
              <component :is="item.icon" class="h-5 w-5 shrink-0" :stroke-width="2" />
              <span :class="collapsed ? 'md:hidden' : ''">{{ item.label }}</span>
            </RouterLink>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="min-w-0 flex-1 overflow-x-hidden">
        <div class="mx-auto max-w-5xl px-6 py-8">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
