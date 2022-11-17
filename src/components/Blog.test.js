import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> ', () => {
  let container
  const likesUpdateMocker = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'Dummy Blog',
      author: 'Mr. Dummy',
      url: 'https://url.com/',
      likes: 55
    }
    container = render(<Blog blog={blog} updateBlog={likesUpdateMocker}/>).container
  })
  test('renders correctly', () => {

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

  test('shows url and likes when show button is clicked', async () => {
    const showButton = screen.getByText('view')
    const likesBefore = screen.getByText(55)

    expect(likesBefore.parentNode).toHaveStyle('display:none')

    const user = userEvent.setup()
    await user.click(showButton)
    const url = screen.getByText('https://url.com', { exact: false })
    const likesAfter = screen.getByText(55)
    expect(url).toHaveTextContent('https://url.com')
    expect(likesAfter).toBeDefined()
    expect(likesAfter).toHaveTextContent(55)
    expect(url.parentNode).not.toHaveStyle('display:none')
  })

  test('likes button works as expected', async () => {
    const user = userEvent.setup()
    const show = screen.getByText('view')
    await user.click(show)

    const likeButton = screen.getByText('like')
    expect(likeButton).toBeDefined()

    await user.click(likeButton)
    await user.click(likeButton)

    expect(likesUpdateMocker.mock.calls).toHaveLength(2)
  })
})
