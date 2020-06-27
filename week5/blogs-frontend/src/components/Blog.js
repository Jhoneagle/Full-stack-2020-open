import React from 'react'

const Blog = ({ blog, editBlog, deleteBlog }) => (
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const addlike = () => {
    alert("like")
  }
  
  const removeBlog = () => {
    alert("remove")
  }
  
  const limited = () => (
    <div className="blogPost">
      <p>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>View</button>
      </p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={addlike}>Like</button>
      </p>
      <p>{blog.user.name}</p>
      <p>
        <button onClick={removeBlog}>Remove</button>
      </p>
    </div>
  )
  
  const full = () => (
    <div className="blogPost">
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>Hide</button>
    </div>
  )
  
  return (
    {visible ? 
      limited() :
      full()}
  )
)

export default Blog
