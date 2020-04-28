type action = (args: any) => void

interface Credentials {
  password: string
  username: string
}

interface RegistrationCredentials extends Credentials {
  email: string
}