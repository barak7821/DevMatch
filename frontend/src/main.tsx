import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google"

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </AuthProvider>
)
