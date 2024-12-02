import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { createContext } from 'react'
const baseUrl = '/api/blogs'

const token = window.localStorage.getItem('blogAppUser') ? `Bearer ${JSON.parse(window.localStorage.getItem('blogAppUser')).token}` : null

console.log('token: ', token)

const getConfig = {headers: {Authorization: token}}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log('get all working: ', request.data)
  return request.data.sort((a, b) => b.likes - a.likes)
}

const getOne = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const createBlog = async (blogInfo) => {
  const request = await axios.post(baseUrl, blogInfo, getConfig)
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

export const BlogContext = createContext()
export const NotificationContext = createContext()
export const UserContext = createContext()
export const queryClient = new QueryClient()

export default { getAll, getOne, createBlog, updateBlog, deleteBlog, queryClient }