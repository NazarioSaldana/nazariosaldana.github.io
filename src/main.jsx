import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './styles/tokens.css'
import './index.css'
import App from './App.jsx'

// HashRouter keeps every tab refresh-safe on GitHub Pages (no server-side rewrites needed)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
