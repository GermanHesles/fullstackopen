import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] 

const random = (list) => Math.floor(Math.random() * list.length);

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const maxPoints = Math.max(...points)
  const maxPointsIndex = points.indexOf(maxPoints)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>
        It has {points[selected]} votes
      </p>
      <p>
        <button onClick={() => { 
            const copyPoints = [...points]
            copyPoints[selected] += 1
            setPoints(copyPoints)
        }}>vote</button>
        <button onClick={() => setSelected(random(anecdotes))}>
          next anecdote
        </button>
      </p>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[maxPointsIndex]}
      </p>
      <p>
        has {maxPoints}
      </p>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)