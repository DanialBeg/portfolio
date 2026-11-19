import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PomodoroBuddySupport from './pages/PomodoroBuddySupport.tsx'
import PomodoroBuddyPrivacy from './pages/PomodoroBuddyPrivacy.tsx'
import Photos from './pages/Photos.tsx'
import { ThemeProvider } from './contexts/ThemeContext'

// Only you visit the upload page, so keep its code out of the main bundle
const PhotoUpload = lazy(() => import('./pages/PhotoUpload.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/photos/upload" element={<Suspense fallback={null}><PhotoUpload /></Suspense>} />
          <Route path="/pomodoro-buddy-support" element={<PomodoroBuddySupport />} />
          <Route path="/pomodoro-buddy-privacy" element={<PomodoroBuddyPrivacy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
