<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { findApp } from '../registry'

const route = useRoute()

// Resolve the :slug param to a registry entry, then lazily load its component.
const entry = computed(() => findApp(String(route.params.slug)))
const view = computed(() =>
  entry.value ? defineAsyncComponent(entry.value.component) : null,
)
</script>

<template>
  <div v-if="entry && view">
    <component :is="view" />
  </div>
  <div v-else class="rounded-lg border border-dashed border-gray-300 py-16 text-center">
    <p class="text-lg font-semibold text-gray-900">App not found</p>
    <p class="mt-1 text-sm text-gray-500">No app is registered for "{{ route.params.slug }}".</p>
  </div>
</template>
