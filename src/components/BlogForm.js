import React, { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    createBlog({ title, author, url, likes })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <form onSubmit={handleSubmit} id="blog-form">
      <div>
            title <input placeholder='title' id='title' value={title} onChange={ ({ target }) => setTitle(target.value)} />
      </div>
      <div>
            author <input placeholder='author' id="author" value={author} onChange={ ({ target }) => setAuthor(target.value)} />
      </div>
      <div>
            url <input type="url" value={url} placeholder='url' id="url" onChange={ ({ target }) => setUrl(target.value)} />
      </div>
      <div>
            likes <input type="number" id="likes" value={likes} placeholder='likes' onChange={({ target }) => setLikes(target.value)} />
      </div>
      <button type="submit" id='create'>create</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog : PropTypes.func.isRequired
}
export default BlogForm