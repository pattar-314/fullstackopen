import { useState } from "react"
import { Statistics } from "./components/Statistics"
import { Button } from "./components/Button"


function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div className="button-area">
        <Button handleClick={incrementGood} text='good' />
        <Button handleClick={incrementNeutral} text='neutral' />
        <Button handleClick={incrementBad} text='bad' />
      </div>
      {total === 0 ? <h1>No feedback given</h1> : <Statistics good={good} neutral={neutral} bad={bad} total={total} />}
    </div>
  )
}

export default App

