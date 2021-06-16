import './App.css';

const Course = ({ course }) => {
  return (
    <div>
      < Header course={course} />
      < CourseParts parts={course.parts} />
      < Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

// I Want a course
const CourseParts = (props) => {
  const listItems = (part) => {
    return (
      <p key={part.id}>{part.name} {part.exercises}</p>
    )
  }

  return (
    <div>
      {props.parts.map(listItems)}
    </div>
  )
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const mapCourses = (course) => {
    return <Course key={course.id} course={course}/>
  }

  return (
    <div>
      {courses.map(mapCourses)}
    </div>
  )
}

export default App;
