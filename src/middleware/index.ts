import axios from 'axios'
import { RequestHandler } from 'express'

const backApi = process.env.API

export const isAuthRequest: RequestHandler = async (req, res, next) => {
  const { token } = req.headers

  if (!token) {
    res.status(403)
    res.send('Не авторизированный запрос')
  }

  next()
}

export const isCreatedUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.query

  if (username === undefined ||
      password === undefined
  ) {
    res.status(503)
    return res.send('Пользователь не найден')
  }

  next()

  try {
    const { data, status } = await axios.post(`${backApi}/login`, { username, password })

    if (status === 504) {
      res.status(504)
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

export const isValidFileId: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  if (typeof id !== 'string') {
    res.status(500)
    res.send('Не удалось обработать id файла.')
  }

  next()
}