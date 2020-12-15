import blogService from '../services/blogs'

const initialState = []

const compareBlogs = (blog1, blog2) => {
  if (blog2.likes !== blog1.likes) {
    return blog2.likes - blog1.likes
  }

  return blog1.title.localeCompare(blog2.title)
}

const blogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.data).sort(compareBlogs)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data.id).sort(compareBlogs)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data).sort(compareBlogs)
  case 'INIT_BLOGS':
    return action.data.sort(compareBlogs)
  default:
    return state.sort(compareBlogs)
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    const blog = await blogService.create(data)

    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

export const createComment = (blog, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blog, comment)
    blog.comments = blog.comments.concat(newComment)

    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export const increaseLikes = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user._id
    }

    const updatedBlog = await blogService.update(likedBlog)
    updatedBlog.user = blog.user

    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.del(blog)

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export default blogReducer