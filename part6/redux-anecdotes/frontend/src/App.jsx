
import { useEffect } from "react"
import AnecdoteFilter from "./components/AnecdoteFilter"
import AnecdoteList from "./components/AnecdoteList"
import NewAnecdote from "./components/NewAnecdote"
import Notification from "./components/Notification"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('attempting to get anecdotes')
    axios.get('http://localhost:3001/anecdotes').then((returnedAnecdotes) => {
      console.log('initial anecdotes: ', returnedAnecdotes.data)
      dispatch(setAnecdotes(returnedAnecdotes.data))
    })
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