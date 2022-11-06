import React, {useState} from 'react'
const Blog = ({blog, updateBlog}) => {
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
    const {title, author, url, likes} = blog
    updateBlog(id, {title, author, url, likes: likes+1})
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={hideWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => updateLikes(blog.id)}>like</button></p>
        <p><strong>{blog.author}</strong></p>
      </div>
    </div>
  )
}

export default Blog

