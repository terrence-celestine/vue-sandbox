import { defineStore } from "pinia";
import { ref } from "vue";

export interface Task {
    id: string;
    task_title: string;
}

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);

    const addTask = (title: string) => {
        tasks.value.push({ id: crypto.randomUUID(), task_title: title })
    }

    return { tasks, addTask }
})