import { create } from 'zustand'
import type { CategoryFilter } from '../books/types'
interface FilterState {
  keyword: string
  category: CategoryFilter
  sort: 'title' | 'availability'
  setKeyword: (keyword: string) => void
  setCategory: (category: CategoryFilter) => void
  setSort: (sort: 'title' | 'availability') => void
}
export const useFilterStore = create<FilterState>((set) => ({
  keyword: '', category: 'Tất cả', sort: 'title',
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
}))
