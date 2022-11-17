import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls the event handler with the right details when submitted', async () => {
  const createBlog = jest.fn()
  render(<BlogForm createBlog={createBlog} />).container

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const likes = screen.getByPlaceholderText('likes')

  const submit = screen.getByRole('button')

  await userEvent.type(title, 'The Lazy Fox')
  await userEvent.type(author, 'Mr. Nobody')
  await userEvent.type(url, 'https://google.com/ncr')
  await userEvent.type(likes, '78')

  await userEvent.click(submit)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('The Lazy Fox')
  expect(createBlog.mock.calls[0][0].author).toBe('Mr. Nobody')
  expect(createBlog.mock.calls[0][0].url).toBe('https://google.com/ncr')
  expect(createBlog.mock.calls[0][0].likes).toBe('78')
})