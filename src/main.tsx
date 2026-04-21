import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "@/components/ui/provider"
import Login from './components/auth/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
     <Login />
    </Provider>
  </StrictMode>,
)
