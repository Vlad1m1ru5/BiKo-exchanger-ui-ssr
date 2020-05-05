import axios from 'axios'
import { RequestHandler } from 'express'

const api = process.env.API

export const isCreatedUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.query
  
  if (username === undefined ||
      password === undefined
  ) {
    res.status(503)
    return res.send('Пользователь не найден')
  }

  try {
    const { data } = await axios.post(`${api}/login`, { username, password })

    if (!data) {
      res.status(500)
      return res.send('Ошибка обработки запроса')
    }

    next()
  } catch (error) {
    const { status } = error

    if (status === 401) {
      res.status(401)
      return res.send('Пользователь не найден')
    }

    if (status === 302) {
      res.status(302)
      return res.send('Не удалось авторизировать пользователя')
    }  
  }
}

export const isAuthUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body
  
  if (username === undefined ||
      password === undefined
  ) {
    res.status(503)
    return res.send('Пользователь не найден')
  }

  next()
}