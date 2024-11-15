import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"


const Note = ({note, handleClick}) => {

  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? 'important': ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(state => {
    console.log('state: ', state)
    if(state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT' ? state.notes.filter(note => note.important) : state.notes.filter(note => !note.important)
  })




  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return(
    <ul>
      {notes.map(note => 
        <Note key={note.id} note={note} handleClick={() => toggleImportance(note.id)}> 
          {note.content}<strong>{note.important ? 'important' : ''}</strong>
        </Note>
      )}
    </ul> 
  )
}

export default Notes