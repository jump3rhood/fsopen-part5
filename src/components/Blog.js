import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? 'none' : '' }
  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikes = (id) => {
    const { title, author, url, likes } = blog
    updateBlog(id, { title, author, url, likes: likes+1 })
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenVisible}>
        <p className='title'>{blog.title}</p>
        <p className='author'>{blog.author}</p>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={hideWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p className='url'>{blog.url}</p>
        <p className='likes'>{blog.likes} <button onClick={() => updateLikes(blog.id)}>like</button></p>
        <p>{blog.author}</p>
        {/* { blog.user.username === user.username ?
          <button onClick={() => deleteBlog(blog)}>remove</button> : ''
        } */}
      </div>
    </div>
  )
}

export default Blog

