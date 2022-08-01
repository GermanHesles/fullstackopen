import axios from '../../helpers/axios'

const loginService = async credentials => {
    const { data } = await axios.post('/login', credentials)
    return data
}

export default loginService
