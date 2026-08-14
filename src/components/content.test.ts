import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Book from './Book.vue'
import UserCard from './UserCard.vue'
import type { Book as BookType } from '../types/book'
import type { User } from '../types/user'

// Content-level tests: beyond "it mounts", assert that data-driven components put
// their props on screen the way a user would read them.

const sampleBook: BookType = {
  id: 1,
  title: 'Ways of Seeing',
  author: 'John Berger',
  rating: 4.09,
  ratingsCount: 58231,
  published: 1972,
  description: 'A short description.',
  coverColor: '#1f2937',
}

describe('Book', () => {
  it('renders the title, author, and publication year', () => {
    const wrapper = mount(Book, { props: { book: sampleBook } })
    const text = wrapper.text()
    expect(text).toContain('Ways of Seeing')
    expect(text).toContain('by John Berger')
    expect(text).toContain('Published 1972')
  })

  it('formats the ratings count with thousands separators', () => {
    const wrapper = mount(Book, { props: { book: sampleBook } })
    expect(wrapper.text()).toContain('58,231 ratings')
  })
})

const sampleUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'leanne@example.com',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '0', lng: '0' },
  },
  company: { name: 'Romaguera-Crona', catchPhrase: 'Neural-net', bs: 'e-markets' },
}

describe('UserCard', () => {
  it('renders the name, handle, and company', () => {
    const wrapper = mount(UserCard, { props: { user: sampleUser } })
    const text = wrapper.text()
    expect(text).toContain('Leanne Graham')
    expect(text).toContain('@Bret')
    expect(text).toContain('Romaguera-Crona')
  })

  it('derives two-letter initials from the name', () => {
    const wrapper = mount(UserCard, { props: { user: sampleUser } })
    expect(wrapper.text()).toContain('LG')
  })

  it('links the website with a safe external target', () => {
    const wrapper = mount(UserCard, { props: { user: sampleUser } })
    const link = wrapper.get(`a[href="https://hildegard.org"]`)
    expect(link.attributes('rel')).toContain('noopener')
  })
})
