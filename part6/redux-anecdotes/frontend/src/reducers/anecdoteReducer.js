import { createSlice } from "@reduxjs/toolkit"
import { getAll } from "../services/anecdoteServices"



export const createNew = ( anecdote ) => {
  return async (dispatch) => {
    dispatch(newAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await getAll()
    console.log('get all: ', initialAnecdotes.data)
    dispatch(setAnecdotes(initialAnecdotes.data))
  }
}

export const vote = (modifiedAnecdote) => {
  return async (dispatch) => {
    console.log('dispatch: ', dispatch)
    dispatch(anecdoteVote(modifiedAnecdote))
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){
      return state.concat(action.payload)
    },
  anecdoteVote(state, action){
    const id = action.payload.id
    return state.map(a => a.id === id ? action.payload: a)
  },
  setAnecdotes(state, action){
    return action.payload
  }
}})


export const { newAnecdote, anecdoteVote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
