import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> renders correctly', () => {
  const blog = {
    title: 'Dummy Blog',
    author: 'Mr. Dummy',
    url: 'https://url.com/',
    likes: 55
  }
  const { container } = render(<Blog blog={blog}/>)

  const titleElement = container.querySelector('.title')
  const authorElement = container.querySelector('.author')

  const urlElement = container.querySelector('.url')
  const likesElement = container.querySelector('.likes')

  expect(titleElement).toBeDefined()
  expect(titleElement).toHaveTextContent('Dummy Blog')
  expect(authorElement).toBeDefined()
  expect(authorElement).toHaveTextContent('Mr. Dummy')
  
  expect(urlElement.parentNode).toHaveStyle('display: none')
  expect(likesElement.parentNode).toHaveStyle('display: none')
})
