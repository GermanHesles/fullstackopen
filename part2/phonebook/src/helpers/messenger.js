const setMessage = (message, type, setErrorMessage, setConfirmMessage) => {
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

export default setMessage;