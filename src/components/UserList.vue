<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useUsers } from '../composables/useUsers';

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
    <h1>User List</h1>
    <div v-if="loading">Page is loading...</div>
    <div v-else-if="error">An error occured: {{ error }}</div>
    <div v-else-if="users.length === 0">No users found</div>
    <ul v-else-if="isVisible">
        <li v-for="user in users" :key="user.id" :class="{highlight: user.id % 2 === 0}">
            {{ user.name }}
        </li>
    </ul>
    <button @click="toggleList">
        toggle list
    </button>
</template>