<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product, SortKey } from '../types/product';

// ---- Seed data to render ----
const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "sony walk-man",
        category: 'audio',
        price: 49.99,
        inStock: true
    },
    {
        id: "2",
        name: "ipod",
        category: 'audio',
        price: 29.99,
        inStock: true
    },
    {
        id: "3",
        name: "watch",
        category: 'wearable',
        price: 9.99,
        inStock: true
    },
    {
        id: "4",
        name: "bracelet",
        category: 'wearable',
        price: 109.99,
        inStock: true
    },
    {
        id: "5",
        name: "speakers",
        category: 'audio',
        price: 69.99,
        inStock: true
    },
    {
        id: "6",
        name: "jeans",
        category: 'wearable',
        price: 19.99,
        inStock: false
    }
];

const sortKey = ref<SortKey>('price-asc');
    
// ---- The functions your component logic should implement ----
const query = ref('')

// Case-insensitive substring match on `name`. Empty query returns all.

const filterProducts = (products: Product[], query: string): Product[] => {
    return query.length === 0 ? products : products.filter((p: Product) => p.name.toLowerCase().includes(query.toLowerCase()))
}

// Returns a NEW sorted array (do not mutate input).
const sortProducts = (products: Product[], sort: SortKey): Product[] => {
    const newArr = [...products];
    newArr.sort((a,b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0
    })
    return newArr
};

const visibleProducts = computed(() => {
    return sortProducts(filterProducts(PRODUCTS, query.value), sortKey.value);
})

const clearQuery = () => {
    query.value = ""
}

const categoryClass = (cat: Product['category']): string => ({
  audio:     'bg-blue-50 text-blue-700',
  wearable:  'bg-violet-50 text-violet-700',
  accessory: 'bg-amber-50 text-amber-700',
}[cat]);

</script>

<template>
    <div class="mx-auto max-w-5xl px-4 py-10 sm:py-14">
  
      <header class="mb-8">
        <h1 class="text-3xl font-semibold tracking-tight">Products</h1>
        <p class="mt-1 text-sm text-slate-500">
          Showing <span class="font-medium text-slate-700">{{ visibleProducts.length }}</span>
          of {{ PRODUCTS.length }}<span v-if="query"> for "{{ query }}"</span>
        </p>
      </header>
  
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <input
            v-model="query"
            type="text"
            placeholder="Search products"
            aria-label="Search products"
            class="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            v-if="query"
            @click="clearQuery"
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >Clear</button>
        </div>
        <select
          v-model="sortKey"
          aria-label="Sort products"
          class="rounded-lg border border-slate-300 bg-white py-2.5 px-3.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-48"
        >
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name-asc">Name: A–Z</option>
          <option value="name-desc">Name: Z–A</option>
        </select>
      </div>
  
      <div v-if="visibleProducts.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p class="text-sm font-medium text-slate-600">No products match "{{ query }}"</p>
        <p class="mt-1 text-xs text-slate-400">Try a different search term.</p>
      </div>
  
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="product in visibleProducts"
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
  
    </div>
  </template>