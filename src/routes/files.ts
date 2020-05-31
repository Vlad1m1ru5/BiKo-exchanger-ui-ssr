import axios from 'axios'
import express from 'express'
import FormData from 'form-data'
import multer from 'multer'

import {
  isAuthRequest,
  isValidFileId,
  tokenToObj
} from 'middleware/index';

const backApi = process.env.API
const filesRouter = express.Router()
const upload = multer()

filesRouter.get('/data/:id', isAuthRequest, isValidFileId, async (req, res) => {
  const { token, filename } = req.headers
  const { id } = req.params
  const config = {
    headers: { ...tokenToObj(token) },
    'Content-Type': 'application/json'
  }

  try {
    if (!filename ||
        typeof filename !== 'string'  
    ) {
      throw new Error(`Файл с именем ${filename} не существует`)
    }

    const response = await axios.get(`${backApi}/listFile`, config)
    const { author } = JSON.parse(
      JSON.parse(response.data.replace(')]}\'', ''))
    ).find((file: any) => file.id === id)

    const { data } = await axios.post(`${backApi}/file/${id}`, { filename, author }, config)
    const extMatches = filename.match(/(\.[a-z]+)$/g)

    if (extMatches === null) {
      throw new Error(`Не найден файл с именем ${filename}`)
    }

    const ext = extMatches[0].replace('.', '')
    const { info } = JSON.parse(JSON.parse(data.replace(')]}\'', '')))
    const file = `data:application/${ext};base64,${info}`

    res.send({ ext, file })
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
  const { token } = req.headers
  const config = {
    headers: { ...tokenToObj(token) },
    'Content-Type': 'application/json'
  }

  try {
    const { data } = await axios.get<string>(`${backApi}/listFile/forUser`, config)
    const userOptions = JSON.parse(JSON.parse(data.replace(')]}\'', '')))
    const filesMetadataList = userOptions.map(({ id, filename: name, options, tag: tags }: any) => ({
      id,
      name,
      options: options.map(({ option }: any) => option),
      tags
    }))

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