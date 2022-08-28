import fetch from 'node-fetch'

// Note: this currently does not support paginating and will
// having missing results for users with >200 read books.
const fetchReadBooksShelf = async (userId, key) => {
  const queryString = new URLSearchParams({
    key,
    per_page: 200,
    shelf: 'read',
    sort: 'date_read',
    v: 2,
  }).toString()

  const response = await fetch(`https://www.goodreads.com/review/list/${userId}?${queryString}`)
  return await response.text()
}

export default fetchReadBooksShelf
