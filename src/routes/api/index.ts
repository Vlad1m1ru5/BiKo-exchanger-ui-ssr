import express from 'express'
import {
  isAuthRequest,
  isAuthUser,
  isCreatedUser
} from './middleweare';

const router = express.Router()

router.post('/auth', isAuthUser, (req, res) => {
  res.send('some-unic-token')
})

router.get('/files', isAuthRequest, (req, res) => {
  try {
    const filesMetadataList: FileMetadata[] = [
      {
        birthtime: new Date(),
        mtime: new Date(),
        name: 'first-file.docx',
        tags: ['tag']
      },
      {
        birthtime: new Date(),
        mtime: new Date(),
        name: 'second-file.docx',
        tags: ['tag', 'tag2']
      }
    ]

    res.send(filesMetadataList)
  } catch (error) {
    res.status(500)
    res.send('Ошибка чтения файлов.')
  }
})

router.get('/login', isCreatedUser, (req, res) => {
  const { username, password } = req.query
  res.send({ username, password })
})


export default router
