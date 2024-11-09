import { useDispatch, useSelector } from "react-redux"
import { anecdoteVote } from "../reducers/anecdoteReducer"



const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state).sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(anecdoteVote(id))
  }

  return (
    <>
      {
      anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
      )}
    </>
  
)
}

export default AnecdoteList