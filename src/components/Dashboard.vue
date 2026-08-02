<!-- Dashboard.vue — container that wraps UserInfo, SearchBook, and BookList -->
<script setup lang="ts">
import { provide, ref } from 'vue';
import { currentUserKey, type CurrentUser } from '../composables/currentUser';
import BookList from './BookList.vue';
import SearchBook from './SearchBook.vue';
import UserInfo from './UserInfo.vue';

// Provide the current user so descendants (UserInfo) can inject it
const currentUser: CurrentUser = {
    name: 'Terrence Celestine',
    email: 'terrencebutler89@gmail.com',
};
provide(currentUserKey, currentUser);

// Shared search state lifted up so SearchBook can filter BookList
const search = ref('');
</script>

<template>
    <div class="flex flex-col gap-6 md:flex-row">
        <!-- Sidebar -->
        <aside class="w-full shrink-0 md:w-64">
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:sticky md:top-6">
                <UserInfo />
            </div>
        </aside>

        <!-- Main content -->
        <main class="min-w-0 flex-1 space-y-6">
            <SearchBook v-model="search" />
            <BookList :search="search" />
        </main>
    </div>
</template>
