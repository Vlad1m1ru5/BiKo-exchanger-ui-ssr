import express from 'express'

const router = express.Router()

router.post('/login', (req, res) => {
  console.log('API req: ', req.body)
  res.send('LOGIN')
})

export default router
