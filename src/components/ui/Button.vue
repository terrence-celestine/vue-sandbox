<script setup lang="ts">
type ButtonVariant =
  | 'primary'    // main brand action (your current "Default" violet)
  | 'secondary'  // neutral / low-emphasis
  | 'success'    // confirm, save, positive
  | 'danger'     // destructive: delete, remove (your "danger")
  | 'warning'    // caution, needs attention
  | 'alert'      // informational accent (your current "Alert" blue)
  | 'default'
type FontSize = "sm" | "md" | "lg"

const { fontSize = 'md', variant = 'default' } = defineProps<{ variant?: ButtonVariant, fontSize?: FontSize }>()

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ' +
  'disabled:opacity-50 disabled:pointer-events-none'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border border-violet-300  bg-violet-50  text-violet-700  hover:bg-violet-100  focus-visible:ring-violet-400',
  secondary: 'border border-slate-300   bg-slate-50   text-slate-700   hover:bg-slate-100   focus-visible:ring-slate-400',
  success: 'border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus-visible:ring-emerald-400',
  danger: 'border border-red-300     bg-red-50     text-red-700     hover:bg-red-100     focus-visible:ring-red-400',
  warning: 'border border-amber-300   bg-amber-50   text-amber-800   hover:bg-amber-100   focus-visible:ring-amber-500',
  alert: 'border border-blue-300    bg-blue-50    text-blue-700    hover:bg-blue-100    focus-visible:ring-blue-400',
  default: 'border border-field-border bg-field-bg text-field-text hover:bg-gray-50 focus-visible:ring-field-ring'
}

const fontStyles: Record<FontSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
}
</script>

<template>
  <button type="button" :class="[base, variantClasses[variant], fontStyles[fontSize]]">
    <slot />
  </button>
</template>