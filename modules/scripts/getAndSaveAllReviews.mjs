import fs from 'fs'
import pAll from 'p-all'
import { writeFile } from 'node:fs/promises'

import fetchReview from '../api/fetchReview.mjs'
import secrets from '../../secrets.mjs'

// TEMPORARY Book IDs used while testing
// const BOOK_IDS_FOR_TESTING = ['13538873']
// const BOOK_IDS_FOR_TESTING = ['13538873', '40874032', '7978315', '1128169', '58728469', '41160292']

const BASE_PATH = './raw/book_reviews'
if (!fs.existsSync(BASE_PATH)) {
  fs.mkdirSync(BASE_PATH, { recursive: true })
}

const sanitize = (reviewDocument) => reviewDocument.replaceAll(secrets.GOODREADS_ACCESS_KEY, '[REDACTED]')

const getAndSaveReview = async (bookId, userId) => {
  const reviewDocument = await fetchReview(bookId, userId, secrets.GOODREADS_ACCESS_KEY)
  const filePath = `${BASE_PATH}/${bookId}.xml`
  await writeFile(filePath, sanitize(reviewDocument))
  return reviewDocument
}

const getAndSaveAllReviews = async (userId, bookIdsToFetch = []) => {
  const result = await pAll(
    [
      ...bookIdsToFetch.map((bookId) => () => {
        const wrappedGetAndSave = async () => {
          try {
            const data = await getAndSaveReview(bookId, userId)
            return {
              data,
              result: 'success',
            }
          } catch (error) {
            console.error(`Failed to fetch a review for book_id: ${bookId}`)
            return {
              bookId,
              error,
              result: 'failure',
            }
          }
        }
        return wrappedGetAndSave()
      }),
    ],
    {
      concurrency: 2,
      stopOnError: false,
    }
  )

  const { successes, failures } = result.reduce(
    (acc, resultObj) => {
      const succeeded = resultObj.result === 'success'
      acc[succeeded ? 'successes' : 'failures'].push(resultObj)
      return acc
    },
    { failures: [], successes: [] }
  )

  if (failures.length) {
    console.warn('Detected failures in book review fetch operations.', { errorCount: failures.length })
  }

  if (!successes.length) {
    console.warn('No successful book reviews were fetched.')
  }

  return {
    failureCount: failures.length,
    successCount: successes.length,
  }
}

export default getAndSaveAllReviews
