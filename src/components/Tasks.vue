<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from "vue";
import TaskList from "./TaskList.vue";
import { useTaskStore } from "../stores/tasks.ts";
import { storeToRefs } from 'pinia';
const newTask = ref('');
const query = ref('');

const store = useTaskStore();
const {addTask} = store
const {tasks} = storeToRefs(store);

const updateTodo = () => {
    if (newTask.value.length > 0){
        addTask(newTask.value)
        newTask.value = ""
    }
}

const clearQuery = () => {
    if (query.value.length){   
        query.value = ""
    }
}
const inputElement = useTemplateRef('my-input');

onMounted(() => {
    inputElement.value?.focus();
})

const visibleTasks = computed(() =>  {
    const q = query.value.trim().toLowerCase();
    if (!q) return tasks.value
    return tasks.value.filter((task) => task.task_title.trim().toLowerCase().includes(q))
})
</script>

<template>
    <h1>My Tasks</h1>
    <TaskList :tasks="visibleTasks" :query="query"/>
    <div>
        <input type="text" placeholder="Add a task" v-model="newTask" ref="my-input" @keyup.enter="updateTodo"/><button @click="updateTodo">Add</button>
    </div>
    <p>Search: <input type="text" placeholder="search" v-model="query" /><button @click="clearQuery">CLEAR</button></p>
</template>