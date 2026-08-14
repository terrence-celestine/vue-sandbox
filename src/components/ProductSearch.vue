<script setup lang="ts">
import type { TextInput } from "../types/input";

const props = defineProps<TextInput>()
const emit = defineEmits<{ 'update:modelValue': [value:string] }>()
</script>

<template>
    <div>
        <input
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :name="name"
            :value="modelValue"
            type="text"
            :placeholder="placeholder"
            :aria-label="ariaLabel"
            class="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
</div>
</template>
