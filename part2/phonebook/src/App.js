import React, { useState } from 'react'


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
    return <p key={person.id}>{person.name} {person.number} </p>
  })
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      id: 1,
      number: '040-1234567'
    },
    { 
      name: 'Ada Lovelace',
      id: 2, 
      number: '39-44-5323523' 
    },
    { 
      name: 'Dan Abramov',
      id: 3, 
      number: '12-43-234345' 
    },
    { 
      name: 'Mary Poppendieck',
      id: 4, 
      number: '39-23-6423122' 
    }
  ]);

  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showPerson, setShowPerson] = useState('');

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
      id: persons.length + 1,
      number: newNumber  
    };

    setPersons(persons.concat(personsToAddToState));
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
