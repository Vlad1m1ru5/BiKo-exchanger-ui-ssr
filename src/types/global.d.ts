declare module '*.woff'
declare module '*.woff2'

type action = (args: any) => void

interface Credentials {
  password: string
  username: string
}

interface Input {
  isInvalid: boolean
  value: string
}

interface RegistrationCredentials extends Credentials {
  email: string
}