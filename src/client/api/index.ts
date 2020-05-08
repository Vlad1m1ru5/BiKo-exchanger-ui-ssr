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
  getFileById: async ({
    id,
    token
  }: {
    id: string
    token: string
  }) => {
    const config = { 
      headers: { token },
      params: { id }
    }
    const { data } = await axios.get<string>(`/api/file`, config)
    return data
  },
  getFilesOptions: async (token: string) => {
    const config = { headers: { token } }
    const { data } = await axios.get<FileOptions[]>('/api/files/options', config)
    return data
  },
  getFilesMetadata: async (token: string) => {
    const config = { headers: { token } }
    const { data } = await axios.get<FileMetadata[]>('/api/files/metadata', config)
    return data
  },
  getUsers: async ({
    token,
    userName
  }: {
    token: string
    userName: string
  }) => {
    const config = {
      headers: { token },
      params: { userName } }
    const { data } = await axios.get<User[]>('/api/users', config)
    return data
  },
  setUsersOptionByFileId: async ({
    id,
    option,
    token,
    usersIds
  }: {
    id: string,
    option: option
    token: string
    usersIds: string[]
  }) => {
    const config = { headers: { token } }
    const { data } = await axios.post('/api/file', { id, option, usersIds }, config)
    return data
  }
}

export default api