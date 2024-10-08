import { useState } from "react"
import noteServices from "../services/noteServices"

const NoteForm = ({ createNote }) => {

  const [newNote, setNewNote] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Crate a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm