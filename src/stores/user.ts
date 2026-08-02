// stores/user.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CurrentUser {
  name: string;
  email: string;
}

export const useUserStore = defineStore('currentUser', () => {
  // state — refs, exactly like a composable
  const user = ref<CurrentUser | null>({ name: "Jane Doe", email: "jane@doe.com" })

  const setUser = (next: CurrentUser) => {
    user.value = next;
  }

  const clear = () => {
    user.value = null
  }

  // expose everything — same as a composable's return
  return { user, clear, setUser }
})