import axios from 'axios'

const api = {
  getAuthorization: async (credentials: Credentials) => {
    const { data } = await axios.get<Credentials>('/api/login', { params: credentials })
    return data
  },
  getAuthentication: async (credentials: Credentials) => {
    const { data } = await axios.post('/api/auth', credentials)
    return data
  }
}

export default api