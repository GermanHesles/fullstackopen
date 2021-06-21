import React, { useState } from 'react'
import { nanoid } from 'nanoid'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      id: nanoid(),
      number: '040-1234567'
    }
  ]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      id: nanoid(),
      number: newNumber  
    };

    setPersons(persons.concat(personsToAddToState));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' onChange={handleChange} value={newName}/>
        </div>
        <div>
          number: <input type='tel' onChange={handleChangeNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person,) => {
            return <p key={person.id}>{person.name} {person.number} </p>
          })
        }
      </div>
    </div>
  )
}

export default App
