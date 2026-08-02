<script setup lang="ts">
defineProps<{modelValue: string}>()
const emit = defineEmits<{ 'update:modelValue': [value:string] }>()
</script>

<template>
    <div class="relative w-full max-w-sm">
        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400" aria-hidden="true">
            🔍
        </span>
        <input
            type="text"
            :value="modelValue"
            placeholder="Search by book title"
            class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>
