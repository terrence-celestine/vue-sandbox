<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useBooks } from '../composables/useBooks';
import Book from './Book.vue';

const props = defineProps<{ search: string }>()

const { books, loading, error, fetchBooks } = useBooks();
onMounted(fetchBooks);

const filteredBooks = computed(() => {
    const q = props.search.trim().toLowerCase()
    if (!q) return books.value
    return books.value.filter(b => b.title.toLowerCase().includes(q))
})

</script>

<template>
    <div v-if="loading">Page is loading...</div>
    <div v-else-if="error">An error occured: {{ error }}</div>
    <div v-else-if="books.length === 0">No books found</div>
    <template v-else>
        <h2 class="mb-4 text-2xl font-bold uppercase tracking-wide text-gray-900">Art Books</h2>
        <div class="flex flex-col gap-4">
            <Book v-for="book in filteredBooks" :key="book.id" :book="book" />
        </div>
    </template>
</template>
