
import { useEffect } from "react"
import AnecdoteFilter from "./components/AnecdoteFilter"
import AnecdoteList from "./components/AnecdoteList"
import NewAnecdote from "./components/NewAnecdote"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { initializeAnecdotes} from "./reducers/anecdoteReducer"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('attempting to get anecdotes')
    dispatch(initializeAnecdotes())
  }, [dispatch])


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App