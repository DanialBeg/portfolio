import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PomodoroBuddySupport from './pages/PomodoroBuddySupport.tsx'
import PomodoroBuddyPrivacy from './pages/PomodoroBuddyPrivacy.tsx'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pomodoro-buddy-support" element={<PomodoroBuddySupport />} />
          <Route path="/pomodoro-buddy-privacy" element={<PomodoroBuddyPrivacy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
