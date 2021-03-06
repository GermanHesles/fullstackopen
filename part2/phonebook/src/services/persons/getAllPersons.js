import axios from "axios";

const getAllPersons = () => {
  return axios.get('http://localhost:3001/api/persons')
    .then(response => {
      const {data} = response;
      return data
    });
}

export default getAllPersons;