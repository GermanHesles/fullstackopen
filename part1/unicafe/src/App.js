import {useState} from 'react';
import './App.css';

const Button = ({handleClick, name}) => (
  <button onClick={handleClick}>{name}</button>
)

const Statistic = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{Math.round(value * 100) / 100}</td></tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {

  const average = (good - bad) / total

  const goodVote = good * 100 / total
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="total" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="good per" value={goodVote} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const message = total === 0 ? 'Not feedback given' : 
    <Statistics good={good} neutral={neutral} bad={bad} total={total} />

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} name='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} name='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} name='bad'/>
      <h1>statistics</h1>
      {message}
    </div>
  )
}

export default App;