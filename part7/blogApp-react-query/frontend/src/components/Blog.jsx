import { useState } from "react"


const Blog = ({ blog, handleDelete, handleLike }) => {

  const [visible, setVisible] = useState(false)

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



  const extendedInfoStyle = visible ? null : {'display': 'none'} 

  const extendedInfo = (
      <div className='extended-blog-info' style={extendedInfoStyle}>
      <div className='blog-entry-url'>{blog.url}</div>
      <div className='blog-entry-likes'>likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
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