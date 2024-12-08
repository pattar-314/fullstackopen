import { useState } from "react"
import {updateBlog} from './../services/blogs.js'


const Blog = ({ blog, handleDelete }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const requestObject = {
      title: blog.title,
      likes: likes + 1
    }

    const likedBlog = await updateBlog(requestObject)
    setLikes(likedBlog.likes)

  }

  const extendedInfoStyle = visible ? null : {'display': 'none'} 

  const extendedInfo = (
        <div className='extended-blog-info' style={extendedInfoStyle}>
      <div className='blog-entry-url'>{blog.url}</div>
      <div className='blog-entry-likes'>likes: {likes}<button onClick={handleLike}>like</button></div>
      <div className='blog-entry-user'>user: {blog.user.username}</div>
      <button onClick={() => ( confirm(`Remove blog ${blog.title} by ${blog.author}`) ? handleDelete(blog.id) : null )}>remove</button>
    </div>
 
  )
 
  return (
  <div className='blog-entry-wrapper' style={blogStyle}>
    <div className='blog-entry-primary-information'>
      <div className='blog-entry-title'>{blog.title}</div>
      <div className='blog-entry-author'>{blog.author}</div>
      <button onClick={toggleVisible}>{visible ? <>close</> : <>show</>}</button>
    </div>
    {visible ? extendedInfo : null}
  </div>  
 )
}

export default Blog