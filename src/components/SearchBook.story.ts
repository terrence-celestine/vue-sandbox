import { Search } from 'lucide-vue-next'
import type { ComponentStory } from '../types/story'

const story: ComponentStory = {
  title: 'Search Book',
  icon: Search,
  component: () => import('./SearchBook.vue'),
  variants: [
    { name: 'With value', props: { modelValue: 'Vermeer' } },
    { name: 'Empty', props: { modelValue: '' } },
  ],
}

export default story
