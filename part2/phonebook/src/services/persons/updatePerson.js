import axios from '../../helpers/axios'
import getAllPersons from './getAllPersons'

const updatePerson = (person, setPersons) => {
    const {name, number, id} = person;

    return axios.put(`/persons/${id}/`, {name, number})
    .then(response => {
      const {data} = response;
      getAllPersons().then((persons) => {
        setPersons(persons);
      });
      return data
    })
  }

export default updatePerson;