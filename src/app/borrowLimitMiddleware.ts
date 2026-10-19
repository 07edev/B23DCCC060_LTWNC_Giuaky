import type { Middleware } from '@reduxjs/toolkit'
import { borrowBook, borrowRejected } from '../features/books/booksSlice'

interface BorrowState { books: { borrowedIds: string[] } }

export const borrowLimitMiddleware: Middleware = (store) => (next) => (action) => {
  const state = store.getState() as BorrowState
  if (borrowBook.match(action) && state.books.borrowedIds.length >= 3) {
    store.dispatch(borrowRejected('Mỗi sinh viên chỉ được mượn tối đa 3 cuốn sách.'))
    return action
  }
  return next(action)
}
