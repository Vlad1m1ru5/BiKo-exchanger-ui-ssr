import axios from 'axios'

const api = {
  authoriseUser: async (credentials: Credentials) => {
    const { data } = await axios.post('/api/login', credentials)
    return data
  }
}

export default api