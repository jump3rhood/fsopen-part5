import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  
  const handleSubmit = (evt) => {
    evt.preventDefault()
    createBlog({title, author, url, likes})
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <form onSubmit={handleSubmit}>
          <div>
            title <input type="text" name="Title" value={title} onChange={ ({target}) => setTitle(target.value)} />
          </div>
          <div>
            author <input type="text" name="Author" value={author} onChange={ ({target}) => setAuthor(target.value)} />
          </div>
          <div>
            url <input type="url" name="Url" value={url} onChange={ ({target}) => setUrl(target.value)} />
          </div>
          <div> 
            likes <input type="number" name="Likes" value={likes} onChange={({target}) => setLikes(target.value)} />
          </div>
          <button type="submit">create</button>
      </form>
  )
}

export default BlogForm