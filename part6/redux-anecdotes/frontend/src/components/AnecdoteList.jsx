import { useDispatch, useSelector } from "react-redux"
import { anecdoteVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"



const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    const aTemp = state.anecdotes
    const fTemp = state.filter
    const filterList = aTemp.filter(a => JSON.stringify(a).toLowerCase().includes(fTemp)).sort((a, b) => b.votes - a.votes)
    console.log('filter list: ', filterList)
    return filterList
  })


  const vote = (id) => {
    dispatch(anecdoteVote(id))
    dispatch(setNotification(`you voted for ${anecdotes.find(a => a.id === id).content}`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
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