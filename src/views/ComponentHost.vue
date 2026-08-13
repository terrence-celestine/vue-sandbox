<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { findComponent } from '../registry'

const route = useRoute()

// Resolve the :slug param to a registry entry, then lazily load its component.
const entry = computed(() => findComponent(String(route.params.slug)))
const view = computed(() =>
  entry.value ? defineAsyncComponent(entry.value.component) : null,
)
</script>

<template>
  <div v-if="entry && view">
    <div class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Component</p>
      <h1 class="text-2xl font-bold text-gray-900">{{ entry.title }}</h1>
    </div>

    <!-- Isolation frame: the component rendered alone on a neutral canvas -->
    <div class="rounded-xl border border-gray-200 bg-gray-100 p-8">
      <div class="flex justify-center">
        <component :is="view" v-bind="entry.props" />
      </div>
    </div>
  </div>
  <div v-else class="rounded-lg border border-dashed border-gray-300 py-16 text-center">
    <p class="text-lg font-semibold text-gray-900">Component not found</p>
    <p class="mt-1 text-sm text-gray-500">No component is registered for "{{ route.params.slug }}".</p>
  </div>
</template>
