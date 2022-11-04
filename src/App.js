import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import noteService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => { 
      console.log(blogs);
      setBlogs(blogs)
    })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    try{
      const user = await noteService.login({
        username, password
      })
      if(user){
        console.log(user)
        setUser(user)
        setUsername('')
        setPassword('')
      }
    }catch(exception){
      console.log('wrong credentials')
    } 
  }
 
  if(user === null) {
    return (
      <div>
        <h2>login to view blogs</h2>
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

      <p>{user.name} logged in</p>
      { blogsOfLoggedInUser }
      
    </div>
  )
}


export default App;
