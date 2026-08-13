import { Library } from 'lucide-vue-next'
import type { ComponentStory } from '../types/story'

// BookList reads useBooks() and fetches its own mock data — the `search` prop
// filters that live list rather than supplying it.
const story: ComponentStory = {
  title: 'Book List',
  icon: Library,
  component: () => import('./BookList.vue'),
  variants: [
    { name: 'All', props: { search: '' } },
    { name: 'Filtered', props: { search: 'a' } },
  ],
}

export default story
