<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findComponent } from '../registry'

const route = useRoute()

// Resolve the :slug param to a registry entry, then lazily load its component.
const entry = computed(() => findComponent(String(route.params.slug)))
const view = computed(() =>
  entry.value ? defineAsyncComponent(entry.value.component) : null,
)

// Variants come from the component's co-located story. Reset to the first
// whenever the route (i.e. the component) changes.
const variants = computed(() => entry.value?.variants ?? [])
const activeIndex = ref(0)
watch(() => route.params.slug, () => (activeIndex.value = 0))
const activeVariant = computed(() => variants.value[activeIndex.value])
</script>

<template>
  <div v-if="entry && view">
    <div class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Component</p>
      <h1 class="text-2xl font-bold text-gray-900">{{ entry.title }}</h1>
    </div>

    <!-- Variant switcher: only shown when the story defines more than one -->
    <div v-if="variants.length > 1" class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="(variant, i) in variants"
        :key="variant.name"
        type="button"
        class="rounded-full border px-3 py-1 text-sm transition"
        :class="i === activeIndex
          ? 'border-field-border-focus bg-field-border-focus text-white'
          : 'border-field-border bg-field-bg text-gray-700 hover:border-gray-400'"
        @click="activeIndex = i"
      >
        {{ variant.name }}
      </button>
    </div>

    <!-- Isolation frame: the active variant rendered alone on a neutral canvas -->
    <div>
      <component :is="view" v-bind="activeVariant?.props" />
    </div>
  </div>
  <div v-else class="rounded-lg border border-dashed border-gray-300 py-16 text-center">
    <p class="text-lg font-semibold text-gray-900">Component not found</p>
    <p class="mt-1 text-sm text-gray-500">No component is registered for "{{ route.params.slug }}".</p>
  </div>
</template>
