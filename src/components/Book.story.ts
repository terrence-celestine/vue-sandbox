import { Book as BookIcon } from 'lucide-vue-next'
import type { ComponentStory } from '../types/story'
import type { Book } from '../types/book'

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

const story: ComponentStory = {
  title: 'Book',
  icon: BookIcon,
  component: () => import('./Book.vue'),
  variants: [
    { name: 'Default', props: { book: sampleBook } },
    { name: 'Low rating', props: { book: { ...sampleBook, rating: 2.3, ratingsCount: 12 } } },
    {
      name: 'Long title',
      props: {
        book: {
          ...sampleBook,
          title: 'The Extraordinarily Long Title That Really Ought To Truncate Inside The Card',
        },
      },
    },
  ],
}

export default story
