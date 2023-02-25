import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Togglable'
import blogService from './services/blogs'
import noteService from './services/login'
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('1st useeffect')
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    console.log('2nd useeffect')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await noteService.login({
        username, password
      })
      if(user){
        // save to localStorage
        window.localStorage.setItem('loggedBlogAppUser',
          JSON.stringify(user)
        )
        setUser(user)
        setMessage({
          class: 'success',
          content: 'Successfully logged in'
        })
        setTimeout(() => setMessage(null), 3000)
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
      }
    }catch(exception){
      setMessage({
        class: 'error',
        content: 'wrong username or password'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setMessage({
      class: 'success',
      content: 'successfully logged out'
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const addBlog = async (blogObj) => {
    const createdBlog = await blogService.create(blogObj)
    const updatedBlogs = blogs.concat(createdBlog)
    setBlogs(updatedBlogs)
    const { title, author } = createdBlog
    setMessage({
      class: 'success',
      content: `a new blog ${title} by ${author} added`
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const updateBlog = async (id, blogObj) => {
    const updatedBlog = await blogService.update(id, blogObj)
    const otherBlogs = blogs.filter(b => b.id !== id)
    setBlogs([...otherBlogs, updatedBlog])
  }

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if(confirm){
      try{
        await blogService.deleteOne(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setMessage({
          class: 'success',
          content: `deleted ${blog.title}`
        })
        setTimeout(() => setMessage(null), 4000)
      }
      catch(exception){
        console.log(exception)
        setMessage({
          class: 'error',
          content: exception.response.data.error
        })
        setTimeout(() => setMessage(null), 4000)
      }
    }
  }
  if(user === null) {
    return (
      <div>
        <h2>login to view blogs</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
          Username <input type="text" id='username' value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
          Password <input type="password" id='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </div>
    )
  }
  const blogstoRender = blogs
    // .filter( blog => blog.user.username === user.username)
    .sort((a,b) => b.likes - a.likes)
    .map( (b,index) => {
      return <Blog key={index} user={user} blog={b} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
    })

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <Toggable buttonLabel='Blog Form'>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Toggable>
      <br/>
      <div>
        <h3>My list of blogs</h3>
        { blogstoRender }
      </div>
    </div>
  )
}

export default App
