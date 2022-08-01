const Persons = ({persons, handleErasePerson}) => {
  return persons.map((person) => {
    return <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => {handleErasePerson(person)}}>delete</button>
    </p>
  })
}

export default Persons;
