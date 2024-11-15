import store, { createNote, setNotes } from "./reducers/noteReducer";
import "./App.css";
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import noteService from "../services/notes";


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
    dispatch(createNote())
  }, [])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;
