import axios from '../../helpers/axios'
import getAllPersons from './getAllPersons'

const erasePerson = (person, setWorking, setPersons) => {
  setWorking(true);
  return axios.delete(`/persons/${person.id}/`)
  .then(response => {
    setWorking(false);
    const {data} = response;
    getAllPersons().then((persons) => {
      setPersons(persons);
    });

    return data
  })
}

export default erasePerson;