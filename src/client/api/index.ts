import axios from 'axios'

const api = {
  getAuthorization: async (credentials: Credentials) => {
    const { data } = await axios.get<Credentials>('/api/login', { params: credentials })
    return data
  },
  getAuthentication: async (credentials: Credentials) => {
    const { data } = await axios.post<string>('/api/auth', credentials)
    return data
  },
  getFilesMetadata: async (token: string) => {
    const config = { headers: { token } }
    const { data } = await axios.get<FileMetadata[]>('/api/files', config)
    return data
  }
}

export default api