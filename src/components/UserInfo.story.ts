import { CircleUserRound } from 'lucide-vue-next'
import type { ComponentStory } from '../types/story'

// UserInfo reads the currentUser Pinia store — it renders whatever that store
// holds, so it takes no props.
const story: ComponentStory = {
  title: 'User Info',
  icon: CircleUserRound,
  component: () => import('./UserInfo.vue'),
  variants: [{ name: 'Default' }],
}

export default story
