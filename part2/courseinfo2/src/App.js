import './App.css';

const Course = (props) => {
  return (
    <div>
      < Header course={props.course} />
      < Content parts= {props.course.parts} />
      < Total parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Parts = (props) => {
  console.log(props);
  const listItems = (part) => {
    return (
        <p key={part.id}>{part.name} {part.exercises}</p>
    )
  }

  return (
    <div>
      {props.part.map(listItems)}
    </div>
  )
}

const Content = (props) => {
  return <Parts part={props.parts}/>
}

const Total =(props) => {
  const total = props.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0)

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
