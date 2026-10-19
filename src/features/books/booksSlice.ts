import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchBooks } from '../../api/booksApi'
import { isOk, type Book } from './types'

export interface BooksState {
  items: Book[]
  borrowedIds: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  warning: string | null
}

const initialState: BooksState = { items: [], borrowedIds: [], status: 'idle', error: null, warning: null }

export const loadBooks = createAsyncThunk<Book[], void, { rejectValue: string }>('books/loadBooks', async (_, thunkApi) => {
  const result = await fetchBooks()
  return isOk(result) ? result.data : thunkApi.rejectWithValue(result.error)
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<string>) => {
      const book = state.items.find((item) => item.id === action.payload)
      if (!book || book.available < 1) return
      book.available -= 1
      state.borrowedIds.push(action.payload)
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const book = state.items.find((item) => item.id === action.payload)
      const borrowedIndex = state.borrowedIds.indexOf(action.payload)
      if (!book || borrowedIndex === -1) return
      book.available += 1
      state.borrowedIds.splice(borrowedIndex, 1)
    },
    borrowRejected: (state, action: PayloadAction<string>) => { state.warning = action.payload },
    clearWarning: (state) => { state.warning = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(loadBooks.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(loadBooks.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload ?? 'Đã xảy ra lỗi.' })
  },
})

export const { borrowBook, returnBook, borrowRejected, clearWarning } = booksSlice.actions
export default booksSlice.reducer
