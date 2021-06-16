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

  export default Course;