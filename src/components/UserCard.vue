<!-- UserCard.vue -->
<script setup lang="ts">
import { computed } from "vue";
import type { User } from "../types/user";

// Define the props this component expects to receive from the parent
const props = defineProps<{ user: User }>()

const initials = computed(() =>
  props.user.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
)

const websiteUrl = computed(() => `https://${props.user.website}`)
</script>

<template>
  <div class="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
        {{ initials }}
      </div>
      <div class="min-w-0">
        <h3 class="truncate font-semibold text-gray-900">{{ user.name }}</h3>
        <p class="truncate text-sm text-gray-500">@{{ user.username }}</p>
      </div>
    </div>

    <!-- Contact -->
    <div class="mt-4 space-y-2 text-sm text-gray-700">
      <div class="flex items-center gap-2">
        <span class="w-5 text-center" aria-hidden="true">✉️</span>
        <a :href="`mailto:${user.email}`" class="truncate text-indigo-600 hover:underline">{{ user.email }}</a>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-5 text-center" aria-hidden="true">📞</span>
        <span class="truncate">{{ user.phone }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-5 text-center" aria-hidden="true">🌐</span>
        <a
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="truncate text-indigo-600 hover:underline"
        >{{ user.website }}</a>
      </div>
    </div>

    <!-- Address -->
    <div class="mt-4 flex items-start gap-2 text-sm text-gray-600">
      <span class="w-5 text-center" aria-hidden="true">📍</span>
      <address class="not-italic leading-tight">
        <span class="block">{{ user.address.street }}, {{ user.address.suite }}</span>
        <span class="block">{{ user.address.city }} {{ user.address.zipcode }}</span>
      </address>
    </div>

    <!-- Company footer -->
    <div class="mt-auto border-t border-gray-100 pt-4">
      <p class="text-sm font-medium text-gray-900">{{ user.company.name }}</p>
      <p class="text-xs italic text-gray-500">"{{ user.company.catchPhrase }}"</p>
    </div>
  </div>
</template>
