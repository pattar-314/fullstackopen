import axios from "axios"

const baseUrl = 'http://localhost:3001/api/persons'


const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson).then(response => {
    console.log('create response: ', response.data)
    return response.data
  }).catch(err => {
    throw new Error({error: `there was an error: ${err.message}`}) 
  })
  
  return request
}

const readOnePerson = (id) => {
  const request = axios.get(`${baseUrl}/${id}`).then((response) => response.data)
  return request
}



const readAllPersons = () => {
  const request = axios.get(baseUrl).then(response => response.data)
  return request
}


const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
  return request
}

export default {createPerson, readOnePerson, readAllPersons, deletePerson}