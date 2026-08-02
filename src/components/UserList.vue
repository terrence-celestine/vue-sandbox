<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useUsers } from '../composables/useUsers';
import UserCard from './UserCard.vue';

const {users, loading, error, fetchUsers, cancel} = useUsers();

const isVisible = ref<boolean>(true);
const toggleList = ():void => {
    isVisible.value = !isVisible.value
}

onMounted(fetchUsers);
onUnmounted(cancel)
</script>

<style scoped>
.highlight { background: yellow; }
</style>

<template>
    <div v-if="loading">Page is loading...</div>
    <div v-else-if="error">An error occured: {{ error }}</div>
    <div v-else-if="users.length === 0">No users found</div>
    <div v-else-if="isVisible" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard v-for="user in users" :key="user.id" :user="user"/>
    </div>
    <button @click="toggleList">
        toggle list
    </button>
</template>