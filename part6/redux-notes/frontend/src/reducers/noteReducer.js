import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'


const generateId = () => {
  Number((Math.random() * 1000000).toFixed(0))
}



export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}



const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action){
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
    return state.map(note => note.id !== id ? note : changedNote )
    },
    appendNote(state, action){
      console.log('payload: ', action.payload)
      return state.concat(action.payload)
    },
    setNotes(state, action){
      return action.payload
    }
  }
})

export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    console.log('new note: ', newNote)
    dispatch(appendNote(newNote))
  }
}



export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer