<!-- Book.vue -->
<script setup lang="ts">
import { computed } from "vue";
import type { Book } from "../composables/useBooks";

// Define the props this component expects to receive from the parent
const props = defineProps<{ book: Book }>()

const fullStars = computed(() => Math.floor(props.book.rating))
const hasHalfStar = computed(() => props.book.rating - fullStars.value >= 0.5)

const formattedRatings = computed(() =>
  props.book.ratingsCount.toLocaleString()
)
</script>

<template>
  <div class="flex gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
    <!-- Cover -->
    <div
      class="flex aspect-[2/3] w-24 shrink-0 items-center justify-center rounded-lg p-3 text-center"
      :style="{ backgroundColor: book.coverColor }"
    >
      <p class="line-clamp-4 text-xs font-semibold uppercase leading-tight tracking-wide text-white mix-blend-difference">
        {{ book.title }}
      </p>
    </div>

    <!-- Body -->
    <div class="flex min-w-0 flex-1 flex-col">
      <h3 class="truncate font-semibold text-gray-900">{{ book.title }}</h3>
      <p class="truncate text-sm text-gray-500">by {{ book.author }}</p>

      <!-- Rating -->
      <div class="mt-1 flex items-center gap-2 text-sm">
        <span class="text-amber-500" aria-hidden="true">
          <span v-for="n in fullStars" :key="`full-${n}`">★</span><span v-if="hasHalfStar">⯪</span>
        </span>
        <span class="text-gray-700">{{ book.rating.toFixed(2) }}</span>
        <span class="text-gray-400">·</span>
        <span class="text-gray-500">{{ formattedRatings }} ratings</span>
      </div>

      <!-- Description -->
      <p class="mt-2 line-clamp-2 text-sm text-gray-600">{{ book.description }}</p>

      <!-- Footer -->
      <p class="mt-auto pt-2 text-xs text-gray-500">Published {{ book.published }}</p>
    </div>
  </div>
</template>
