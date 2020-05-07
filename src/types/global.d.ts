declare module '*.svg'
declare module '*.woff'
declare module '*.woff2'

type action = (args: any) => void

interface Credentials {
  password: string
  username: string
}

interface FileMetadata {
  birthtime: Date
  id: string
  mtime: Date
  name: string
  owner: string
  size: number
  tags: string[]
}

interface Input {
  isInvalid: boolean
  value: string
}

interface RegistrationCredentials extends Credentials {
  email: string
}
