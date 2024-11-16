import { useDispatch } from "react-redux"
import { createNew, newAnecdote } from "../reducers/anecdoteReducer"


const NewAnecdote = () => {

  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    createNew(anecdote)
    return dispatch(newAnecdote(anecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => createAnecdote(e)}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>

  )
}

export default NewAnecdote