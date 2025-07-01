import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for switching to dark mode
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.4 13.7C20.2 14.4 18.8 14.8 17.3 14.8C12.9 14.8 9.3 11.2 9.3 6.8C9.3 5.3 9.7 3.9 10.4 2.7C10.6 2.3 10.3 1.8 9.8 1.8C4.8 2.4 1 6.7 1 12C1 17.5 5.5 22 11 22C16.3 22 20.6 18.2 21.2 13.2C21.2 12.7 20.7 12.4 20.3 12.6L21.4 13.7Z"/>
        </svg>
      ) : (
        // Sun icon with rays for switching to light mode
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle