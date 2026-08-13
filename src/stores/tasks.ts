import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task } from "../types/task";

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);

    const addTask = (title: string) => {
        tasks.value.push({ id: crypto.randomUUID(), task_title: title })
    }

    return { tasks, addTask }
})