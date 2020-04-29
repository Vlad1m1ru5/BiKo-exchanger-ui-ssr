import express from 'express'
import { isAuthUser, isCreatedUser } from './middleweare';

const router = express.Router()

router.get('/login', isCreatedUser, (req, res) => {
  const { username, password } = req.query
  res.send({ username, password })
})

router.post('/auth', isAuthUser, (req, res) => {
  res.send()
})

export default router
