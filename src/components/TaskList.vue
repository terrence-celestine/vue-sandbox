<script setup lang="ts">
import type { Task } from '../stores/tasks';

const props = defineProps<{tasks: Task[], query: string}>()

</script>

<template>
    <div>
      <div v-if="query.length > 0" class="mb-3 flex items-center gap-2 text-xs">
        <span class="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">Searching: "{{ query }}"</span>
        <span class="text-slate-400">{{ tasks.length }} match{{ tasks.length === 1 ? '' : 'es' }}</span>
      </div>
  
      <div v-if="tasks.length === 0" class="rounded-lg border border-dashed border-slate-200 py-10 text-center">
        <p class="text-sm text-slate-500">
          {{ query ? 'No tasks match your search.' : 'No tasks yet — add one above.' }}
        </p>
      </div>
  
      <ol v-else class="overflow-hidden rounded-lg border border-slate-200 divide-y divide-slate-100">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center gap-3 px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-50"
        >
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300"></span>
          <span class="truncate">{{ task.task_title }}</span>
        </li>
      </ol>
    </div>
  </template>