import { memo, useState } from 'react'
import type { Book } from '../types'
interface Props { book: Book; borrowedCount: number; onBorrow: (id: string) => void; onReturn: (id: string) => void }
export const BookItem = memo(function BookItem({ book, borrowedCount, onBorrow, onReturn }: Props) {
  const [confirming, setConfirming] = useState(false)
  const confirmBorrow = () => { onBorrow(book.id); setConfirming(false) }
  return <article className="book-card">
    <div><h3>{book.title}</h3><p>{book.author}</p></div>
    <span className="badge">{book.category}</span>
    <p>Năm xuất bản: {book.year}</p><p>Còn lại: <strong>{book.available}</strong> / {book.total}</p>
    {borrowedCount > 0 && <p className="borrowed-status">Đang mượn: {borrowedCount} bản</p>}
    <div className="book-actions"><button disabled={book.available === 0} onClick={() => setConfirming(true)}>Mượn</button>{borrowedCount > 0 && <button className="secondary-button" onClick={() => onReturn(book.id)}>Trả 1 bản</button>}</div>
    {confirming && <div className="modal-backdrop" role="presentation" onMouseDown={() => setConfirming(false)}><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby={`borrow-title-${book.id}`} onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">XÁC NHẬN MƯỢN</p><h2 id={`borrow-title-${book.id}`}>Mượn sách</h2></div><button className="modal-close" aria-label="Đóng" onClick={() => setConfirming(false)}>×</button></div><p>Bạn muốn mượn <strong>{book.title}</strong>?</p><div className="modal-detail"><span>Số bản còn lại sau khi mượn</span><strong>{book.available - 1} / {book.total}</strong></div><div className="modal-actions"><button className="secondary-button" onClick={() => setConfirming(false)}>Hủy</button><button onClick={confirmBorrow}>Xác nhận</button></div></div></div>}
  </article>
})
