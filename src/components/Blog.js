import React from 'react'

const Blog = ({blog}) => {
  return (
    <div>
      {blog.title} <strong>{blog.author}</strong> 
    </div>
  )
}

export default Blog