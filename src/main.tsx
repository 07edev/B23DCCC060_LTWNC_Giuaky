import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './app/store'
import { ThemeProvider } from './features/theme/ThemeContext'
import HomePage from './pages/HomePage'
import './index.css'
import './App.css'
const StatsPage = lazy(() => import('./pages/StatsPage'))
createRoot(document.getElementById('root')!).render(<StrictMode><Provider store={store}><ThemeProvider><BrowserRouter><Suspense fallback={<p>Đang tải trang...</p>}><Routes><Route path="/" element={<HomePage />} /><Route path="/stats" element={<StatsPage />} /></Routes></Suspense></BrowserRouter></ThemeProvider></Provider></StrictMode>)
