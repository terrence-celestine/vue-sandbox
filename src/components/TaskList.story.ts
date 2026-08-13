import { List } from 'lucide-vue-next'
import type { ComponentStory } from '../types/story'
import type { Task } from '../types/task'

const sampleTasks: Task[] = [
  { id: 't1', task_title: 'Wire up the component registry' },
  { id: 't2', task_title: 'Build the isolation frame' },
  { id: 't3', task_title: 'Verify each demo route' },
]

const story: ComponentStory = {
  title: 'Task List',
  icon: List,
  component: () => import('./TaskList.vue'),
  variants: [
    { name: 'Default', props: { tasks: sampleTasks, query: '' } },
    { name: 'Filtered', props: { tasks: sampleTasks, query: 'verify' } },
    { name: 'Empty', props: { tasks: [], query: '' } },
  ],
}

export default story
