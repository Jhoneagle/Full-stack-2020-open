import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addComment = async (blog, newComment) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${blog.id}/comments`

  const response = await axios.post(url, newComment, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { 'Authorization': token }
  }

  const url = `${baseUrl}/${updatedBlog.id}`

  const response = await axios.put(url, updatedBlog, config)
  return response.data
}

const del = async blog => {
  const config = {
    headers: { 'Authorization': token }
  }

  const url = `${baseUrl}/${blog.id}`

  return await axios.delete(url, config)
}

export default { getAll, create, addComment, update, del, setToken, removeToken }