<script setup lang="ts">
import { computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from "../stores/user";

const store = useUserStore();
const {user} = storeToRefs(store);

const initials = computed(() =>
    user.value
        ? user.value.name
              .split(' ')
              .map((part) => part[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : ''
);
</script>

<template>
    <div v-if="user" class="flex flex-col items-center gap-3 text-center">
        <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700">
            {{ initials }}
        </div>
        <div class="min-w-0">
            <p class="truncate font-semibold text-gray-900">{{ user.name }}</p>
            <p class="truncate text-sm text-gray-500">{{ user.email }}</p>
        </div>
    </div>
</template>
