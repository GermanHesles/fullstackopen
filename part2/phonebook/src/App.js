import React, { useState, useEffect } from 'react';
import getAllPersons from './services/persons/getAllPersons';
import createPerson from './services/persons/createPerson';
import erasePerson  from './services/persons/erasePerson';
import updatePerson from './services/persons/updatePerson';
import './App.css';



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
  const [newName, setNewName] = useState();
  const [newNumber, setNewNumber] = useState();
  const [showPerson, setShowPerson] = useState('');
  const [working, setWorking] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);

  const setMessage = (message, type) => {
    if (type === 'error') {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    if (type === 'confirm') {
      setConfirmMessage(message)
      setTimeout(() => {
        setConfirmMessage(null)
      }, 5000)
    }
  }

  const handleErasePerson = (person) => {
    erasePerson(person, setWorking, setPersons)
    setMessage(`${person.name} has been removed from server`, 'confirm')
  }

  const Persons = (props) => {
    return props.persons.map((person) => {
      return <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => {handleErasePerson(person)}}>delete</button>
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

    console.log(newName, newNumber);

    if (!newName) {
      setMessage('Name is empty', 'error')
      return;
    }
    if (!newNumber) {
      setMessage('Number is empty', 'error')
      return;
    }

    if (persons.some((person) => {
      foundPerson = person

      return person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    })) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: newName.trim(),
          number: newNumber.trim(),
          id: foundPerson.id
        }
        updatePerson(updatedPerson, setPersons);
        setMessage(`Information of ${newName} has been updated`, 'confirm')

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
        setMessage(`Added ${newName}`, 'confirm')
        return;
      })
      .catch(() => {
        setMessage('An Error Happened', 'error')
        return;
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
      {working && <div>Loading</div>}
      <h2>Phonebook</h2>
      {confirmMessage && <div className="message message-confirm">{confirmMessage}</div>}
      {errorMessage && <div className="message message-error">
        {errorMessage}</div>}
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
