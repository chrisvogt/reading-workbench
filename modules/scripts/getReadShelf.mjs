import fs from 'fs'
import { writeFile } from 'node:fs/promises'
import fetchReadBooksShelf from '../api/fetchReadBooksShelf.mjs'
import secrets from '../../secrets.mjs'

const BASE_PATH = './raw/book_shelves'
if (!fs.existsSync(BASE_PATH)) {
  fs.mkdirSync(BASE_PATH, { recursive: true })
}

export const filePath = `${BASE_PATH}/read-books.xml`

const sanitize = (shelfDocument) => shelfDocument.replaceAll(secrets.GOODREADS_ACCESS_KEY, '[REDACTED]')

const getAndSaveReadShelf = async (userId) => {
  const reviewDocument = await fetchReadBooksShelf(userId, secrets.GOODREADS_ACCESS_KEY)
  await writeFile(filePath, sanitize(reviewDocument))
  return reviewDocument
}

export default getAndSaveReadShelf
