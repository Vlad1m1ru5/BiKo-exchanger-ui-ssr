declare module '*.svg'
declare module '*.woff'
declare module '*.woff2'

type action = (args: any) => void
type option = 'delete' | 'print' | 'share' | 'read' | 'write'
type spec = 'danger' | 'help' | ''

interface Credentials {
  password: string
  username: string
}

interface FileOptions {
  id: string
  name: string
  options: option[]
  tags: string[]
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
