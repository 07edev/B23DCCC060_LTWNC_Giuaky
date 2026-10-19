import { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import { useFilterStore } from '../../filters/useFilterStore'
import type { CategoryFilter } from '../types'
const categories: CategoryFilter[] = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ']
export function FilterBar() {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input, 300)
  const { setKeyword, category, setCategory, sort, setSort } = useFilterStore()
  useEffect(() => { setKeyword(debounced) }, [debounced, setKeyword])
  const clearFilters = () => { setInput(''); setKeyword(''); setCategory('Tất cả'); setSort('title') }
  return <div className="filter-panel"><div className="filters"><label className="search-field"><span>⌕</span><input aria-label="Tìm kiếm sách" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Tìm theo tên hoặc tác giả..." /></label>
    <select aria-label="Lọc thể loại" value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
    <select aria-label="Sắp xếp sách" value={sort} onChange={(event) => setSort(event.target.value as 'title' | 'availability')}><option value="title">Tên A-Z</option><option value="availability">Bản còn nhiều</option></select>
    <button className="ghost-button" type="button" onClick={clearFilters}>Xóa lọc</button>
    </div><p className="filter-hint">Tìm kiếm được cập nhật sau 300ms · Lọc theo thể loại hoặc mức sẵn có</p>
  </div>
}
