<script setup lang="ts">
defineProps<{query: string}>()
</script>
<template>
      <div class="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p class="text-sm font-medium text-slate-600">No products match "{{ query }}"</p>
        <p class="mt-1 text-xs text-slate-400">Try a different search term.</p>
      </div>
</template>