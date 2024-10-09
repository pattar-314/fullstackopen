const Blog = ({ blog }) => (
  <div className="blog-entry-wrapper">
    <div className="blog-entry-title">{blog.title}</div>
    <div className="blog-entry-author">{blog.author}</div>
  </div>  
)

export default Blog