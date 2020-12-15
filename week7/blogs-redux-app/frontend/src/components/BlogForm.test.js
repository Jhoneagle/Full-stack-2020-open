import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Bot' }
  })

  fireEvent.change(title, {
    target: { value: 'This blog site is not accessable' }
  })

  fireEvent.change(url, {
    target: { value: 'www.saavutettavuus.fi' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author)
    .toBe('Bot' )
  expect(createBlog.mock.calls[0][0].title)
    .toBe('This blog site is not accessable' )
  expect(createBlog.mock.calls[0][0].url)
    .toBe('www.saavutettavuus.fi' )
})