<script setup lang="ts">
interface BadgeProps {
    class: string
}
defineProps<BadgeProps>()
</script>
<template>
    <span class="rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide" :class="class">
        <slot />
    </span>
</template>