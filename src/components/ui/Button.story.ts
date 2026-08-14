import { Plus } from 'lucide-vue-next'
import type { ComponentStory } from '../../types/story'

const story: ComponentStory = {
    title: 'Button',
    icon: Plus,
    component: () => import('./Button.vue'),
    variants: [
        {
            name: 'Default',
            slots: { default: 'Click me' },
            props: { type: 'Default' },
        },
        {
            name: 'Alert',
            slots: { default: 'Click me' },
            props: { type: 'Alert', onClick: () => alert('hello'), fontSize: "md" },
        },
    ],
}

export default story
