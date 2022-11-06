import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import noteService from './services/login'
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => { 
      setBlogs(blogs)
    })
  }, [])
  
  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON) 
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
        window.localStorage.setItem('loggedBlogappUser',
          JSON.stringify(user)
        )
        setUser(user)
        setMessage({
          class: 'success',
          content: 'Successfully logged in'
        })
        setTimeout(()=> setMessage(null), 3000)
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
      }
    }catch(exception){
      setMessage({
        class: 'error',
        content: 'wrong username or password'
      })
      setTimeout(()=> setMessage(null), 5000)
    } 
  }
 
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage({
      class: 'success',
      content: 'successfully logged out'
    })
    setTimeout(()=> setMessage(null), 5000)
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
    setTimeout(()=> setMessage(null), 5000)
  }

  if(user === null) {
    return (
      <div>
        <h2>login to view blogs</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
          Username <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
          Password <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  const blogsOfLoggedInUser = blogs
    .filter( blog => blog.user.username === user.username)
    .map( (b,index) => <Blog key={index} blog={b}/> )
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        <p>{user.name} logged in</p> 
        <button onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <Toggable buttonLabel='create new'>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Toggable>
      <br/>
      <div>
        <h3>My list of blogs</h3>
        { blogsOfLoggedInUser } 
      </div>
    </div>
  )
}


export default App;
