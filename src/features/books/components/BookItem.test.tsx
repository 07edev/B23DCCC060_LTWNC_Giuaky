import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookItem } from './BookItem'
import type { Book } from '../types'
const book: Book = { id: 'book-1', title: 'TypeScript cơ bản', author: 'Tác giả A', category: 'CNTT', year: 2024, available: 2, total: 3 }
test('displays book information', () => { render(<BookItem book={book} borrowedCount={0} onBorrow={jest.fn()} onReturn={jest.fn()} />); expect(screen.getByText(book.title)).toBeInTheDocument(); expect(screen.getByText(book.author)).toBeInTheDocument(); expect(screen.getByText(/CNTT/)).toBeInTheDocument(); expect(screen.getByText(/2024/)).toBeInTheDocument() })
test('confirms then calls borrow with id', async () => { const onBorrow = jest.fn(); render(<BookItem book={book} borrowedCount={0} onBorrow={onBorrow} onReturn={jest.fn()} />); await userEvent.click(screen.getByRole('button', { name: 'Mượn' })); expect(onBorrow).not.toHaveBeenCalled(); await userEvent.click(screen.getByRole('button', { name: 'Xác nhận' })); expect(onBorrow).toHaveBeenCalledWith('book-1') })
test('disables borrow when unavailable', () => { render(<BookItem book={{ ...book, available: 0 }} borrowedCount={0} onBorrow={jest.fn()} onReturn={jest.fn()} />); expect(screen.getByRole('button', { name: 'Mượn' })).toBeDisabled() })
