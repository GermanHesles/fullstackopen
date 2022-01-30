import axios from "axios";
import getAllPersons from './getAllPersons'

const erasePerson = (person, setWorking, setPersons) => {
    setWorking(true);
    return axios.delete(`http://localhost:3001/api/persons/${person.id}/`)
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