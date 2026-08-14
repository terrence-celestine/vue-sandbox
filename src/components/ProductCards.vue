<script setup lang="ts">
import type { Product } from '../types/product';

defineProps<{products:Product[]}>()

const categoryClass = (cat: Product['category']): string => ({
  audio:     'bg-blue-50 text-blue-700',
  wearable:  'bg-violet-50 text-violet-700',
  accessory: 'bg-amber-50 text-amber-700',
}[cat]);

</script>

<template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="product in products"
          :key="product.id"
          class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          :class="{ 'opacity-60 grayscale': !product.inStock }"
        >
          <div class="mb-3 flex items-start justify-between gap-2">
            <span class="rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide" :class="categoryClass(product.category)">
              {{ product.category }}
            </span>
            <span
              class="rounded-full px-2 py-0.5 text-[11px] font-medium"
              :class="product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'"
            >
              {{ product.inStock ? 'In stock' : 'Out of stock' }}
            </span>
          </div>
  
          <h2 class="text-base font-semibold capitalize text-slate-900">{{ product.name }}</h2>
  
          <div class="mt-auto pt-4">
            <span class="text-2xl font-semibold tracking-tight tabular-nums">${{ product.price.toFixed(2) }}</span>
          </div>
        </article>
      </div>
</template>