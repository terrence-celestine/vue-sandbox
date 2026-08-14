<script setup lang="ts">
type ButtonType = 'Alert' | 'Default'
type FontSize = "sm" | "md" | "lg"

defineEmits<{ click: [] }>()
const { fontSize = 'md', type = 'Default' } = defineProps<{ type?: ButtonType, fontSize?: FontSize }>()

const buttonStyles: Record<ButtonType, string> = {
  Alert: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-300',
  Default: 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-300',
}

const fontStyles: Record<FontSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
}
</script>

<template>
  <button @click="$emit('click')" class="rounded-md px-2.5 py-1 font-medium transition cursor-pointer"
    :class="buttonStyles[type], fontStyles[fontSize]">
    <slot />
  </button>
</template>