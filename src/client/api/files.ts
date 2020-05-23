import axios from 'axios'

const path = '/api/files'

const filesApi = {
  createFile: async ({
    formData,
    token
  }: {
    formData: FormData
    token: string
  }) => {
    const config = { 
      headers: {
        'Content-Type': 'multipart/form-data',
        token
      }
    }
    const { data } = await axios.post<string>(`${path}/create`, formData, config)
    return data
  },
  getFileById: async ({
    id,
    token
  }: {
    id: string
    token: string
  }) => {
    const config = { headers: { token } }
    const { data } = await axios.get<{ ext: string, file: string }>(`${path}/data/${id}`, config)
    return data
  },
  getFilesOptions: async (token: string) => {
    const config = { headers: { token } }
    const { data } = await axios.get<FileOptions[]>(`${path}/options`, config)
    return data
  },
  getFilesMetadata: async (token: string) => {
    const config = { headers: { token } }
    const { data } = await axios.get<FileMetadata[]>(`${path}/metadata`, config)
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
    const { data } = await axios.post(`${path}/authoreties`, { id, option, usersIds }, config)
    return data
  }
}

export default filesApi