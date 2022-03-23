import messenger from './messenger';

const validatePerson = (newName, newNumber, setConfirmMessage, setErrorMessage) => {
  if (!newName || newName.lenght < 3) {
    messenger('Name is empty', 'error', setErrorMessage, setConfirmMessage)
    return false;
  }

  if (!newNumber || newNumber.lenght < 8) {
    messenger('Number is empty', 'error', setErrorMessage, setConfirmMessage)
    return false;
  }

  return true;
}

export default validatePerson;