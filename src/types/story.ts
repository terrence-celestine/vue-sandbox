import type { Component } from 'vue'

// A component "story" lives next to its component as `Component.story.ts`.
// The registry auto-discovers every *.story.ts via import.meta.glob, so adding a
// component to the catalog means dropping a story file beside it — you never edit
// the registry.

/** One rendering of a component: a named set of props bound in the isolation frame. */
export interface Variant {
  name: string
  props?: Record<string, unknown>
}

export interface ComponentStory {
  /** Sidebar / heading title. */
  title: string
  /** Sidebar icon (a lucide-vue-next component). */
  icon: Component
  /** Lazy import of the component itself — keeps each component code-split. */
  component: () => Promise<Component>
  /** One or more variants to switch between. First is shown by default. */
  variants: Variant[]
  /** Optional URL slug. Derived from the filename (kebab-cased) when omitted. */
  slug?: string
}
