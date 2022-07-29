import axios from "axios";

const createPerson = (newObject, {token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post('http://localhost:3001/api/persons', newObject, config)
    .then(response => {
      const { data } = response;
      return data
    })
}

export default createPerson;