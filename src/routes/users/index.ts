import express from 'express'

import {
  isAuthRequest,
  isAuthUser,
  isCreatedUser,
} from 'middleware/index';

const usersRouter = express.Router()

usersRouter.post('/auth', isAuthUser, (req, res) => {
  res.send('some-unic-token')
})

usersRouter.get('/login', isCreatedUser, (req, res) => {
  const { username, password } = req.query
  res.send({ username, password })
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