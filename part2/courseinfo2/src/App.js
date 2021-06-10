import './App.css';
// import Note from './Note.js';

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true
//   }
// ]

// function App() {
//   if (typeof notes === 'undefined' || notes.length === 0) {
//     return 'No tenemos notas'
//   }

//   return (
//     <ol>
//       {notes.map((note) => (
//         // <Note key={note.id} id={note.id} content={note.content} date={note.date} />
//         <Note key={note.id} {...note} />
//       ))}
//     </ol>
//   );
// }

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

const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
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

  return <Course course={course} />
}

export default App;
