import { useEffect, useState, useRef } from 'react'
import noteService from './services/noteServices.js'
import Note from './components/Note'
import './main.css'
import axios from 'axios'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Toggleable.jsx'
import NoteForm from './components/NoteForm.jsx'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    console.log('effect')
    const initialNotes = fetchInitialNotes()
    console.log('response: ', initialNotes)
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()



  const fetchInitialNotes = async () => {
    const fetchedNotes = await noteService.getAll()
    console.log('fetched notes: ', fetchedNotes)
    setNotes(fetchedNotes)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const loginInfo = { username, password }
      console.log('logging in with: ', username, password)
      console.log('attempting to login: ', loginInfo)
      const loginUser = await axios.post('/api/users/login', loginInfo)
      console.log('login user:', loginUser)
      if(loginUser){
        noteService.setToken(loginUser.data.token)
        setUser(loginUser.data)
        console.log('user logged in: ', loginUser.data.username)
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(loginUser.data))
      } else {
        console.log('user login failed')
        setErrorMessage('user login failed')
      }
    } catch(err) {
      console.log('there was an error: ', err)
    }

  }


  const addNote = async (noteObject) => {

    const createdNote = await noteService.create(noteObject)
    console.log('created note: ', createdNote)
    setNotes(notes.concat(createdNote))
    noteFormRef.current.toggleVisibility
  }

  const toggleImportance = async (id) => {
    const note = notes.find((n) => n.id === id)
    console.log('found note: ', note)
    const changedNote = { ...note, important: !note.important }

    const updatedNote = await noteService.update(id, changedNote)
    console.log('updated note: ', updatedNote.data)

    setNotes(notes.map((n) => (n.id !== id ? n : updatedNote.data)))
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    location.reload()
  }


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleLogin={handleLogin} loginVisible={loginVisible} />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )



  return (
    <div>
      <h1>Notes</h1>
      {!user ? loginForm() : <>User logged in: {user.username} <button onClick={handleLogout}>logout</button></>}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      {noteForm()}

    </div>
  )
}

export default App
