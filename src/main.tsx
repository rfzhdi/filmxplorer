import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

// --- SIMULASI LOGIN ---
// LOGIN
// localStorage.setItem("isLoggedIn", "true"); 
// LOGOUT
// localStorage.removeItem("isLoggedIn");
// ----------------------

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
)
