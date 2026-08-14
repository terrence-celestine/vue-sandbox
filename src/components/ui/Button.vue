<script setup lang="ts">
defineEmits<{click: []}>()
</script>
<template>
          <button
            @click="$emit('click')"
            class=" rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
          <slot />
          </button>
</template>