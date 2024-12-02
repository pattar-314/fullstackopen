import { useRef } from 'react'
import Blog from './Blog'
import blogService, { queryClient } from './../services/blogService'
import BlogAddForm from './BlogAddForm'
import Toggleable from './Toggleable'
import { useMutation, useQuery } from '@tanstack/react-query'

const BlogMain = (props) => {

  const blogRef = useRef()


  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
  

  const deleteSuccess = () => {
    console.log(`blog deleted`)
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
  }

  const addBlogMutation = useMutation({ mutationFn: blogService.createBlog, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] })})

  const deleteBlogMutation = useMutation({mutationFn: blogService.deleteBlog, onSuccess: deleteSuccess})
  
  
  const blogLikeMutation = useMutation({
    mutationFn:  blogService.updateBlog,
    onSuccess: queryClient.invalidateQueries({queryKey: ['blogs']})
  })


  if(blogsQuery.isLoading){
    return <div>blogs loading...</div>
  } else if (blogsQuery.isSuccess){
    console.log('loaded: ', blogsQuery)
  } else if (blogsQuery.error){
    console.log('query error: ', blogsQuery.error)
  }
  


  const blogs = blogsQuery.isSuccess ? blogsQuery.data : []


  console.log('test 1b:', props.user)

  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    props.userDispatch({ type: 'CLEAR_USER' })
    location.reload()
  }

  const addBlog = async (title, author, url) => {
    try{
      console.log(`token: ${ window.localStorage.getItem('blogAppUser') }`)
      const config = { headers: { Authorization: `Bearer ${ JSON.parse(window.localStorage.getItem('blogAppUser')).token }` } }
      const newBlog = await addBlogMutation.mutate({ title, author, url }, config).catch(err => {
        props.handleNotification('notification-deny', 'there was an error creating blog')
        console.error(err)
      } )
      console.log(`new blog:`, newBlog)
      props.handleNotification('notification-confirm', `blog ${newBlog.title} added`)
    } catch(error) {
      props.handleNotification('notification-deny', 'there was an error creating blog')
      console.log('there was an error creating blog: ', error)
    }
    blogRef.current.toggleIsVisible()
  }

  
  


  const handleLike = async (blog) => {
    const requestObject = {
      title: blog.title,
      likes: blog.likes + 1
    }

    await blogLikeMutation.mutate(requestObject)
  }


  const handleDelete = async (id) => {
    try {  
    await deleteBlogMutation.mutate(id)
  } catch(err){
    console.log('an error occured with deletion mutate: ', err)
  }
}

  return (
    <div className='blog-list-wrapper'>
    <h2>blogs</h2>
    <div>{props.user.username} logged in</div><button onClick={logout}>logout</button>
    <Toggleable buttonLabel='new blog' ref={blogRef}><BlogAddForm addBlog={addBlog} /></Toggleable>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleDelete={(id) => handleDelete(id)} handleLike={handleLike} />
    )}
  

  </div>
  )
}

export default BlogMain