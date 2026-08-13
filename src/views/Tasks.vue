<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from "vue";
import TaskList from "../components/TaskList.vue";
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
    <div class="min-h-screen bg-slate-50 px-4 py-10">
      <div class="mx-auto max-w-xl">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold tracking-tight text-slate-900">My Tasks</h1>
          <p class="mt-1 text-sm text-slate-500">
            {{ tasks.length }} {{ tasks.length === 1 ? 'task' : 'tasks' }} total
          </p>
        </header>
  
        <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <!-- Add row -->
          <div class="flex gap-2">
            <input
              v-model="newTask"
              ref="my-input"
              type="text"
              placeholder="Add a task"
              @keyup.enter="updateTodo"
              class="flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            <button
              @click="updateTodo"
              class="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 active:scale-[0.98]"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              Add
            </button>
          </div>
  
          <!-- Search row -->
          <div class="relative mt-3">
            <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input
              v-model="query"
              type="text"
              placeholder="Search tasks"
              aria-label="Search tasks"
              class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-16 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            <button
              v-if="query"
              @click="clearQuery"
              aria-label="Clear search"
              class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              Clear
            </button>
          </div>
  
          <!-- List -->
          <div class="mt-5">
            <TaskList :tasks="visibleTasks" :query="query" />
          </div>
        </div>
      </div>
    </div>
  </template>