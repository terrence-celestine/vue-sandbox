<script setup lang="ts">
import type { Task } from '../stores/tasks';

const props = defineProps<{tasks: Task[], query: string}>()

</script>

<template>
    <p v-if="query.length > 0">Searching for: {{ query }}</p>
    <p v-else-if="tasks.length === 0">No tasks found. Add a task below.</p>
    <ol v-else="tasks.length > 0">
        <li v-for="task in props.tasks" :key="task.id">{{ task.task_title }}</li>
    </ol>
</template>