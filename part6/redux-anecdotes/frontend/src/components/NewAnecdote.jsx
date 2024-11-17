import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { createAnecdote } from "../services/anecdoteServices"


const NewAnecdote = () => {

  const dispatch = useDispatch()

  const newAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    console.log('content: ', content)
    e.target.newAnecdote.value = ''
    const newAnecdote = await createAnecdote(content)
    dispatch(createNew(newAnecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => newAnecdote(e)}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>

  )
}

export default NewAnecdote