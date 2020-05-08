import express from 'express'
import fs from 'fs'
import {
  isAuthRequest,
  isAuthUser,
  isCreatedUser,
  isValidFileId
} from './middleweare';

const router = express.Router()

router.post('/auth', isAuthUser, (req, res) => {
  res.send('some-unic-token')
})

router.get('/file', isAuthRequest, isValidFileId, (req, res) => {
  const path = '/home/vladimir/Projects/back/BiKo-exchanger-ui-ssr/src/routes/api/test-doc.pdf'
  const { id } = req.query

  const callback = (err: any, data: any) => {  
    if (err) {
      res.status(500)
      res.send('Не удалось прочитать файл.')
    }

    res.send(`data:file/pdf;base64,${data}`)
  }

  fs.readFile(path, 'base64', callback)
})

router.get('/files/options', isAuthRequest, (req, res) => {
  try {
    const filesMetadataList: FileOptions[] = [
      {
        id: 'first-uuid',
        name: 'first-file.docx',
        options: [
          'read',
          'share'
        ],
        tags: ['tag']
      },
      {
        id: 'second-uuid',
        name: 'second-file.docx',
        options: [
          'read',
          'share'
        ],
        tags: ['tag', 'tag2'],
      }
    ]

    res.send(filesMetadataList)
  } catch (error) {
    res.status(500)
    res.send('Ошибка чтения файлов.')
  }
})

router.get('/files/metadata', isAuthRequest, (req, res) => {
  try {
    const filesMetadataList: FileMetadata[] = [
      {
        id: 'first-uuid',
        birthtime: new Date(),
        mtime: new Date(),
        name: 'first-file.docx',
        owner: 'User',
        tags: ['tag'],
        size: 815
      },
      {
        id: 'second-uuid',
        birthtime: new Date(),
        mtime: new Date(),
        name: 'second-file.docx',
        owner: 'Users',
        tags: ['tag', 'tag2'],
        size: 824
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
