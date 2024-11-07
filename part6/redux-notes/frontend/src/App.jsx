import store, { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";


const App = () => {

  const dispatch = useDispatch()

  const notes = useSelector(state => state)



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
      <NewNote />
      <Notes />
    </div>
  )
}

export default App;
