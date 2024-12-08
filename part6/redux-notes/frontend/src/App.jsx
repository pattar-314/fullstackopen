import store, { createNote, initializeNotes, setNotes } from "./reducers/noteReducer";
import "./App.css";
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
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
