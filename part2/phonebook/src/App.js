import React, { useState, useEffect } from 'react'
import axios from 'axios'
import getAllPersons from './services/persons/getAllPersons'

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

const Persons = (props) => {
  return props.persons.map((person) => {
    return <p key={person.id}>{person.name} {person.number}</p>
  })
}

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showPerson, setShowPerson] = useState('');

  useEffect(() => {
    console.log('useEffect')
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
    if (persons.some((person) => {
      return person.name === newName
    })) { 
      alert(`${newName} is already added to phonebook`);     
      return;
    }

    const personsToAddToState = {
      name: newName,
      number: newNumber,
      userId: 1  
    };

    axios
      .post('http://localhost:3001/persons', personsToAddToState)
      .then(response => {
        const {data} = response
        setPersons(prevPersons => prevPersons.concat(data))
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
      <h2>Phonebook</h2>
      <Filter showPerson={showPerson} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit} 
        handleChange= {handleChange} 
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
