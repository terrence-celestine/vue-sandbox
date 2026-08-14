import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'
import type { TextInput } from '../../types/input'

// The Input renders a text field plus an optional action button (via the Button
// primitive). These tests pin down that the field and button reflect the `text`
// prop, and that the component stays reactive when the prop changes.

const base: TextInput = {
  name: 'q',
  ariaLabel: 'Search field',
  modelValue: '',
}

describe('Input', () => {
  it('reflects the field attributes from the text prop', () => {
    const wrapper = mount(Input, {
      props: { text: { ...base, placeholder: 'Search books' } },
    })
    const input = wrapper.get('input')
    expect(input.attributes('placeholder')).toBe('Search books')
    expect(input.attributes('name')).toBe('q')
    expect(input.attributes('aria-label')).toBe('Search field')
  })

  it('renders the action button using the provided label, styled by the primitive', () => {
    const wrapper = mount(Input, {
      props: { text: { ...base, button: 'Search' } },
    })
    const button = wrapper.get('button')
    // Label comes from the prop, not a hard-coded string.
    expect(button.text()).toBe('Search')
    // ...and it is the shared Button primitive (base styling), not a bare element.
    expect(button.classes()).toContain('rounded-md')
  })

  it('renders no button when no label is provided', () => {
    const wrapper = mount(Input, { props: { text: base } })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('stays reactive when the text prop changes', async () => {
    const wrapper = mount(Input, {
      props: { text: { ...base, placeholder: 'First', button: 'Go' } },
    })
    expect(wrapper.get('input').attributes('placeholder')).toBe('First')
    expect(wrapper.find('button').exists()).toBe(true)

    await wrapper.setProps({ text: { ...base, placeholder: 'Second' } })

    expect(wrapper.get('input').attributes('placeholder')).toBe('Second')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
