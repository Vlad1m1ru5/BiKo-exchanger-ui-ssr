import axios from 'axios';
import express from 'express'
import {
  isAuthRequest,
  isCreatedUser,
  isNewUser,
  responseToJson
} from 'middleware/index';

const backApi = process.env.API
const usersRouter = express.Router()

usersRouter.post('/registration', isNewUser, async (req, res) => {
  const { email, password, username } = req.body

  try {
    const { data } = await axios.post(`${backApi}/registration`, { username, password, email })  
    res.send(data)
  } catch (error) {
    const { message, status } = error

    res.status(status)
    res.send(message)
  }
})

usersRouter.get('/login', isCreatedUser, async (req, res) => {
  const { username, password } = req.query

  try {
    const { data } = await axios.post(`${backApi}/authenticate`, { username, password })
    const token = responseToJson(data)
    res.send(token)
  } catch (error) {
    const { message, status } = error

    res.status(status)
    res.send(message)
  }
})

usersRouter.get('/all/:userName', isAuthRequest, (req, res) => {
  const { userName } = req.params

  const users: User[] = [
    {
      id: '123',
      name: 'John'
    },
    {
      id: '456',
      name: 'Smith'
    },
    {
      id: '789',
      name: 'Alex'
    },
    {
      id: '012',
      name: 'Vanse'
    }
  ]

  const data = users.filter(({ name }) => name !== userName)

  res.send(data)
})

export default usersRouter