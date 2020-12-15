import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders limited content', () => {
  const blog = {
    author: 'johneagle',
    title: 'blog post to test aplication',
    url: 'localhost:3000',
    likes: 0
  }

  const addlike = () => {
    return
  }

  const deleteBlog = () => {
    return
  }

  const component = render(
    <Blog blog={blog} addlike={addlike} deleteBlog={deleteBlog} />
  )

  const authorElement = component.queryByText(
    'johneagle'
  )
  const titleElement = component.queryByText(
    'blog post to test aplication'
  )
  const urlElement = component.queryByText(
    'localhost:3000'
  )
  const likesElement = component.queryByText(
    'likes 0'
  )

  expect(authorElement).toBeDefined()
  expect(titleElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('renders full content', () => {
  const blog = {
    author: 'johneagle',
    title: 'blog post to test aplication',
    url: 'localhost:3000',
    likes: 0,
    user: { id: 1, name: 'admin' }
  }

  const addlike = () => {
    return
  }

  const deleteBlog = () => {
    return
  }

  const component = render(
    <Blog blog={blog} addlike={addlike} deleteBlog={deleteBlog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const authorElement = component.queryByText(
    'johneagle'
  )
  const titleElement = component.queryByText(
    'blog post to test aplication'
  )
  const urlElement = component.queryByText(
    'localhost:3000'
  )
  const likesElement = component.queryByText(
    'likes 0'
  )

  expect(authorElement).toBeDefined()
  expect(titleElement).toBeDefined()
  expect(urlElement).toHaveTextContent('localhost:3000')
  expect(likesElement).toHaveTextContent('likes 0')
})

test('pressing like button activates event handler', async () => {
  const blog = {
    author: 'johneagle',
    title: 'blog post to test aplication',
    url: 'localhost:3000',
    likes: 0,
    user: { id: 1, name: 'admin' }
  }

  const deleteBlog = () => {
    return
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addlike={mockHandler} deleteBlog={deleteBlog} />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})