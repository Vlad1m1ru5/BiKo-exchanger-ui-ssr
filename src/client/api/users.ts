import axios from 'axios'

const path = '/api/users'

const usersApi = {
  getAuthorization: async (credentials: Credentials) => {
    const { data } = await axios.get<string>(`${path}/login`, { params: credentials })
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
  },
  setNewUser: async ({
    email,
    password,
    username
  }: {
    email: string
    password: string
    username: string
  }) => {
    const { data } = await axios.post(`${path}/registration`, { email, password, username })
    return data
  }
}

export default usersApi