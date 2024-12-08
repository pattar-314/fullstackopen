import axios from "axios"

const getId = () => (100000 * Math.random()).toFixed(0)



export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const getAll = async () => {
  return await axios.get('http://localhost:3001/anecdotes')
}

export const createAnecdote = async (content) => {
  console.log('test: ', content)
  const builtAnecdote = asObject(content)
  const response = await axios.post('http://localhost:3001/anecdotes', builtAnecdote)
  console.log('response: ', response)
  return response.data
}

export const voteAnecdote = async (anecdote) => {
  const modifiedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const updatedAnecdote = await axios.put(`http://localhost:3001/anecdotes/${modifiedAnecdote.id}`, modifiedAnecdote)
  return updatedAnecdote
}

