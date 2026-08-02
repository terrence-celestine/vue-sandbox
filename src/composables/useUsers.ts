import { ref } from "vue";

interface User {
    id: number;
    name: string;
}

export const useUsers = () => {
    const users = ref<User[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    let controller: AbortController | null = null;

    const fetchUsers = async () => {
        controller?.abort();
        controller = new AbortController();

        loading.value = true;
        error.value = null;

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            users.value = await res.json();
        } catch (e) {
            if ((e instanceof DOMException) && e.name === "AbortError") return;
            error.value = e instanceof Error ? e.message : 'Unknown error';
        } finally {
            loading.value = false;
        }
    }

    const cancel = () => {
        controller?.abort()
    }

    return { users, loading, error, fetchUsers, cancel }
}

