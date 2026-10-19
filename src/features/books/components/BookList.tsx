import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { borrowBook, returnBook } from '../booksSlice'
import { useFilterStore } from '../../filters/useFilterStore'
import { BookItem } from './BookItem'
export function BookList() {
  const dispatch = useAppDispatch()
  const { items, borrowedIds } = useAppSelector((state) => state.books)
  const { keyword, category, sort } = useFilterStore()
  const filtered = useMemo(() => items.filter((book) => {
    const text = `${book.title} ${book.author}`.toLowerCase()
    return text.includes(keyword.toLowerCase()) && (category === 'Tất cả' || book.category === category)
  }).sort((a, b) => sort === 'availability' ? b.available - a.available : a.title.localeCompare(b.title, 'vi')), [items, keyword, category, sort])
  const onBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch])
  const onReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch])
  if (!filtered.length) return <div className="empty-state"><span className="empty-icon">⌕</span><h3>Không tìm thấy sách</h3><p>Thử tìm bằng từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thư viện.</p></div>
  return <section className="book-grid">{filtered.map((book) => <BookItem key={book.id} book={book} borrowedCount={borrowedIds.filter((id) => id === book.id).length} onBorrow={onBorrow} onReturn={onReturn} />)}</section>
}
