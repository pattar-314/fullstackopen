import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getOne = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const createBlog = async (blogInfo, config) => {
  const request = await axios.post(baseUrl, blogInfo, config)
  return request.data
}

const updateBlog = async (id, updateInfo) => {
  const request = await axios.post(`${baseUrl}/${id}`, updateInfo)
  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

export default { getAll, getOne, createBlog, updateBlog, deleteBlog }