import { useEffect, useState } from 'react'

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {anecdote: 'If it hurts, do it more often.', votes: 0},
    {anecdote: 'Adding manpower to a late software project makes it later!', votes: 0},
    {anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {anecdote: 'Premature optimization is the root of all evil.', votes: 0},
    {anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
    {anecdote: 'The only way to go fast, is to go well.', votes: 0}
  ])

  const randomNumber = Math.floor(Math.random() * anecdotes.length)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [topScore, setTopScore] = useState(anecdotes[0])
  console.log('selected index: ', selectedIndex)

  useEffect(() => {
    setSelectedIndex(randomNumber)
  }, [])
  
  const handleVote = () => {
    const updatedCount = anecdotes[selectedIndex].votes + 1
    const updatedAnecdotes = anecdotes.map((a) => a === anecdotes[selectedIndex]  ? {...a, votes: updatedCount} : a )
    setAnecdotes(updatedAnecdotes)
    const sortClone = [...updatedAnecdotes]
    const sorter = sortClone.sort((a, b) => b.votes - a.votes)
    setTopScore(sorter[0])
  }


  const nextAnecdote = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length)
    setSelectedIndex(newIndex)
  }



  return (
    <div>
      <div>
        <h1>Daily anecdote</h1>
        <p>{anecdotes[selectedIndex].anecdote}</p>
        <div>has {anecdotes[selectedIndex].votes} votes</div>
      </div>
      <div className='button-area'>
        <button onClick={handleVote}>vote</button><button onClick={nextAnecdote} >next anecdote</button>
      </div>
      <div>
      <h1>Anecdote with the most votes</h1>
      <p>{topScore.anecdote}</p>
      <p>with {topScore.votes} votes</p>

      </div>
    </div>
  )
}

export default App

/*

        */