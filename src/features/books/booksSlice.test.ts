import reducer, { borrowBook, loadBooks, returnBook } from './booksSlice'
import type { Book } from './types'
const book: Book = { id: '1', title: 'A', author: 'B', category: 'CNTT', year: 2024, available: 2, total: 2 }
test('loads books on fulfilled', () => expect(reducer(undefined, loadBooks.fulfilled([book], 'x', undefined)).items).toEqual([book]))
test('stores error on rejected', () => expect(reducer(undefined, loadBooks.rejected(new Error(), 'x', undefined, 'bad')).error).toBe('bad'))
test('borrows and decreases availability', () => { const state = reducer({ items: [book], borrowedIds: [], status: 'succeeded', error: null, warning: null }, borrowBook('1')); expect(state.items[0].available).toBe(1); expect(state.borrowedIds).toEqual(['1']) })
test('returns and restores availability', () => { const state = reducer({ items: [{ ...book, available: 1 }], borrowedIds: ['1'], status: 'succeeded', error: null, warning: null }, returnBook('1')); expect(state.items[0].available).toBe(2); expect(state.borrowedIds).toEqual([]) })
