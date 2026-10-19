import type { ApiResult, Book, BookDraft } from '../features/books/types'

const drafts: BookDraft[] = [
  { title: 'Lập trình TypeScript', author: 'Nguyễn Minh', category: 'CNTT', year: 2024, available: 3, total: 4 },
  { title: 'Cấu trúc dữ liệu và giải thuật', author: 'Trần An', category: 'CNTT', year: 2022, available: 0, total: 3 },
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2020, available: 2, total: 3 },
  { title: 'Kinh tế vi mô', author: 'Lê Hà', category: 'Kinh tế', year: 2021, available: 4, total: 5 },
  { title: 'Quản trị doanh nghiệp', author: 'Phạm Nam', category: 'Kinh tế', year: 2023, available: 1, total: 2 },
  { title: 'English for IT', author: 'David Hill', category: 'Ngoại ngữ', year: 2022, available: 2, total: 3 },
  { title: 'Từ điển Anh - Việt', author: 'Nguyễn Lân', category: 'Ngoại ngữ', year: 2019, available: 5, total: 6 },
]

const books: Book[] = drafts.map((book, index) => ({ ...book, id: `book-${index + 1}` }))

export const fetchBooks = (shouldFail = false, delayMs = 500): Promise<ApiResult<Book[]>> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(shouldFail ? { ok: false, error: 'Không thể tải danh sách sách.' } : { ok: true, data: books }), delayMs)
  })
