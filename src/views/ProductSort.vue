<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product, SortKey } from '../types/product';
import SelectDropDown from '../components/ui/SelectDropDown.vue';
import type { SelectOption } from '../types/select.ts';
import NoProducts from '../components/NoProducts.vue';
import ProductCards from '../components/ProductCards.vue';
import ProductSearch from '../components/ProductSearch.vue';
import Button from '../components/ui/Button.vue';
import { PRODUCTS } from "../mocks/products.ts"

const sortKey = ref<SortKey>('price-asc');
  
const sortOptions: SelectOption<SortKey>[] = [
  { value: 'price-asc',  label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name-asc',   label: 'Name: A–Z' },
  { value: 'name-desc',  label: 'Name: Z–A' },
]

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
          <ProductSearch placeholder="Type here to look for product" v-model="query"/>
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <Button v-if="query.length" @click="clearQuery" >Clear Query</Button>
          </div>
        </div>
        <SelectDropDown :options="sortOptions" v-model="sortKey"/>
      </div>
      <NoProducts v-if="visibleProducts.length === 0" :query="query"/>
      <ProductCards v-else :products="visibleProducts"/>
    </div>
  </template>