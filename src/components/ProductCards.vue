<script setup lang="ts">
import type { Product } from '../types/product';
import ProductCard from './ProductCard.vue';
defineProps<{ products: Product[] }>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>