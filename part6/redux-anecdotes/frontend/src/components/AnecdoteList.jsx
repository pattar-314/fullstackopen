import { useDispatch, useSelector } from "react-redux"
import { anecdoteVote } from "../reducers/anecdoteReducer"
import { handleNotification } from "../reducers/notificationReducer"
import { voteAnecdote } from "../services/anecdoteServices"



const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    const aTemp = state.anecdotes
    const fTemp = state.filter
    const filterList = aTemp.filter(a => JSON.stringify(a).toLowerCase().includes(fTemp)).sort((a, b) => b.votes - a.votes)
    console.log('filter list: ', filterList)
    return filterList
  })


  const vote = async (selectedAnecdote) => {
    const votedAnecdote = await  voteAnecdote(selectedAnecdote)
    console.log('voted anecdote: ', votedAnecdote.data)
    dispatch(anecdoteVote(votedAnecdote.data))
    dispatch(handleNotification(`you voted for ${anecdotes.find(a => a.id === selectedAnecdote.id).content}`, 5))
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
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
      )}
    </>
  
)
}

export default AnecdoteList