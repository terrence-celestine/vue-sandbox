import type { Component } from 'vue'
import {
  ArrowDownUp, ListChecks, BookOpen, Users, Calculator, Globe,
  Book as BookIcon, SquareUser, List, Search, Library, CircleUserRound,
} from 'lucide-vue-next'
import type { Book } from './types/book'
import type { User } from './types/user'
import type { Task } from './types/task'

// The registry is the single source of truth for navigation. The sidebar reads
// these arrays to build its links, and the /apps/:slug and /component/:slug hosts
// resolve the `slug` param back to a component here. Add a demo by adding one entry.

export interface AppEntry {
  slug: string
  title: string
  icon: Component
  component: () => Promise<Component>
}

export interface ComponentEntry {
  slug: string
  title: string
  icon: Component
  component: () => Promise<Component>
  // Props bound to the component in its isolation frame. Some components read
  // Pinia stores / composables instead of props (noted per entry) and render
  // whatever that live data holds.
  props?: Record<string, unknown>
}

// ---- Full app demos: composed, stateful, the real thing running ----
export const apps: AppEntry[] = [
  { slug: 'product-sort', title: 'Product Sort', icon: ArrowDownUp, component: () => import('./views/ProductSort.vue') },
  { slug: 'tasks', title: 'Tasks', icon: ListChecks, component: () => import('./views/Tasks.vue') },
  { slug: 'books', title: 'Books', icon: BookOpen, component: () => import('./views/Dashboard.vue') },
  { slug: 'users', title: 'Users', icon: Users, component: () => import('./views/UserList.vue') },
  { slug: 'counter', title: 'Counter', icon: Calculator, component: () => import('./views/Counter.vue') },
  { slug: 'hello', title: 'Hello World', icon: Globe, component: () => import('./views/HelloWorld.vue') },
]

// ---- Sample data for the isolated component renders ----
const sampleBook: Book = {
  id: 1,
  title: 'Ways of Seeing',
  author: 'John Berger',
  rating: 4.09,
  ratingsCount: 58231,
  published: 1972,
  description:
    "John Berger's Ways of Seeing changed the way people look at art and images, exploring how we see paintings and the assumptions we bring to them.",
  coverColor: '#1f2937',
}

const sampleUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'bret',
  email: 'leanne@example.com',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  phone: '1-770-736-8031',
  website: 'leanne.dev',
  company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' },
}

const sampleTasks: Task[] = [
  { id: 't1', task_title: 'Wire up the component registry' },
  { id: 't2', task_title: 'Build the isolation frame' },
  { id: 't3', task_title: 'Verify each demo route' },
]

// ---- Reusable components: rendered alone with sample props ----
export const components: ComponentEntry[] = [
  { slug: 'book', title: 'Book', icon: BookIcon, component: () => import('./components/Book.vue'), props: { book: sampleBook } },
  { slug: 'user-card', title: 'User Card', icon: SquareUser, component: () => import('./components/UserCard.vue'), props: { user: sampleUser } },
  { slug: 'task-list', title: 'Task List', icon: List, component: () => import('./components/TaskList.vue'), props: { tasks: sampleTasks, query: '' } },
  { slug: 'search-book', title: 'Search Book', icon: Search, component: () => import('./components/SearchBook.vue'), props: { modelValue: 'Vermeer' } },
  // Reads useBooks() and fetches its own mock data — the `search` prop filters that live list.
  { slug: 'book-list', title: 'Book List', icon: Library, component: () => import('./components/BookList.vue'), props: { search: '' } },
  // Reads the currentUser Pinia store — renders whatever that store holds.
  { slug: 'user-info', title: 'User Info', icon: CircleUserRound, component: () => import('./components/UserInfo.vue') },
]

export const findApp = (slug: string): AppEntry | undefined => apps.find((a) => a.slug === slug)
export const findComponent = (slug: string): ComponentEntry | undefined =>
  components.find((c) => c.slug === slug)
