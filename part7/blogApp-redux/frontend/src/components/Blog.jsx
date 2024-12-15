import { useState } from "react"
import {updateBlog} from '../services/blogService.js'
import { useDispatch } from "react-redux"
import { updateLike } from "../reducers/blogReducer.js"
import { Link } from "react-router"


const Blog = ({ blog, handleDelete }) => {

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

/*   const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const requestObject = {
      title: blog.title,
      likes: blog.likes + 1

    const likedBlog = await updateBlog(requestObject)
    console.log('server updated likes: ', likedBlog)
    dispatch(updateLike(likedBlog.id))
  }
    } */



 
  return (
  <div className='blog-entry-wrapper' style={blogStyle}>
    <div className='blog-entry-primary-information'>
      <div className='blog-entry-title'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> </div>
      <div className='blog-entry-author'>{blog.author}</div>
    </div>
    {visible ? extendedInfo : null}
  </div>  
 )
}

export default Blog