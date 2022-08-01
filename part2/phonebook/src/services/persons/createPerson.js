import axios from '../../helpers/axios'

const createPerson = (newObject) => {
  return axios.post('/persons', newObject)
    .then(response => {
      const { data } = response;
      return data
    })
}

export default createPerson;