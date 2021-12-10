import axios from "axios";

const createPerson = ({name, number, userId}) => {
  return axios.post('https://tranquil-journey-59310.herokuapp.com/api/persons', {name, number, userId})
    .then(response => {
      const {data} = response;
      return data
    })
}

export default createPerson;