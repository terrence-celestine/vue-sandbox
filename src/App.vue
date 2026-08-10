<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Sidebar open state — starts closed on mobile, CSS keeps it visible on desktop.
const open = ref(false)

// Close the mobile drawer whenever the route changes (i.e. a link was tapped).
watch(() => route.path, () => { open.value = false })

// Build the sidebar straight from the route table: any route with `meta.nav`
// shows up, grouped by `meta.group`. Add a route -> it appears here.
const groups = computed(() => {
  const bucket = new Map<string, { to: string; label: string }[]>()
  for (const r of router.getRoutes()) {
    if (!r.meta.nav) continue
    const group = r.meta.group ?? 'Other'
    const items = bucket.get(group) ?? []
    items.push({ to: r.path, label: r.meta.title ?? r.path })
    bucket.set(group, items)
  }
  return [...bucket.entries()].map(([name, items]) => ({ name, items }))
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top bar (mobile only): hamburger + title -->
    <header class="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
      <button
        type="button"
        class="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span class="font-semibold text-gray-900">Vue Sandbox</span>
    </header>

    <!-- Backdrop (mobile only, when drawer is open) -->
    <div
      v-if="open"
      class="fixed inset-0 z-30 bg-black/40 md:hidden"
      @click="open = false"
    />

    <div class="flex">
      <!-- Sidebar: fixed drawer on mobile, static column on desktop -->
      <aside
        class="fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-200 md:static md:z-auto md:translate-x-0"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span class="font-semibold text-gray-900">Vue Sandbox</span>
          <button
            type="button"
            class="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label="Close navigation"
            @click="open = false"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto px-3 py-4">
          <div v-for="group in groups" :key="group.name" class="mb-6">
            <p class="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {{ group.name }}
            </p>
            <RouterLink
              v-for="item in group.items"
              :key="item.to"
              :to="item.to"
              class="mb-0.5 block rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              active-class="bg-gray-900 text-white hover:bg-gray-900 hover:text-white"
            >
              {{ item.label }}
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
