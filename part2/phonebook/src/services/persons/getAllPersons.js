import axios from "axios";

const getAllPersons = () => {
  return axios.get('https://tranquil-journey-59310.herokuapp.com/api/persons')
    .then(response => {
      const {data} = response;
      return data
    });
}

export default getAllPersons;