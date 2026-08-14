<script setup lang="ts">
import type { TextInput } from "../../types/input";
import Button from "./Button.vue";

defineProps<{ text: TextInput }>()
</script>

<template>
    <div class="flex items-center gap-2">
        <input :name="text.name" type="text" class="w-full max-w-sm rounded-field border bg-field-bg px-4 py-2 text-sm text-field-text
               border-field-border placeholder-field-placeholder shadow-sm transition
               focus:border-field-border-focus focus:outline-none focus:ring-2 focus:ring-field-ring"
            :placeholder="text.placeholder" :aria-label="text.ariaLabel" />
        <Button v-if="text.button">
            {{ text.button }}
        </Button>
    </div>
</template>
