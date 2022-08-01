import axios from '../../helpers/axios'

const getAllPersons = () => {
  return axios.get('/persons')
    .then(response => {
      const {data} = response;
      return data
    });
}

export default getAllPersons;