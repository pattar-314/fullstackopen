import React, { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogService'
import BlogAddForm from './BlogAddForm'
import Toggleable from './Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, newBlog, setBlogs } from '../reducers/blogReducer'
import { clearUser } from '../reducers/userReducer'

const BlogMain = (props) => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const setup = async () => {
    console.log('attempting setup')
    const initBlogs = await blogService.getAll()
    console.log('test 1: ', initBlogs)
    dispatch(setBlogs(initBlogs))
  }

  const blogRef = useRef()

  
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

 
  useEffect(() => {
      setup()
  }, [])


  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    dispatch(clearUser())
    location.reload()
  }

  const addBlog = async (title, author, url) => {
    try{
      const config = {headers: {Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('blogAppUser')).token}`}}
      const blogResponse = await blogService.createBlog({blogInfo: { title, author, url }, auth: config}).catch(err => {
        props.handleNotification('notification-deny', 'there was an error creating blog')
        console.error(err)
        
      } )
      console.log(`new blog:`, blogResponse)
      dispatch(newBlog(blogResponse))
      props.handleNotification('notification-confirm', `blog ${blogResponse.title} added`)
    } catch(error) {
      props.handleNotification('notification-deny', 'there was an error creating blog')
      console.log('there was an error creating blog: ', error)
    }
  }



  const handleDelete = async (id) => {
    try {
    const deletedBlog = await blogService.deleteBlog(id)
    console.log('blog deleted: ', deletedBlog)
    dispatch(deleteBlog(id))
    } catch(err){
      props.handleNotification('notification-deny', 'error deleting blog 2')
    }
  }

  return (
    <div className='blog-list-wrapper'>
    <h2>blogs</h2>
    <div>{props.user.username} logged in</div><button onClick={logout}>logout</button>
    <Toggleable buttonLabel='new blog' ref={blogRef}><BlogAddForm addBlog={addBlog} /></Toggleable>
      {sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleDelete={(id) => handleDelete(id)} />
    )}
  

  </div>
  )
}

export default BlogMain