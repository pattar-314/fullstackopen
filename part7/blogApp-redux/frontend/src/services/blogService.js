import axios from 'axios'
const baseUrl = '/api/blogs'

const token = window.localStorage.getItem('blogAppUser') ? `Bearer ${JSON.parse(window.localStorage.getItem('blogAppUser')).token}` : null

console.log('token: ', token)

const getConfig = { headers: { Authorization: token }}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getOne = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const createBlog = async ({blogInfo, auth}) => {
  console.log('blog info: ', blogInfo)
  console.log( 'auth: ', auth)
  const request = await axios.post(baseUrl, blogInfo, auth)
  console.log('create request: ', request)
  return request.data
}

export const updateBlog = async (updateInfo) => {
  const request = await axios.post(baseUrl, updateInfo, getConfig)
  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, getConfig)
  return request.data
}

export default { getAll, getOne, createBlog, updateBlog, deleteBlog }