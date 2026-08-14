import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import Badge from './Badge.vue'

// Focused tests on the design-system primitives: prop -> class mapping, slotted
// content, and emitted events. These are the shared building blocks the composed
// apps are made from, so their contract is worth pinning down explicitly.

describe('Button', () => {
  it('renders slotted label text', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Save changes' },
    })
    expect(wrapper.text()).toBe('Save changes')
  })

  it('renders a native button with type="button"', () => {
    const wrapper = mount(Button, { slots: { default: 'x' } })
    expect(wrapper.get('button').attributes('type')).toBe('button')
  })

  it.each([
    ['default', 'bg-field-bg'],
    ['primary', 'bg-violet-50'],
    ['secondary', 'bg-slate-50'],
    ['success', 'bg-emerald-50'],
    ['danger', 'bg-red-50'],
    ['warning', 'bg-amber-50'],
    ['alert', 'bg-blue-50'],
  ] as const)('applies the "%s" variant palette (%s)', (variant, expected) => {
    const wrapper = mount(Button, {
      props: { variant },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain(expected)
  })

  it.each([
    ['sm', 'text-sm'],
    ['md', 'text-base'],
    ['lg', 'text-lg'],
  ] as const)('maps fontSize "%s" to the "%s" class', (fontSize, expected) => {
    const wrapper = mount(Button, {
      props: { fontSize },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain(expected)
  })

  it('calls a click handler exactly once (guards against double-fire)', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      attrs: { onClick },
      slots: { default: 'x' },
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
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
