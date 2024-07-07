import { useState } from 'react'

const StatisticLine = ({name, count, suffix=""}) => {
  return (
    <tr><td>{name}</td> <td>{count} {suffix}</td></tr>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = (good*1 + neutral*0 + bad*(-1))/total
  let positive = good*100/total
  if (total === 0) {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <table>
        <StatisticLine name="good" count={good} />
        <StatisticLine name="neutral" count={neutral} />
        <StatisticLine name="bad" count={bad} />
        <StatisticLine name="all" count={total} />
        <StatisticLine name="average" count={average} />
        <StatisticLine name="positive" count={positive} suffix=" %"/>
      </table>
    </div> 
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App