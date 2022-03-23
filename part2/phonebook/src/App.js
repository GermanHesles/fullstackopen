import React, { useState, useEffect } from 'react';
import getAllPersons from './services/persons/getAllPersons';
import createPerson from './services/persons/createPerson';
import erasePerson  from './services/persons/erasePerson';
import updatePerson from './services/persons/updatePerson';
import messenger from './helpers/messenger';
import PersonForm from './PersonForm';
import Persons from './Persons';
import validatePerson from './helpers/validatePerson';
import './App.css';

const Filter = ({handleSearch, showPerson}) => {
  return (
    <input type='text' onChange={handleSearch} value={showPerson} />
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showPerson, setShowPerson] = useState('');
  const [working, setWorking] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);

  const handleErasePerson = (person) => {
    erasePerson(person, setWorking, setPersons)
    messenger(`${person.name} has been removed from server`, 'confirm', setErrorMessage, setConfirmMessage)
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

    /* if (!validatePerson(newName, newNumber, setConfirmMessage, setErrorMessage)) {
      return;
    } */

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
        messenger(`Information of ${newName} has been updated`, 'confirm', setErrorMessage, setConfirmMessage)

        return;
      }
    }

    const personsToAddToState = {
      name: newName,
      number: newNumber,
    };

    createPerson(personsToAddToState)
      .then(newPerson => {
        setPersons(prevPersons => prevPersons.concat(newPerson))
        messenger(`Added ${newName}`, 'confirm', setErrorMessage, setConfirmMessage)
      })
      .catch(error => {
        console.log(error.response.data.error);
        messenger(error.response.data.error, 'error', setErrorMessage, setConfirmMessage)
      })

    setNewName('');
    setNewNumber('');
  }

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
        <Persons handleErasePerson={handleErasePerson} persons={personsAfterFilter} />
      </div>
    </div>
  )
}

export default App;