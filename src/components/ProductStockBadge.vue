<script setup lang="ts">
interface ProductStockBadge {
    inStock: boolean;
}

defineProps<ProductStockBadge>()
</script>
<template>
    <span class="rounded-full px-2 py-0.5 text-[11px] font-medium"
        :class="inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'">
        {{ inStock ? 'In stock' : 'Out of stock' }}
    </span>
</template>