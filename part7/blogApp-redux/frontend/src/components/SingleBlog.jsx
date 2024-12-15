import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogService'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setAllBlogs } from '../reducers/blogReducer';

const BlogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentDiv = styled.ul`
  margin: 1em;
`


const SingleBlog = ({ blogInfo }) => {

  const dispatch = useDispatch()
  const allBlogs = useSelector(state => state.blogs)

  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!visibility)

  const addVisible = visibility ? 'block' : 'none'

  const handleLike = async () => {
    const requestObject = {
      title: blogInfo.title,
      likes: blogInfo.likes + 1,
    };

    const likedBlog = await updateBlog(requestObject);
    console.log('server updated likes: ', likedBlog);
    dispatch(updateLike(likedBlog.id));
  };

  console.log('blogInfo: ', blogInfo);

  const NewCommentForm = () => {

    const [commentInput, setCommentInput] = useState('')

    const handleNewComment = async (e) => {
      e.preventDefault()
      const updatedBlog = {comments: blogInfo.comments.concat(commentInput)}
      console.log('updatedBlog: ', updatedBlog)
      const blogReturn = await blogService.addComment({id: blogInfo.id, updatedBlog})
      console.log('blogReturn: ', blogReturn)
      console.log('all blogs test: ', allBlogs)
      dispatch(setAllBlogs([...allBlogs].map(b => b.id === blogInfo.id ? blogReturn : b)))
      toggleVisibility()
      setCommentInput('')
    }

    return (
      <form onSubmit={handleNewComment} style={{display: addVisible}} >
        <input onChange={(e) => setCommentInput(e.target.value)} value={commentInput} />
        <button type='submit'>submit</button>
      </form>
    )
  }

  const CommentSection = () => {
    return (
      <CommentDiv>
        <h2>comments</h2>
          {blogInfo.comments.map(c => <li key={c}>{c}</li>)}
      </CommentDiv>
    )
  }

  const blogContent = () => {
    return (
      <BlogContentWrapper>
        <h1>{blogInfo.title}</h1>
        <NewCommentForm />
        <button style={{maxWidth: 'max-content'}} onClick={toggleVisibility}>{!visibility ? <>add comment</> : <>cancel</>}</button>
        <Link to={blogInfo.url} className='blog-entry-url'>
          {blogInfo.url}
        </Link>
        <div className='blog-entry-likes'>
          likes: {blogInfo.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div className='blog-entry-user'>user: {blogInfo.user.username}</div>
        <CommentSection />
      </BlogContentWrapper>
      )
    }

  return <div>{blogInfo ? blogContent() : <div>loading blog....</div>}</div>;
};

export default SingleBlog;
