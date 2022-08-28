import fetch from 'node-fetch'

const fetchReview = async (bookId, userId, key) => {
  const queryString = new URLSearchParams({
    book_id: bookId,
    key,
    user_id: userId,
  }).toString()

  const response = await fetch(`https://www.goodreads.com/review/show_by_user_and_book.xml?${queryString}`)
  return await response.text()
}

export default fetchReview
