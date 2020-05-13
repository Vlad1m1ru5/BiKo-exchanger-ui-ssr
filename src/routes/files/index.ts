import axios from 'axios'
import express from 'express'
import fs from 'fs'
import path from 'path';
import {
  isAuthRequest,
  isValidFileId
} from 'middleware/index';

const backApi = process.env.API
const filesRouter = express.Router()

filesRouter.get('/data/:id', isAuthRequest, isValidFileId, (req, res) => {
  const { id } = req.params

  const callback = (err: any, data: any) => {  
    if (err) {
      res.status(500)
      res.send('Не удалось прочитать файл.')
    }

    res.send(`data:file/pdf;base64,${data}`)
  }

  fs.readFile(
    path.resolve(__dirname, 'test-doc.pdf'),
    'base64',
    callback
  )
})

filesRouter.get('/metadata', isAuthRequest, (req, res) => {
  try {
    const filesMetadataList: FileMetadata[] = [
      {
        id: 'first-uuid',
        birthtime: new Date(),
        mtime: new Date(),
        name: 'test.pdf',
        owner: 'User',
        tags: ['tag'],
        size: 7.1
      },
      {
        id: 'second-uuid',
        birthtime: new Date(),
        mtime: new Date(),
        name: 'second-file.docx',
        owner: 'Users',
        tags: ['tag', 'tag2'],
        size: 8.2
      }
    ]

    res.send(filesMetadataList)
  } catch (error) {
    res.status(500)
    res.send('Ошибка чтения файлов.')
  }
})

filesRouter.get('/options', isAuthRequest, (req, res) => {
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

filesRouter.post('/authoreties', isAuthRequest, (req, res) => {
  const { id, option, usersIds } = req.params

  res.status(200)
  res.send()
})

filesRouter.post('/create', isAuthRequest, async (req, res) => {
  const { file, name } = req.body
  const tags = []

  try {
    const { data } = await axios.post(`${backApi}/addFile`)
    res.send(data)
  } catch (error) {
    res.status(500)
    res.send('Ошибка загрузки файла.')
  }
})

export default filesRouter