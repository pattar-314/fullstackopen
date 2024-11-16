import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createNew = async( content ) => {
  const anecdoteObject = asObject(content)
  const madeNote = await axios.post('http://localhost:3001/anecdotes', anecdoteObject)
  return madeNote
}




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){
      return state.concat(asObject(action.payload))
    },
  anecdoteVote(state, action){
    console.log('vote')
    const id = action.payload
    console.log('test 1: ', action.payload)
    const selectedAnecdote = state.find(a => a.id === id)
    console.log('test 2: ', selectedAnecdote)
    const modifiedAnecdote = {...selectedAnecdote, votes: selectedAnecdote.votes + 1}
    console.log('test 3: ', modifiedAnecdote)
    return state.map(a => a.id === id ? modifiedAnecdote: a)
  },
  setAnecdotes(state, action){
    return action.payload
  }
}})


export const { newAnecdote, anecdoteVote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
