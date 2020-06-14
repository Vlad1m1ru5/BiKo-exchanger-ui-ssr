import { RequestHandler } from 'express'

export const isAuthRequest: RequestHandler = (req, res, next) => {
  const { token } = req.headers

  if (!token) {
    res.status(403)
    res.send('Не авторизированный запрос')
  }

  next()
}

export const isCreatedUser: RequestHandler = (req, res, next) => {
  const { username, password } = req.query

  if (username === undefined ||
      password === undefined
  ) {
    res.status(503)
    res.send('Пользователь не найден')
  }

  next()
}

export const isAuthUser: RequestHandler = (req, res, next) => {
  const { username, password } = req.body
  
  if (username === undefined ||
      password === undefined
  ) {
    res.status(503)
    res.send('Пользователь не найден')
  }

  next()
}

export const isNewUser: RequestHandler = (req, res, next) => {
  const { email, password, username } = req.body

  if (!email ||
      !password ||
      !username
  ) {
    res.status(503)
    res.send('Пользователь уже существует')
  }

  next()
}

export const isValidFileId: RequestHandler = (req, res, next) => {
  const { id } = req.params

  if (typeof id !== 'string') {
    res.status(500)
    res.send('Не удалось обработать id файла.')
  }

  next()
}

export const responseToJson = (data: string) => {
  const datToString = JSON.stringify(data)
  const tokenObj = datToString.replace(')]}\'', '')
  return JSON.parse(tokenObj)
}

export const tokenToObj = (token: any) => ({ 'Authorization': `Bearer ${token}` })