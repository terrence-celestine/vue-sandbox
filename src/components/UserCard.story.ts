import { SquareUser } from 'lucide-vue-next'
import type { ComponentStory } from '../types/story'
import type { User } from '../types/user'

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
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
}

const story: ComponentStory = {
  title: 'User Card',
  icon: SquareUser,
  component: () => import('./UserCard.vue'),
  variants: [
    { name: 'Default', props: { user: sampleUser } },
    {
      name: 'Minimal',
      props: {
        user: {
          ...sampleUser,
          name: 'Ada Lovelace',
          username: 'ada',
          email: 'ada@example.com',
          website: 'ada.dev',
        },
      },
    },
  ],
}

export default story
