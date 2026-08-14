<script setup lang="ts">
import type { Product } from '../types/product';
import Badge from './ui/Badge.vue';
import ProductStockBadge from './ProductStockBadge.vue';

interface ProductCard {
    product: Product
}

defineProps<ProductCard>()

const categoryClass = (cat: Product['category']): string => ({
    audio: 'bg-blue-50 text-blue-700',
    wearable: 'bg-violet-50 text-violet-700',
    accessory: 'bg-amber-50 text-amber-700',
}[cat]);
</script>

<template>
    <article
        class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        :class="{ 'opacity-60 grayscale': !product.inStock }">
        <div class="mb-3 flex items-start justify-between gap-2">
            <Badge :class="categoryClass(product.category)">{{ product.category }}</Badge>
            <ProductStockBadge :in-stock="product.inStock" />
        </div>
        <h2 class="text-base font-semibold capitalize text-slate-900">{{ product.name }}</h2>
        <div class="mt-auto pt-4">
            <span class="text-2xl font-semibold tracking-tight tabular-nums">${{ product.price.toFixed(2) }}</span>
        </div>
    </article>
</template>