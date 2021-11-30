import React, { useState, useEffect } from 'react'
import getAllPersons from './services/persons/getAllPersons'
import createPerson from './services/persons/createPerson'
import erasePerson  from './services/persons/erasePerson'
import updatePerson from './services/persons/updatePerson'
// import axios from 'axios'


const Filter = ({handleSearch, showPerson}) => {
  return (
    <input type='text' onChange={handleSearch} value={showPerson} />
  )
}

const PersonForm = ({
    handleSubmit,
    handleChange,
    newName,
    handleChangeNumber,
    newNumber
  }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input type='text' onChange={handleChange} value={newName} />
      </div>
      <div>
        number:
        <input type='tel' onChange={handleChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showPerson, setShowPerson] = useState('');
  const [working, setWorking] = useState(false);



  const Persons = (props) => {
    return props.persons.map((person) => {
      return <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => erasePerson(person, setWorking, setPersons)}>delete</button>
      </p>
    })
  }

  useEffect(() => {
    getAllPersons().then((persons) => {
        setPersons(persons);
      });
  }, []);

  const handleSearch = (event) => {
    setShowPerson(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    let foundPerson = undefined;

    if (persons.some((person) => {
      foundPerson = person
      console.log(foundPerson);

      return person.name.toLowerCase() === newName.toLowerCase()
    })) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: foundPerson.id
        }
        updatePerson(updatedPerson, setPersons);

      }

      return;
    }

    const personsToAddToState = {
      name: newName,
      number: newNumber,
      userId: 1
    };

    createPerson(personsToAddToState)
      .then(newPerson => {
        setPersons(prevPersons => prevPersons.concat(newPerson))
    })

    setNewName('');
    setNewNumber('');
  };

  const filterx = (person) => {
    return person.name.toLowerCase().includes(showPerson.toLowerCase())
  }

  const personsAfterFilter = persons.filter(filterx)

  return (
    <div>
      {working && <div style={{width: 100, height: 40, background: 'red'}}>Loading</div>}
      <h2>Phonebook</h2>
      <Filter showPerson={showPerson} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={personsAfterFilter}/>
      </div>
    </div>
  )
}

export default App
