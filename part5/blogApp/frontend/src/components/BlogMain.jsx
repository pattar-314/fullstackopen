import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'

const BlogMain = (props) => {
  const [blogs, setBlogs] = useState([])
  const [blogTitleInput, setBlogTitleInput] = useState('')
  const [blogAuthorInput, setBlogAuthorInput] = useState('')
  const [blogUrlInput, setBlogUrlInput] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    location.reload()
  }



  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    try{
      console.log(`token: ${window.localStorage.getItem('blogAppUser')}`)
      const config = {headers: {Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('blogAppUser')).token}`}}
      const newBlog = await blogService.createBlog({ title: blogTitleInput, author: blogAuthorInput, url: blogUrlInput }, config).catch(err => {
        handleNotification('notification-deny', 'there was an error creating blog')
        console.error(err)
        
      } )
      console.log(`new blog:`, newBlog)
      setBlogs(blogs.concat(newBlog))
      props.handleNotification('notification-confirm', `blog ${newBlog.title} added`)
      setBlogAuthorInput('')
      setBlogTitleInput('')
      setBlogUrlInput('')
    } catch(error) {
      props.handleNotification('notification-deny', 'there was an error creating blog')
      console.log('there was an error creating blog: ', error)
    }
  }




  return (
    <div className='blog-list-wrapper'>
    <h2>blogs</h2>
    <div>{props.user.username} logged in</div><button onClick={logout}>logout</button>
    <form className='blog-add-form' onSubmit={(e) => handleBlogSubmit(e)}>
      <input className='blog-title-input' onChange={(e) => setBlogTitleInput(e.target.value)} value={blogTitleInput} placeholder='title' />
      <input className='blog-author-input' onChange={(e) => setBlogAuthorInput(e.target.value)} value={blogAuthorInput} placeholder='author' />
      <input className='blog-url-input' onChange={(e) => setBlogUrlInput(e.target.value)} value={blogUrlInput} placeholder='url' />
      <button type='submit'>submit</button>
    </form>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  

  </div>
  )
}

export default BlogMain