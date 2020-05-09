import express from 'express'
import fs from 'fs'
import {
  isAuthRequest,
  isAuthUser,
  isCreatedUser,
  isValidFileId
} from './middleweare';

const router = express.Router()

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
        name: 'test.pdf',
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
        name: 'test.pdf',
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

router.get('/users', isAuthRequest, (req, res) => {
  const { userName } = req.query

  const users: User[] = [
    {
      id: '123',
      name: 'John'
    },
    {
      id: '456',
      name: 'Smith'
    },
    {
      id: '789',
      name: 'Alex'
    },
    {
      id: '012',
      name: 'Vanse'
    }
  ]

  const data = users.filter(({ name }) => name !== userName)

  res.send(data)
})

router.post('/auth', isAuthUser, (req, res) => {
  res.send('some-unic-token')
})

router.post('/file', isAuthRequest, (req, res) => {
  const { id, option, usersIds } = req.params

  res.status(200)
  res.send()
})

export default router
