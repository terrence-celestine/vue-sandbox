<script setup lang="ts" generic="T extends SortKey">
import type { SortKey } from '../../types/product';
import type { SelectOption } from '../../types/select';

const props = defineProps<{options: SelectOption<T>[]; modelValue: T; label?: string}>();
defineEmits<{'update:modelValue':[value: T]}>()
</script>

<template>
    <select 
        aria-label="Sort products"
        class="rounded-lg border border-slate-300 bg-white py-2.5 px-3.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-48"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value as T)">
        <option v-for="option in props.options" :key="option.value" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>