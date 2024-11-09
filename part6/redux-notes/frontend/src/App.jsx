import store, { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import "./App.css";
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"


const App = () => {


  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;
