export type Category = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ'
export type CategoryFilter = Category | 'Tất cả'

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  year: number
  available: number
  total: number
}

export type BookDraft = Omit<Book, 'id'>
export type BorrowedBook = Pick<Book, 'id' | 'title'>
export type CategoryCount = Record<Category, number>
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }
export const isOk = <T,>(result: ApiResult<T>): result is { ok: true; data: T } => result.ok
