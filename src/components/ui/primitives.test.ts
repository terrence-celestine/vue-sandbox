import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import Badge from './Badge.vue'

// Focused tests on the design-system primitives: prop -> class mapping, slotted
// content, and emitted events. These are the shared building blocks the composed
// apps are made from, so their contract is worth pinning down explicitly.

describe('Button', () => {
  it('renders slotted label text', () => {
    const wrapper = mount(Button, {
      props: { type: 'Default', fontSize: 'md' },
      slots: { default: 'Save changes' },
    })
    expect(wrapper.text()).toBe('Save changes')
  })

  it('applies the violet palette for the Default type', () => {
    const wrapper = mount(Button, {
      props: { type: 'Default', fontSize: 'md' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('bg-violet-50')
    expect(wrapper.classes()).toContain('text-violet-700')
  })

  it('applies the blue palette for the Alert type', () => {
    const wrapper = mount(Button, {
      props: { type: 'Alert', fontSize: 'md' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('bg-blue-50')
    expect(wrapper.classes()).toContain('text-blue-700')
  })

  it.each([
    ['sm', 'text-sm'],
    ['md', 'text-base'],
    ['lg', 'text-lg'],
  ] as const)('maps fontSize "%s" to the "%s" class', (fontSize, expected) => {
    const wrapper = mount(Button, {
      props: { type: 'Default', fontSize },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain(expected)
  })

  it('emits a click event when pressed', async () => {
    const wrapper = mount(Button, {
      props: { type: 'Default', fontSize: 'md' },
      slots: { default: 'x' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

describe('Badge', () => {
  it('renders slotted content', () => {
    const wrapper = mount(Badge, {
      props: { class: 'bg-green-100 text-green-700' },
      slots: { default: 'In stock' },
    })
    expect(wrapper.text()).toBe('In stock')
  })

  it('merges the caller-provided class with its base styles', () => {
    const wrapper = mount(Badge, {
      props: { class: 'bg-green-100 text-green-700' },
      slots: { default: 'In stock' },
    })
    // Caller class is applied...
    expect(wrapper.classes()).toContain('bg-green-100')
    // ...alongside the primitive's own base styling.
    expect(wrapper.classes()).toContain('uppercase')
  })
})
