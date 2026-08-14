import { Plus } from 'lucide-vue-next'
import type { ComponentStory } from '../../types/story'

const story: ComponentStory = {
    title: 'Button',
    icon: Plus,
    component: () => import('./Button.vue'),
    variants: [
        {
            name: 'Default',
            slots: { default: 'Default Button' },
            props: { variant: 'default' },
        },
        {
            name: 'Alert Button',
            slots: { default: 'Alert Button' },
            props: { variant: 'alert' },
        },
        {
            name: 'Primary Button',
            slots: { default: 'Primary Button' },
            props: { variant: 'primary' },
        },
        {
            name: 'Secondary Button',
            slots: { default: 'Secondary Button' },
            props: { variant: 'secondary' },
        },
        {
            name: 'Success Button',
            slots: { default: 'Secondary Button' },
            props: { variant: 'success' },
        },
        {
            name: 'On Click Event',
            slots: { default: 'Click me' },
            props: { variant: 'danger', onClick: () => console.log("hello world"), fontSize: "md" },
        },
    ],
}

export default story
