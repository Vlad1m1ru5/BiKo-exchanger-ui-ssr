import axios from 'axios';
import express from 'express'
import {
  isAuthRequest,
  isCreatedUser,
  isNewUser,
  responseToJson,
  tokenToObj
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

    if (message && status) {
      res.status(status)
      res.send(message)
      return
    }

    res.status(500)
    res.send(error.message)
  }
})

usersRouter.get('/all/:userName', isAuthRequest, async (req, res) => {
  const config = { headers: { ...tokenToObj(req.headers.token) } }
  const { userName } = req.params

  const { data } = await axios.get<string>(`${backApi}/userList`, config)
  const { userByName } =  JSON.parse(JSON.parse(data.replace(')]}\'', '')))
  const users = userByName
    .filter((name: string) => name !== userName)
    .map((name: string, id: number) => ({ id, name }))

  res.send(users)
})

export default usersRouter