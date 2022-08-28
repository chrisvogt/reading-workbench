1. Fetch all book reviews.

```
https://www.goodreads.com/review/list/YOUR_USER_ID?key=YOUR_KEY_HERE&v=2&shelf=read&sort=date_read&per_page=200
```

2. Fetch the individual review for each book. Reviews contain status updates with reading progress.

```
https://www.goodreads.com/review/show_by_user_and_book.xml?key=YOUR_KEY_HERE&user_id=YOUR_USER_ID&book_id=BOOK_ID
```

----

Last result, Aug 30, 2022.

```
Discovered 123 reviews in the read books shelf.
{ failureCount: 0, successCount: 123 }
```
