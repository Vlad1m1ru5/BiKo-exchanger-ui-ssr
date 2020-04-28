import express from 'express'
import { isCreatedUser } from './middleweare';

const router = express.Router()

router.post('/login', isCreatedUser, (req, res) => {
  res.send('/home');
})

export default router
