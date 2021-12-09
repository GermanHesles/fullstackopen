import messenger from './messenger';

const validatePerson = (newName, newNumber, setConfirmMessage, setErrorMessage) => {
  if (!newName) {
    messenger('Name is empty', 'error', setErrorMessage, setConfirmMessage)
    return false;
  }

  if (!newNumber) {
    messenger('Number is empty', 'error', setErrorMessage, setConfirmMessage)
    return false;
  }

  return true;
}

export default validatePerson;