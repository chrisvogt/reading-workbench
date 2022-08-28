// import getAndSaveReadShelf from './modules/scripts/getReadShelf.mjs'
import getAndSaveAllReviews from './modules/scripts/getAndSaveAllReviews.mjs'
import selectAllBookIds from './modules/selectors/selectAllBookIds.mjs'

// Temporary User ID for testing
const USER_ID = '10454947'

// const result = await getAndSaveReadShelf(USER_ID)

const allBookIds = await selectAllBookIds()
const result = await getAndSaveAllReviews(USER_ID, allBookIds)
// console.log(allBookIds.slice(0, 5))

console.log(result);
