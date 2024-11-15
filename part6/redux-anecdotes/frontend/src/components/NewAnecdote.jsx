import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"


const NewAnecdote = () => {

  const dispatch = useDispatch()

  const createNote = (e) => {
    e.preventDefault()
    const anecdote = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    return dispatch(newAnecdote(anecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => createNote(e)}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>

  )
}

export default NewAnecdote