import { readFile } from 'node:fs/promises'
import { parseString } from 'xml2js'

import { filePath } from '../scripts/getReadShelf.mjs'

const selectAllReviews = result => result?.GoodreadsResponse?.reviews?.[0]?.review

// Selects all Book IDs from the saved "read books" shelf data
const selectAllBookIds = async () => {
  try {
    const data = await readFile(filePath, { encoding: 'utf-8' })

    let bookIdArray;
    parseString(data, (err, result) => {
      const allReviews = selectAllReviews(result)

      console.log(`Discovered ${allReviews?.length || 0} reviews in the read books shelf.`)

      const allBookIds = allReviews.reduce((bookIds, review) => {
        const bookId = review?.book?.[0]?.id?.[0]?._

        if (bookId) {
          bookIds.push(bookId)
        }

        return bookIds
      }, [])

      bookIdArray = allBookIds
    })

    return bookIdArray;
  } catch (error) {
    console.error('Failure selecting books from shelf data.', error)
  }
}

export default selectAllBookIds;
