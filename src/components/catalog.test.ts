import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import type { Component } from 'vue'
import { components } from '../registry'

// The registry auto-discovers every `*.story.ts`, so this suite covers the whole
// component catalog: for each registered component we mount every variant exactly
// the way the isolation host does (variant props + slots) and assert it renders.
// Adding a new component with a story extends this coverage automatically.

/** Stories load their component lazily; resolve the module to its default export. */
async function resolveComponent(loader: () => Promise<Component>): Promise<Component> {
  const mod = (await loader()) as Component | { default: Component }
  return mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod
}

function mountVariant(component: Component, props?: Record<string, unknown>, slots?: Record<string, string>) {
  return mount(component, {
    props,
    slots,
    // A fresh Pinia per mount covers store-backed components (e.g. UserInfo).
    global: { plugins: [createPinia()] },
  })
}

it('discovers a non-empty component catalog', () => {
  expect(components.length).toBeGreaterThan(0)
})

describe.each(components.map((c) => [c.title, c] as const))('%s', (_title, entry) => {
  it('has a slug, a component loader, and at least one variant', () => {
    expect(entry.slug).toBeTruthy()
    expect(entry.component).toBeTypeOf('function')
    expect(entry.variants.length).toBeGreaterThan(0)
  })

  describe.each(entry.variants.map((v) => [v.name, v] as const))('variant "%s"', (_name, variant) => {
    it('mounts and renders non-empty markup', async () => {
      const component = await resolveComponent(entry.component)
      const wrapper = mountVariant(component, variant.props, variant.slots)

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.html().length).toBeGreaterThan(0)
    })

    it('renders any slot content the variant declares', async () => {
      const slots = variant.slots
      if (!slots || Object.keys(slots).length === 0) return

      const component = await resolveComponent(entry.component)
      const wrapper = mountVariant(component, variant.props, slots)

      for (const text of Object.values(slots)) {
        expect(wrapper.text()).toContain(text)
      }
    })
  })
})
