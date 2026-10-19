import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearWarning, loadBooks } from '../features/books/booksSlice'
import { useTheme } from '../features/theme/ThemeContext'
import { FilterBar } from '../features/books/components/FilterBar'
import { BookList } from '../features/books/components/BookList'
import { BorrowedBooks } from '../features/books/components/BorrowedBooks'
export default function HomePage() {
  const dispatch = useAppDispatch()
  const { status, error, warning, items } = useAppSelector((state) => state.books)
  const { theme, toggleTheme } = useTheme()
  useEffect(() => { if (status === 'idle') dispatch(loadBooks()) }, [dispatch, status])
  return <main className="page"><header><div className="brand"><div className="brand-mark">ML</div><div><p className="eyebrow">KHOA HỌC & CÔNG NGHỆ</p><h1>Mini Library</h1><p>Kho tri thức chuyên ngành dành cho sinh viên.</p></div></div><div className="actions"><button className="theme-button" onClick={toggleTheme}>{theme === 'light' ? '🌙 Chế độ tối' : '☀️ Chế độ sáng'}</button><Link to="/stats">Thống kê <span>↗</span></Link></div></header>
    {warning && <div role="alert" className="alert">{warning}<button onClick={() => dispatch(clearWarning())}>Đóng</button></div>}
    {status === 'loading' && <p role="status">Đang tải...</p>}{status === 'failed' && <div role="alert">{error} <button onClick={() => dispatch(loadBooks())}>Thử lại</button></div>}
    {status === 'succeeded' && <div className="content-layout"><div className="catalog"><div className="section-heading"><div><p className="eyebrow">DANH MỤC SÁCH</p><h2>Tra cứu sách</h2></div><span className="catalog-note">{items.length} đầu sách</span></div><FilterBar /><BookList /></div><BorrowedBooks /></div>}
  </main>
}
