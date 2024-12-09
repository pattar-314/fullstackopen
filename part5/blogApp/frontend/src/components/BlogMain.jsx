import React, { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'
import BlogAddForm from './BlogAddForm'
import Toggleable from './Toggleable'

const BlogMain = (props) => {
  const [blogs, setBlogs] = useState([])

  const blogRef = useRef()
  
/*   const sortBlogs = () => {
    const 
    console.log('sorted blogs: ', sortedBlogs)
    setBlogs(sortedBlogs)
    return sortedBlogs
  }
 */
  useEffect(() => {
    blogService.getAll().then(blogs =>{
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })  
  }, [])


  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    location.reload()
  }

  const addBlog = async (title, author, url) => {
    try{
      console.log(`token: ${window.localStorage.getItem('blogAppUser')}`)
      const config = {headers: {Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('blogAppUser')).token}`}}
      const newBlog = await blogService.createBlog({ title, author, url }, config).catch(err => {
        handleNotification('notification-deny', 'there was an error creating blog')
        console.error(err)
        
      } )
      console.log(`new blog:`, newBlog)
      setBlogs(blogs.concat(newBlog))
      props.handleNotification('notification-confirm', `blog ${newBlog.title} added`)
    } catch(error) {
      props.handleNotification('notification-deny', 'there was an error creating blog')
      console.log('there was an error creating blog: ', error)
    }
    blogRef.current.toggleIsVisible()
  }



  const handleDelete = async (id) => {
    try {
    const deletedBlog = await blogService.deleteBlog(id)
    console.log('blog deleted: ', deletedBlog)
    setBlogs(blogs.filter(b => b.id !== id))
    } catch(err){
      props.handleNotification('notification-deny', 'error deleting blog 2')
    }
  }

  return (
    <div className='blog-list-wrapper'>
    <h2>blogs</h2>
    <div>{props.user.username} logged in</div><button onClick={logout}>logout</button>
    <Toggleable buttonLabel='new blog' ref={blogRef}><BlogAddForm addBlog={addBlog} /></Toggleable>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleDelete={(id) => handleDelete(id)} />
    )}
  

  </div>
  )
}

export default BlogMain