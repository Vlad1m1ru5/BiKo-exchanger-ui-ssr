import axios from 'axios'

const path = '/api/users'

const usersApi = {
  getAuthorization: async (credentials: Credentials) => {
    const { data } = await axios.get<Credentials>(`${path}/login`, { params: credentials })
    return data
  },
  getAuthentication: async (credentials: Credentials) => {
    const { data } = await axios.post<string>(`${path}/auth`, credentials)
    return data
  },  
  getUsers: async ({
    token,
    userName
  }: {
    token: string
    userName: string
  }) => {
    const config = { headers: { token } }
    const { data } = await axios.get<User[]>(`${path}/all/${userName}`, config)
    return data
  }
}

export default usersApi