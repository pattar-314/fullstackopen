import axios from 'axios'

const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  console.log('set token: ', newToken)
  token = `Bearer ${newToken}` 
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log('get all: ', request.data)
  return request.data
}

const create = async (newObject) => {
  console.log('create: ', newObject)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log('response: ', response)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}


export default {getAll, create, update, setToken}