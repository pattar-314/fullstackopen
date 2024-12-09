import { useState } from "react"


const BlogAddForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    props.addBlog(title, author, url)
    setAuthor('')
    setTitle('')
    setUrl('')
  }




  return(
    <form className='blog-add-form' onSubmit={(e) => handleBlogSubmit(e)}>
      <input className='blog-title-input' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='title' />
      <input className='blog-author-input' onChange={(e) => setAuthor(e.target.value)} value={author} placeholder='author' />
      <input className='blog-url-input' onChange={(e) => setUrl(e.target.value)} value={url} placeholder='url' />
      <button type='submit'>submit</button>
    </form>
  )
}

export default BlogAddForm