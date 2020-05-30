import axios from 'axios'
import express from 'express'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

import {
  isAuthRequest,
  isValidFileId,
  tokenToObj,
  responseToJson
} from 'middleware/index';

const backApi = process.env.API
const filesRouter = express.Router()
const upload = multer()

const filesMetadataList: FileMetadata[] = [
  {
    id: 'first-uuid',
    birthtime: new Date(),
    mtime: new Date(),
    name: 'test-doc.pdf',
    owner: 'User',
    tags: ['tag'],
    size: 7.1
  },
  {
    id: 'second-uuid',
    birthtime: new Date(),
    mtime: new Date(),
    name: 'second-file.docx',
    owner: 'User',
    tags: ['tag', 'tag2'],
    size: 8.2
  }
]

filesRouter.get('/data/:id', isAuthRequest, isValidFileId, (req, res) => {
  const { id } = req.params

  try {
    const fileMetadata = filesMetadataList.find((fileMetadata) => fileMetadata.id === id)

    if (!fileMetadata) {
      throw new Error ('Не найден файл.')
    }

    const { name } = fileMetadata

    const matches = name.match(/(\.[a-z]+)$/g)

    const callback = (err: any, data: any) => {  
      if (err) {
        res.status(500)
        res.send('Не удалось прочитать файл.')
        return
      }
  
      if (matches === null) {
        throw new Error('Не найдено расширение файла.')
      }

      const ext = matches[0].replace('.', '')
      const file = `data:file/${ext};base64,${data}`

      res.send({ ext, file })
    }

    fs.readFile(
      path.resolve(__dirname, name),
      'base64',
      callback
    )
  } catch (error) {
    const { message, status } = error

    if (message && status) {
      res.status(status)
      res.send(message)
      return
    }

    res.status(500)
    res.send(error.message)
  }
})

filesRouter.get('/metadata', isAuthRequest, async (req, res) => {
  const { token } = req.headers
  const config = {
    headers: { ...tokenToObj(token) },
    'Content-Type': 'application/json'
  }

  try {
    const { data } = await axios.get(`${backApi}/listFile`, config)
    const files: any[] = JSON.parse(JSON.parse(data.replace(')]}\'', '')))
    const filesMetadataList = files.map(({
      author = 'Не найден',
      data = new Date(),
      filename,
      id,
      size = '-',
      tag
    }) => {
      const mtime = new Date(data)

      return {
        id,
        mtime,
        name: filename,
        owner: author,
        tags: tag,
        size
      }
    })

    res.send(filesMetadataList)
  } catch (error) {
    const { message, status } = error

    if (message && status) {
      res.status(status)
      res.send(message)
      return
    }
        
    res.status(500)
    res.send(error.message)
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

filesRouter.post('/create', upload.single('file'), async (req, res) => {
  const { headers: { token }, body: { tag }, file } = req

  const formData = new FormData()
  formData.append('file', file.buffer, file.originalname)
  formData.append('tag', tag)

  const config = { 
    headers: {
      ...tokenToObj(token),
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
    }
  }

  try {
    const { data } = await axios.post<string>(`${backApi}/addFile`, formData, config)
    res.send(data)
  } catch (error) {
    const { message, status } = error

    if (message && status) {
      res.status(status)
      res.send(message)
      return
    }
        
    res.status(500)
    res.send(error.message)
  }
})

export default filesRouter