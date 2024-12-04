

import React from 'react'
import { Link } from 'react-router-dom'

const SingleBlog = ({blogInfo, handleLike}) => {


  return (
    <div className='single-blog-wrapper'>
      <h1>{blogInfo.title}</h1>
      <Link to={blogInfo.url} className='blog-entry-url'>{blogInfo.url}</Link>
      <div className='blog-entry-likes'>likes: {blogInfo.likes}<button onClick={handleLike}>like</button></div>
      <div className='blog-entry-user'>user: {blogInfo.user.username}</div>
    </div>
  )
}

export default SingleBlog