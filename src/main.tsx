import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WatchlistProvider } from './context/WatchlistContext.tsx'

// --- SIMULASI LOGIN ---
// LOGIN
// localStorage.setItem("isLoggedIn", "true"); 
// LOGOUT
// localStorage.removeItem("isLoggedIn");
// ----------------------

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>
)
