import { createStore } from "redux"


const generateId = () => {
  Number((Math.random() * 1000000).toFixed(0))
}


export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 2
  }
]

const noteReducer = (state = initialState, action) => {
  console.log('dispatching action: ', action)
  switch(action.type){
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      return state.map(s => s.id == action.payload.id ? {...s, important: !s.important} : s)
    case 'TOGGLE_IMPORTANT':
      const foundEntry = state.find({id: action.payload.id})
      const updatedEntry = {...foundEntry, important: !foundEntry.important}
      return state.map((e) => entry.id === action.payload ? updatedEntry : e)
    default:
      return state
  }
}


export default noteReducer