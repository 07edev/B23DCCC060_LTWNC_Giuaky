import { useAppSelector } from '../../../app/hooks'
import { useAppDispatch } from '../../../app/hooks'
import { returnBook } from '../booksSlice'
export function BorrowedBooks() {
  const dispatch = useAppDispatch()
  const { items, borrowedIds } = useAppSelector((state) => state.books)
  const borrowed = items.map((book) => ({ book, count: borrowedIds.filter((id) => id === book.id).length })).filter(({ count }) => count > 0)
  return <aside className="borrowed-panel"><div className="section-heading"><div><p className="eyebrow">THEO DÕI CÁ NHÂN</p><h2>Sách đang mượn</h2></div><span className="count-pill">{borrowedIds.length}/3</span></div>
    {borrowed.length === 0 ? <p className="muted">Bạn chưa mượn cuốn sách nào.</p> : <div className="borrowed-list">{borrowed.map(({ book, count }) => <div className="borrowed-row" key={book.id}><div><strong>{book.title}</strong><span>{book.author} · {count} bản</span></div><button className="small-button" onClick={() => dispatch(returnBook(book.id))}>Trả 1 bản</button></div>)}</div>}
  </aside>
}
