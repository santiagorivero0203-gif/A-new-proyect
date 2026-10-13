import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { cacheCleaner } from './services/cacheCleaner'

// Purga automática preventiva de datos mock y residuos locales
cacheCleaner.purgeLegacyMocks();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
