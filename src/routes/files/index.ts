import axios from 'axios'
import express, { ErrorRequestHandler } from 'express'
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
    const { message, status } = error

    res.status(status)
    res.send(message)
  }
})

filesRouter.get('/options', isAuthRequest, async (req, res) => {
  const { headers } = req
  
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

  try {
    const { data } = await axios.get<FileOptions[]>(`${backApi}/listFile`, { headers })

    res.send(data)
  } catch (error) {
    res.send(filesMetadataList)
  }
})

filesRouter.post('/authoreties', isAuthRequest, async (req, res) => {
  const { headers, body: { id, option, usersIds } } = req

  const usernameForShare = usersIds.map((userId: string) => ({ username: userId }))

  try {
    const { data } = await axios.post(`${backApi}/file/${option}/${id}`, usernameForShare, { headers })
    res.send(data)
  } catch (error) {
    const { message, status } = error

    res.status(status)
    res.send(message)
  }
})

filesRouter.post('/create', isAuthRequest, async (req, res) => {
  const { headers, body: { formData } } = req
  const tags = ['']
  const file = formData || null

  try {
    const { data } = await axios.post(`${backApi}/addFile`, { file, tags }, { headers })
    res.send(data)
  } catch (error) {
    const { message, status } = error

    res.status(status)
    res.send(message)
  }
})

export default filesRouter