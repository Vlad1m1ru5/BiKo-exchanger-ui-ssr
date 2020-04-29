import axios from 'axios'
import { RequestHandler } from 'express'

const api = process.env.API

export const isCreatedUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body
  
  if (username === undefined ||
      password === undefined
  ) {
    res.status(503)
    return res.send('Пользователь не найден')
  }

  const { status } = await axios.post(`${api}/login`, { username, password })

  if (status === 302) {
    res.status(302)
    return res.send('Не удалось авторизировать пользователя')
  }

  next()
}