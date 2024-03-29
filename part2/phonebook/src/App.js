import React, { useState, useEffect } from 'react';
import getAllPersons from './services/persons/getAllPersons';
import createPerson from './services/persons/createPerson';
import erasePerson  from './services/persons/erasePerson';
import updatePerson from './services/persons/updatePerson';
import loginService from './services/login/login';
import messenger from './helpers/messenger';
import axios from './helpers/axios'
import PersonForm from './PersonForm';
import Persons from './Persons';
import LoginForm from './LoginForm';

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookAppUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      const { token } = user
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`
    }
  }, [])

  useEffect(() => {
    getAllPersons().then((persons) => {
        setPersons(persons);
      });
  }, []);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedPhonebookAppUser', JSON.stringify(user)
      )

      const { token } = user
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }

  }

  const handleErasePerson = (person) => {
    erasePerson(person, setWorking, setPersons)
    messenger(`${person.name} has been removed from server`, 'confirm', setErrorMessage, setConfirmMessage)
  }

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
      {errorMessage && <div className="message message-error">{errorMessage}</div>}

      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          handleChangeUsername= {handleChangeUsername}
          username={username}
          password={password}
          handlePassword={handlePassword}
        />
      )}

      {user && (
        <React.Fragment>
          <h3>add a new</h3>
          <PersonForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            newName={newName}
            handleChangeNumber={handleChangeNumber}
            newNumber={newNumber}
          />
        </React.Fragment>
      )}

      <h2>Numbers</h2>
      <div>
        <Persons handleErasePerson={handleErasePerson} persons={personsAfterFilter} />
      </div>
      <Filter showPerson={showPerson} handleSearch={handleSearch} />
    </div>
  )
}

export default App;
