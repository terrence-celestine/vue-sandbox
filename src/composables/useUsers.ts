import { ref } from "vue";
import type { User } from "../types/user";
import { mockUsers } from "../mocks/users";

export const useUsers = () => {
    const users = ref<User[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    let timer: ReturnType<typeof setTimeout> | null = null;

    const fetchUsers = async () => {
        loading.value = true;
        error.value = null;

        try {
            // Simulate a network request against our mock data so the demo
            // never depends on live connectivity.
            await new Promise<void>((resolve) => {
                timer = setTimeout(resolve, 300);
            });
            users.value = mockUsers;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Unknown error';
        } finally {
            loading.value = false;
        }
    }

    const cancel = () => {
        if (timer) clearTimeout(timer);
    }

    return { users, loading, error, fetchUsers, cancel }
}
