<script setup lang="ts">
import { computed } from "vue";
import type { TextInput } from "../../types/input";

const props = defineProps<{text: TextInput}>()

const placeholderText = computed(() => props.text.placeholder)
const name = computed(() => props.text.name);
const hasButton = computed(() => props.text.button)
</script>

<template>
    <div>
    <input
        :name="name"
        type="text"
        class="w-full max-w-sm rounded-field border bg-field-bg px-4 py-2 text-sm text-field-text
               border-field-border placeholder-field-placeholder shadow-sm transition
               focus:border-field-border-focus focus:outline-none focus:ring-2 focus:ring-field-ring"
        :placeholder="placeholderText"
        :aria-label="props.text.ariaLabel"
    />
    <button v-if="hasButton">
        Click me
    </button>
</div>
</template>
