import { TextCursorInput } from 'lucide-vue-next'
import type { ComponentStory } from '../../types/story'
import type { TextInput } from '../../types/input'

const base: TextInput = {
  placeholder: 'Type something here',
  ariaLabel: 'Search field',
  name: 'text',
  modelValue: '',
}

const story: ComponentStory = {
  title: 'Input',
  icon: TextCursorInput,
  component: () => import('./Input.vue'),
  variants: [
    { name: 'Default', props: { text: base } },
    { name: 'With button', props: { text: { ...base, button: 'Click me' } } },
    { name: 'No placeholder', props: { text: { ...base, placeholder: undefined } } },
  ],
}

export default story
