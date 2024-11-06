import store, { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  const notes = useSelector(state => state)


  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
    
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }


  useEffect(() => {
    dispatch({
        type: 'NEW_NOTE',
        payload: {
          content: 'the app state is in redux store',
          important: true,
          id: 1
        }
      })

      dispatch({
        type: 'NEW_NOTE',
        payload: {
          content: 'state changes are made with actions',
          important: false,
          id: 2
        }
      })
    
  }, [])


  

  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note => <li key={note.id} onClick={() => toggleImportance(note.id)}> {note.content}<strong>{note.important ? 'important' : ''}</strong></li>)}
      </ul>
    </div>
  )
}

export default App;
